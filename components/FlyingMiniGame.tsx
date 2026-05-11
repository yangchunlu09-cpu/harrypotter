'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bird, CheckCircle, AlertCircle } from 'lucide-react';
import useGameStore from '@/store/useGameStore';
import { getDialogueById } from '@/data/scenario';

interface FlyingMiniGameProps {
  onClose: () => void;
}

const FlyingMiniGame = ({ onClose }: FlyingMiniGameProps) => {
  const { addInventory, startDialogue } = useGameStore();
  const [position, setPosition] = useState({ x: 50, y: 80 });
  const [obstacles, setObstacles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [gameState, setGameState] = useState<'playing' | 'success' | 'failed'>('playing');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const obstacleIdRef = { current: 0 };

  // 生成障碍物
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      const newObstacle = {
        id: obstacleIdRef.current++,
        x: Math.random() * 80 + 10,
        y: -10,
      };
      setObstacles((prev) => [...prev, newObstacle]);
    }, 1500);

    return () => clearInterval(interval);
  }, [gameState]);

  // 移动障碍物
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setObstacles((prev) => {
        const updated = prev
          .map((obs) => ({ ...obs, y: obs.y + 2 }))
          .filter((obs) => obs.y < 110);

        // 检查碰撞
        const collision = updated.some((obs) => {
          const dx = Math.abs(obs.x - position.x);
          const dy = Math.abs(obs.y - position.y);
          return dx < 8 && dy < 12;
        });

        if (collision) {
          setGameState('failed');
          setTimeout(() => {
            setPosition({ x: 50, y: 80 });
            setObstacles([]);
            setScore(0);
            setTimeLeft(30);
            setGameState('playing');
          }, 2000);
        }

        return updated;
      });

      // 增加分数
      setScore((prev) => prev + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [gameState, position.x, position.y]);

  // 倒计时
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('success');
          setTimeout(() => {
            addInventory({
              id: 'flying-skill',
              name: '飞行技能',
              description: '你学会了如何驾驭飞天扫帚！',
              icon: '🧹',
              isKeyItem: true,
            });

            const dialogue = getDialogueById('flying-success');
            if (dialogue) {
              startDialogue(dialogue);
            }

            onClose();
          }, 1500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, addInventory, startDialogue, onClose]);

  // 键盘控制
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (gameState !== 'playing') return;

    setPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          newY = Math.max(10, prev.y - 5);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          newY = Math.min(90, prev.y + 5);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newX = Math.max(5, prev.x - 5);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          newX = Math.min(95, prev.x + 5);
          break;
      }

      return { x: newX, y: newY };
    });
  }, [gameState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-gradient-to-b from-sky-400 to-sky-200 flex items-center justify-center"
    >
      {/* 关闭按钮 */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </motion.button>

      {/* 游戏区域 */}
      <div className="relative w-full h-full">
        {/* 顶部信息栏 */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div className="bg-black/50 px-4 py-2 rounded-lg">
            <span className="text-white">分数: </span>
            <span className="text-gold font-bold">{score}</span>
          </div>
          <div className="bg-black/50 px-4 py-2 rounded-lg">
            <span className="text-white">时间: </span>
            <motion.span
              key={timeLeft}
              className={`font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-gold'}`}
            >
              {timeLeft}s
            </motion.span>
          </div>
        </div>

        {/* 玩家（飞天扫帚） */}
        <motion.div
          className="absolute w-12 h-8"
          style={{ left: `${position.x}%`, top: `${position.y}%`, transform: 'translate(-50%, -50%)' }}
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <div className="text-4xl">🧹</div>
        </motion.div>

        {/* 障碍物（游走球） */}
        {obstacles.map((obs) => (
          <motion.div
            key={obs.id}
            className="absolute w-8 h-8"
            style={{ left: `${obs.x}%`, top: `${obs.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="text-2xl">🏐</div>
          </motion.div>
        ))}

        {/* 状态覆盖层 */}
        <AnimatePresence>
          {gameState === 'failed' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 flex items-center justify-center"
            >
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-red-400 text-2xl font-bold mb-2">碰撞！</h2>
                <p className="text-gray-400">重新开始...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {gameState === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/70 flex items-center justify-center"
            >
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-green-400 text-2xl font-bold mb-2">飞行测试通过！</h2>
                <p className="text-gray-400">最终得分: {score}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 控制提示 */}
        {gameState === 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-4 py-2 rounded-lg"
          >
            <span className="text-white text-sm">使用 ↑↓←→ 或 WASD 控制飞行，躲避游走球！</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FlyingMiniGame;
