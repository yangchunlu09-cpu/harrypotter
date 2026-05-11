'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameViewport from '@/components/GameViewport';

// 图片URL配置
const IMAGES = {
  hogwarts: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hogwarts%20Castle%20silhouette%20at%20dusk%2C%20majestic%20castle%2C%20towers%2C%20dark%20mysterious%20atmosphere%2C%20fantasy%20art%2C%20minimalist&image_size=landscape_16_9',
  hippogriff: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hippogriff%20silhouette%20flying%2C%20eagle%20head%20horse%20body%2C%20wings%20spread%2C%20dark%20silhouette%2C%20minimalist&image_size=portrait_4_3',
  wizard: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Wizard%20boy%20silhouette%20riding%20broomstick%2C%20simple%20dark%20silhouette%2C%20minimalist&image_size=portrait_4_3',
};

// 生成随机粒子位置（客户端）
const generateParticles = () => {
  const stars = [];
  const magicParticles = [];
  
  for (let i = 0; i < 60; i++) {
    stars.push({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 60}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 2,
    });
  }
  
  for (let i = 0; i < 10; i++) {
    magicParticles.push({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: i % 2 === 0 ? '#fbbf24' : '#a855f7',
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 4,
    });
  }
  
  return { stars, magicParticles };
};

// 预加载图片
const usePreloadImages = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const images = Object.values(IMAGES);
    let loadedCount = 0;
    
    images.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setLoaded(true);
        }
      };
      img.src = src;
    });
    
    // 超时处理
    const timeout = setTimeout(() => {
      setLoaded(true);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return loaded;
};

export default function Home() {
  const [showGame, setShowGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const imagesLoaded = usePreloadImages();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (showGame) {
    return <GameViewport />;
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <MagicBackground />
      
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 mx-auto mb-6"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#6b21a8"
                    strokeWidth="2"
                    strokeDasharray="20 10"
                    className="animate-pulse"
                  />
                  <circle cx="50" cy="50" r="5" fill="#fbbf24" />
                </svg>
              </motion.div>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-purple-400 text-sm tracking-widest"
              >
                正在开启魔法世界...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
          >
            {/* WIZARDING WORLD - 顶部正中央 */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="fixed top-6 left-0 right-0 flex items-center justify-center z-20"
            >
              {/* 魔法边框装饰 */}
              <div className="relative flex items-center justify-center px-6 py-2">
                {/* 角落装饰 */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-500/40" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-500/40" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-500/40" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-500/40" />
                
                {/* 文字 */}
                <span 
                  className="text-amber-400/80 text-[10px] tracking-[0.4em] font-light uppercase"
                  style={{
                    textShadow: '0 0 15px rgba(251, 191, 36, 0.3)',
                  }}
                >
                  WIZARDING WORLD
                </span>
              </div>
            </motion.div>

            <div className="text-center">
              {/* 魔法徽章 - 缩小尺寸 */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
                className="mb-8"
              >
                <div className="relative w-20 h-20 mx-auto">
                  {/* 外层光晕 */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* 徽章主体 */}
                  <div className="relative w-full h-full rounded-full border border-amber-400/40 bg-gradient-to-br from-purple-900/80 via-purple-800/70 to-black/90 flex items-center justify-center"
                    style={{
                      boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    {/* 闪电符号 */}
                    <span className="text-3xl">
                      ⚡
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* 主标题 - 缩小字体 */}
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-3xl md:text-4xl font-light mb-3"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                }}
              >
                <span 
                  className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent"
                  style={{
                    letterSpacing: '0.15em',
                  }}
                >
                  哈利波特
                </span>
              </motion.h1>
              
              {/* 副标题 - 缩小字体 */}
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-xs md:text-sm text-purple-300/70 mb-4 tracking-[0.3em]"
              >
                THE SORCERER'S STONE
              </motion.h2>
              
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="w-24 h-px mx-auto mb-6"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(251, 191, 36, 0.4), transparent)',
                }}
              />

              {/* 描述文字 - 缩小字体 */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-purple-400/50 text-xs max-w-md mx-auto leading-relaxed mb-10"
                style={{
                  letterSpacing: '0.08em',
                  lineHeight: '2',
                }}
              >
                踏入霍格沃茨的魔法世界<br />
                解开古老谜题，与传奇巫师并肩作战
              </motion.p>

              {/* 魔法按钮 - 缩小尺寸 */}
              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGame(true)}
                className="group relative"
              >
                {/* 按钮主体 */}
                <div 
                  className="relative overflow-hidden rounded-full px-8 py-3"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.6) 0%, rgba(107, 33, 168, 0.7) 50%, rgba(79, 70, 229, 0.6) 100%)',
                    boxShadow: '0 4px 20px rgba(139, 92, 246, 0.3)',
                    border: '1px solid rgba(251, 191, 36, 0.2)',
                  }}
                >
                  {/* 按钮文字 */}
                  <span 
                    className="relative text-white/90 text-xs tracking-[0.15em]"
                  >
                    开启魔法之旅
                  </span>
                </div>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="text-purple-500/30 text-xs tracking-widest">
                HARRY POTTER AND THE SORCERER&apos;S STONE
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MagicBackground() {
  const [isClient, setIsClient] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { stars, magicParticles } = useMemo(() => generateParticles(), []);
  
  useEffect(() => {
    setIsClient(true);
    
    // 预加载主背景图
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
    img.src = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hogwarts%20Castle%20silhouette%20at%20dusk%2C%20majestic%20castle%2C%20towers%2C%20dark%20mysterious%20atmosphere%2C%20fantasy%20art%2C%20minimalist&image_size=landscape_16_9';
  }, []);
  
  // 服务器端渲染：只显示渐变背景
  if (!isClient) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-indigo-950 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* 纯色背景作为占位符 */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-indigo-950 to-black" />
      
      {/* 霍格沃茨城堡背景 - 使用淡入效果 */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 0.4 : 0 }}
        transition={{ duration: 1.5 }}
        style={{
          backgroundImage: `url('${IMAGES.hogwarts}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      {/* 星空粒子 */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
          style={{
            left: star.left,
            top: star.top,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {/* 魔法粒子 */}
      {magicParticles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            background: particle.color,
            boxShadow: particle.color === '#fbbf24'
              ? '0 0 4px #fbbf24'
              : '0 0 4px #a855f7',
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      {/* 鹰头马身有翼兽飞翔动画 - 使用CSS绘制的简化版本 */}
      <motion.div
        className="absolute opacity-50"
        style={{
          top: '15%',
          left: '-10%',
          width: '48px',
          height: '40px',
        }}
        animate={{
          x: ['-10%', '110%'],
          y: ['15%', '8%', '15%'],
          rotate: [0, 3, -3, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <svg viewBox="0 0 48 40" className="w-full h-full">
          <path 
            d="M4 35 Q12 25 8 15 Q15 20 20 10 Q25 18 30 8 Q35 16 40 5 Q35 18 32 25 Q28 20 22 28 Q18 24 10 30 Z" 
            fill="#1e1e2e"
            opacity="0.8"
          />
          <path 
            d="M30 8 Q38 3 44 6" 
            stroke="#1e1e2e" 
            strokeWidth="3" 
            fill="none"
            opacity="0.8"
          />
        </svg>
      </motion.div>

      {/* 小巫师骑扫帚飞翔 - 使用CSS绘制的简化版本 */}
      <motion.div
        className="absolute opacity-40"
        style={{
          top: '22%',
          right: '-10%',
          width: '32px',
          height: '28px',
        }}
        animate={{
          x: ['110%', '-10%'],
          y: ['22%', '28%', '22%'],
          rotate: [0, -2, 2, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'linear',
          delay: 8,
        }}
      >
        <svg viewBox="0 0 32 28" className="w-full h-full">
          <circle cx="16" cy="8" r="5" fill="#1e1e2e" opacity="0.8"/>
          <path 
            d="M14 13 L12 26 L18 26 L16 13" 
            fill="#1e1e2e" 
            opacity="0.8"
          />
          <path 
            d="M6 24 Q16 22 28 24" 
            stroke="#1e1e2e" 
            strokeWidth="3" 
            fill="none"
            opacity="0.8"
          />
        </svg>
      </motion.div>

      {/* 魔法光晕效果 */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
        }}
      />
    </div>
  );
}
