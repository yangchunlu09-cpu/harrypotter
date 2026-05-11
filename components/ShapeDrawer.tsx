'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Check, X, Sparkles, Star } from 'lucide-react';
import useGameStore from '@/store/useGameStore';

interface ShapeDrawerProps {
  isActive: boolean;
  onComplete: (success: boolean) => void;
}

interface Point {
  x: number;
  y: number;
}

const ShapeDrawer = ({ isActive, onComplete }: ShapeDrawerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [result, setResult] = useState<'success' | 'fail' | null>(null);
  const { currentSpell } = useGameStore();

  // 计算两点之间的距离
  const getDistance = (p1: Point, p2: Point) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  // 计算角度
  const getAngle = (p1: Point, p2: Point) => {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  };

  // 判断绘制的形状
  const recognizeShape = useCallback((pts: Point[]): boolean => {
    if (!currentSpell || pts.length < 10) return false;

    const totalDistance = pts.reduce((acc, pt, i) => {
      if (i === 0) return 0;
      return acc + getDistance(pts[i - 1], pt);
    }, 0);

    switch (currentSpell.shape) {
      case 'circle': {
        const start = pts[0];
        const end = pts[pts.length - 1];
        const center = {
          x: pts.reduce((sum, p) => sum + p.x, 0) / pts.length,
          y: pts.reduce((sum, p) => sum + p.y, 0) / pts.length
        };
        
        const avgRadius = pts.reduce((sum, p) => sum + getDistance(p, center), 0) / pts.length;
        const startEndDist = getDistance(start, end);
        const circumference = 2 * Math.PI * avgRadius;
        
        return startEndDist < avgRadius * 0.4 && Math.abs(totalDistance - circumference) < circumference * 0.5;
      }
      
      case 'wave': {
        let directionChanges = 0;
        let prevAngle = getAngle(pts[0], pts[1]);
        
        for (let i = 2; i < pts.length; i++) {
          const angle = getAngle(pts[i - 1], pts[i]);
          const angleDiff = Math.abs(angle - prevAngle);
          if (angleDiff > Math.PI / 4 && angleDiff < (3 * Math.PI) / 4) {
            directionChanges++;
          }
          prevAngle = angle;
        }
        
        return directionChanges >= 3 && directionChanges <= 8;
      }
      
      case 'zigzag': {
        let sharpChanges = 0;
        let prevAngle = getAngle(pts[0], pts[1]);
        
        for (let i = 2; i < pts.length; i++) {
          const angle = getAngle(pts[i - 1], pts[i]);
          const angleDiff = Math.abs(((angle - prevAngle) + Math.PI) % (2 * Math.PI) - Math.PI);
          if (angleDiff > Math.PI / 2) {
            sharpChanges++;
          }
          prevAngle = angle;
        }
        
        return sharpChanges >= 4 && pts.length > 15;
      }
      
      case 'triangle': {
        const start = pts[0];
        const end = pts[pts.length - 1];
        const startEndDist = getDistance(start, end);
        
        let corners = 0;
        let prevAngle = getAngle(pts[0], pts[1]);
        
        for (let i = 2; i < pts.length; i++) {
          const angle = getAngle(pts[i - 1], pts[i]);
          const angleDiff = Math.abs(((angle - prevAngle) + Math.PI) % (2 * Math.PI) - Math.PI);
          if (angleDiff > Math.PI / 3) {
            corners++;
          }
          prevAngle = angle;
        }
        
        return corners >= 2 && corners <= 4 && startEndDist < totalDistance * 0.3;
      }
      
      case 'star': {
        let sharpCorners = 0;
        let prevAngle = getAngle(pts[0], pts[1]);
        
        for (let i = 2; i < pts.length; i++) {
          const angle = getAngle(pts[i - 1], pts[i]);
          const angleDiff = Math.abs(((angle - prevAngle) + Math.PI) % (2 * Math.PI) - Math.PI);
          if (angleDiff > Math.PI / 2) {
            sharpCorners++;
          }
          prevAngle = angle;
        }
        
        return sharpCorners >= 5 && pts.length > 20;
      }
      
      default:
        return false;
    }
  }, [currentSpell]);

  // 绘制路径
  const drawPath = useCallback((ctx: CanvasRenderingContext2D, pts: Point[]) => {
    if (pts.length < 2) {
      // 清空画布并显示星空背景
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawStarBackground(ctx);
      return;
    }
    
    // 绘制星空背景
    drawStarBackground(ctx);
    
    // 绘制发光路径
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    
    // 外层发光
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.filter = 'blur(10px)';
    ctx.stroke();
    
    // 中层发光
    ctx.strokeStyle = 'rgba(251, 191, 36, 0.7)';
    ctx.lineWidth = 12;
    ctx.filter = 'blur(5px)';
    ctx.stroke();
    
    // 内层实线
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 4;
    ctx.filter = 'none';
    ctx.stroke();
  }, []);
  
  // 绘制星空背景
  const drawStarBackground = (ctx: CanvasRenderingContext2D) => {
    // 深色渐变背景
    const bgGradient = ctx.createRadialGradient(
      ctx.canvas.width / 2, 
      ctx.canvas.height / 2, 
      0, 
      ctx.canvas.width / 2, 
      ctx.canvas.height / 2, 
      Math.max(ctx.canvas.width, ctx.canvas.height) / 2
    );
    bgGradient.addColorStop(0, 'rgba(30, 20, 60, 0.95)');
    bgGradient.addColorStop(0.5, 'rgba(15, 10, 35, 0.98)');
    bgGradient.addColorStop(1, 'rgba(5, 5, 15, 1)');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // 绘制星星
    const starCount = 80;
    ctx.save();
    for (let i = 0; i < starCount; i++) {
      // 使用固定种子生成一致的星星位置
      const seed = i * 9973;
      const x = (seed * 7919) % ctx.canvas.width;
      const y = (seed * 7907) % ctx.canvas.height;
      const size = ((seed * 7) % 3) + 0.5;
      const brightness = ((seed * 13) % 50) / 100 + 0.3;
      
      // 星星渐变
      const starGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
      starGradient.addColorStop(0, `rgba(255, 255, 255, ${brightness})`);
      starGradient.addColorStop(0.5, `rgba(255, 250, 200, ${brightness * 0.5})`);
      starGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = starGradient;
      ctx.beginPath();
      ctx.arc(x, y, size * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // 绘制一些较大的星星
    const bigStars = [
      { x: 80, y: 80, size: 2 },
      { x: 420, y: 100, size: 1.8 },
      { x: 250, y: 60, size: 2.2 },
      { x: 120, y: 280, size: 1.6 },
      { x: 380, y: 260, size: 1.9 },
      { x: 480, y: 300, size: 1.5 },
    ];
    
    bigStars.forEach(star => {
      const starGradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, star.size * 3
      );
      starGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      starGradient.addColorStop(0.3, 'rgba(251, 191, 36, 0.6)');
      starGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = starGradient;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
      ctx.fill();
    });
    
    ctx.restore();
  };

  // 鼠标事件处理
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getMousePos = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsDrawing(true);
      setPoints([getMousePos(e)]);
      setResult(null);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return;
      const newPoints = [...points, getMousePos(e)];
      setPoints(newPoints);
    };

    const handleMouseUp = () => {
      if (!isDrawing) return;
      setIsDrawing(false);
      
      const success = recognizeShape(points);
      setResult(success ? 'success' : 'fail');
      
      setTimeout(() => {
        onComplete(success);
        setPoints([]);
        setResult(null);
      }, 1500);
    };

    if (isActive) {
      canvas.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isActive, points, recognizeShape, onComplete]);

  // 绘制到画布
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawPath(ctx, points);
  }, [points, drawPath]);

  return (
    <AnimatePresence>
      {isActive && currentSpell && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-md"
          />
          
          {/* 背景魔法粒子 */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gold/20"
              style={{
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut'
              }}
            />
          ))}

          {/* 主容器 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-10"
          >
            {/* 标题区域 */}
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-8"
            >
              <motion.div
                className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-900/70 via-amber-900/70 to-purple-900/70 border-2 border-gold/50"
                style={{
                  boxShadow: '0 0 40px rgba(251, 191, 36, 0.3), inset 0 0 30px rgba(139, 92, 246, 0.15)',
                }}
              >
                <motion.div
                  className="flex items-center justify-center gap-4"
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ rotate: [0, 12, -12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Star className="w-6 h-6 text-gold" fill="currentColor" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-gold tracking-widest">
                    施法仪式
                  </h2>
                  <motion.div
                    animate={{ rotate: [0, -12, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Star className="w-6 h-6 text-gold" fill="currentColor" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 咒语信息卡片 */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center mb-6 px-8 py-4 bg-gradient-to-r from-purple-900/60 via-amber-900/60 to-purple-900/60 rounded-full border-2 border-gold/40"
              style={{
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.2), inset 0 0 30px rgba(139, 92, 246, 0.1)',
              }}
            >
              <div className="text-center">
                <div className="text-white font-bold text-xl tracking-wide">{currentSpell.name}</div>
                <div className="text-gold/90 text-sm italic mt-1">{currentSpell.incantation}</div>
              </div>
            </motion.div>

            {/* 画布容器 */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              {/* 魔法边框发光 */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(139, 92, 246, 0.3))',
                  filter: 'blur(20px)',
                  transform: 'scale(1.05)',
                }}
              />
              
              {/* 画布 */}
              <canvas
                ref={canvasRef}
                width={500}
                height={350}
                className="relative rounded-2xl border-2 border-gold/40 bg-gray-900/80 cursor-crosshair"
                style={{
                  boxShadow: `
                    0 0 40px rgba(251, 191, 36, 0.2),
                    0 0 80px rgba(139, 92, 246, 0.1),
                    inset 0 0 60px rgba(139, 92, 246, 0.05)
                  `,
                }}
              />

              {/* 形状提示 */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 rounded-full border border-gold/20"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gold font-medium">绘制 {currentSpell.shapePattern}</span>
                  <span className="text-gray-400 text-sm">|</span>
                  <span className="text-gray-400 text-sm">按住鼠标左键绘制</span>
                </div>
              </motion.div>

              {/* 结果显示 */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl"
                    style={{
                      background: result === 'success' 
                        ? 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(0, 0, 0, 0.8) 70%)'
                        : 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, rgba(0, 0, 0, 0.8) 70%)',
                    }}
                  >
                    {result === 'success' ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.1 }}
                          className="relative"
                        >
                          <motion.div
                            animate={{ 
                              boxShadow: [
                                '0 0 20px rgba(34, 197, 94, 0.5)',
                                '0 0 40px rgba(34, 197, 94, 0.8)',
                                '0 0 20px rgba(34, 197, 94, 0.5)',
                              ]
                            }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="p-8 rounded-full bg-gradient-to-br from-green-500/40 to-emerald-600/40 border-2 border-green-400/60"
                          >
                            <Check className="w-16 h-16 text-green-400" />
                          </motion.div>
                          {/* 成功粒子 */}
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 bg-green-400 rounded-full"
                              style={{
                                left: '50%',
                                top: '50%',
                              }}
                              animate={{
                                x: [0, Math.cos((i * Math.PI) / 4) * 60],
                                y: [0, Math.sin((i * Math.PI) / 4) * 60],
                                opacity: [1, 0],
                                scale: [1, 0],
                              }}
                              transition={{
                                duration: 1,
                                delay: 0.3,
                                ease: 'easeOut',
                              }}
                            />
                          ))}
                        </motion.div>
                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="mt-6 text-green-400 text-xl font-bold"
                        >
                          施法成功！
                        </motion.p>
                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-gray-400 text-sm"
                        >
                          {currentSpell.incantation}！
                        </motion.p>
                      </>
                    ) : (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.1 }}
                          className="relative"
                        >
                          <motion.div
                            animate={{ 
                              boxShadow: [
                                '0 0 20px rgba(239, 68, 68, 0.5)',
                                '0 0 40px rgba(239, 68, 68, 0.8)',
                                '0 0 20px rgba(239, 68, 68, 0.5)',
                              ]
                            }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="p-8 rounded-full bg-gradient-to-br from-red-500/40 to-rose-600/40 border-2 border-red-400/60"
                          >
                            <X className="w-16 h-16 text-red-400" />
                          </motion.div>
                        </motion.div>
                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="mt-6 text-red-400 text-xl font-bold"
                        >
                          施法失败
                        </motion.p>
                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-gray-400 text-sm"
                        >
                          请尝试绘制正确的 {currentSpell.shapePattern}
                        </motion.p>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 底部提示 */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-gray-500 text-sm">
                💫 绘制与咒语对应的形状来释放魔法力量
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShapeDrawer;