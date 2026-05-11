'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, CheckCircle, AlertCircle } from 'lucide-react';
import useGameStore from '@/store/useGameStore';
import { getDialogueById } from '@/data/scenario';

interface CareOfMagicalCreaturesMiniGameProps {
  onClose: () => void;
}

// 神奇动物数据
const creatures = [
  { id: 'fluffy', name: '路威', emoji: '🐶', careActions: ['feed', 'pet', 'play'], correctAction: 'feed', description: '三头犬，需要喂食' },
  { id: 'unicorn', name: '独角兽', emoji: '🦄', careActions: ['pet', 'feed', 'brush'], correctAction: 'brush', description: '优雅的生物，需要梳理' },
  { id: 'owls', name: '猫头鹰', emoji: '🦉', careActions: ['feed', 'pet', 'fly'], correctAction: 'fly', description: '信使猫头鹰，需要放飞' },
];

const actionButtons = {
  feed: { label: '喂食', emoji: '🍖', color: 'bg-green-600' },
  pet: { label: '抚摸', emoji: '✋', color: 'bg-blue-600' },
  play: { label: '玩耍', emoji: '🎾', color: 'bg-yellow-600' },
  brush: { label: '梳理', emoji: '🪖', color: 'bg-purple-600' },
  fly: { label: '放飞', emoji: '🪁', color: 'bg-sky-600' },
};

const CareOfMagicalCreaturesMiniGame = ({ onClose }: CareOfMagicalCreaturesMiniGameProps) => {
  const { addInventory, startDialogue } = useGameStore();
  const [currentCreatureIndex, setCurrentCreatureIndex] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'success' | 'failed'>('playing');
  const [hearts, setHearts] = useState(3);
  const [score, setScore] = useState(0);
  const [lastAction, setLastAction] = useState<{ type: 'success' | 'failed'; action: string } | null>(null);

  const currentCreature = creatures[currentCreatureIndex];

  const handleAction = (actionId: string) => {
    if (gameState !== 'playing') return;

    const isCorrect = actionId === currentCreature.correctAction;
    const action = actionButtons[actionId as keyof typeof actionButtons];

    setLastAction({ type: isCorrect ? 'success' : 'failed', action: action?.label || '' });

    if (isCorrect) {
      setScore((prev) => prev + 10);

      // 检查是否完成所有动物
      if (currentCreatureIndex < creatures.length - 1) {
        setTimeout(() => {
          setCurrentCreatureIndex((prev) => prev + 1);
          setLastAction(null);
        }, 1000);
      } else {
        setGameState('success');
        setTimeout(() => {
          addInventory({
            id: 'creature-care',
            name: '神奇动物护理',
            description: '你学会了如何照顾神奇动物！',
            icon: '🦉',
            isKeyItem: true,
          });

          const dialogue = getDialogueById('creatures-success');
          if (dialogue) {
            startDialogue(dialogue);
          }

          onClose();
        }, 1500);
      }
    } else {
      setHearts((prev) => {
        const newHearts = prev - 1;
        if (newHearts <= 0) {
          setGameState('failed');
          setTimeout(() => {
            setCurrentCreatureIndex(0);
            setHearts(3);
            setScore(0);
            setGameState('playing');
          }, 2000);
        }
        return newHearts;
      });

      setTimeout(() => {
        setLastAction(null);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-gradient-to-b from-green-800 to-green-600 flex items-center justify-center"
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

      <div className="w-full max-w-lg p-6">
        {/* 标题 */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gold font-bold text-2xl text-center mb-2"
        >
          🦉 神奇动物课
        </motion.h2>

        {/* 分数和生命值 */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-black/30 px-4 py-2 rounded-lg">
            <span className="text-white">分数: </span>
            <span className="text-gold font-bold">{score}</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                animate={i < hearts ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: i < hearts ? Infinity : 0 }}
              >
                <Heart className={`w-6 h-6 ${i < hearts ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 当前动物 */}
        <motion.div
          key={currentCreature.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-black/30 rounded-xl p-6 mb-6 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl mb-4"
          >
            {currentCreature.emoji}
          </motion.div>
          <h3 className="text-white text-xl font-bold mb-2">{currentCreature.name}</h3>
          <p className="text-gray-300 text-sm">{currentCreature.description}</p>
        </motion.div>

        {/* 操作按钮 */}
        <div className="grid grid-cols-3 gap-3">
          {currentCreature.careActions.map((actionId) => {
            const action = actionButtons[actionId as keyof typeof actionButtons];
            return (
              <motion.button
                key={actionId}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAction(actionId)}
                disabled={gameState !== 'playing'}
                className={`${action?.color} p-4 rounded-xl flex flex-col items-center gap-2 hover:opacity-80 transition-opacity disabled:opacity-50`}
              >
                <span className="text-2xl">{action?.emoji}</span>
                <span className="text-white text-sm font-bold">{action?.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* 反馈信息 */}
        <AnimatePresence>
          {lastAction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mt-4 p-3 rounded-lg text-center ${
                lastAction.type === 'success' ? 'bg-green-900/50' : 'bg-red-900/50'
              }`}
            >
              {lastAction.type === 'success' ? (
                <span className="text-green-400 font-bold">✅ {lastAction.action}成功！</span>
              ) : (
                <span className="text-red-400 font-bold">❌ {lastAction.action}让动物不高兴了！</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 游戏结束状态 */}
        <AnimatePresence>
          {gameState === 'failed' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/70 flex items-center justify-center"
            >
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-red-400 text-2xl font-bold mb-2">动物们不高兴了！</h2>
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
                <h2 className="text-green-400 text-2xl font-bold mb-2">照顾成功！</h2>
                <p className="text-gray-400">最终得分: {score}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 进度提示 */}
        <div className="mt-4 flex justify-center gap-2">
          {creatures.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < currentCreatureIndex ? 'bg-green-500' : i === currentCreatureIndex ? 'bg-gold' : 'bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CareOfMagicalCreaturesMiniGame;
