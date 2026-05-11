'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wand2, CheckCircle, AlertCircle } from 'lucide-react';
import useGameStore from '@/store/useGameStore';
import { getDialogueById } from '@/data/scenario';

interface CharmsMiniGameProps {
  onClose: () => void;
}

// 咒语数据
const spells = [
  { id: 'wingardium', name: '羽加迪姆·勒维奥萨', parts: ['Wingardium', 'Leviosa'], effect: '漂浮咒' },
];

const CharmsMiniGame = ({ onClose }: CharmsMiniGameProps) => {
  const { addInventory, startDialogue } = useGameStore();
  const [currentSpell] = useState(spells[0]);
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'success' | 'failed'>('playing');
  const [score, setScore] = useState(0);
  const [showEffect, setShowEffect] = useState(false);

  const currentPart = currentSpell.parts[currentPartIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      if (e.key === 'Backspace') {
        setTypedText((prev) => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        const newText = typedText + e.key.toLowerCase();
        setTypedText(newText);

        // 检查是否正确
        if (currentPart.toLowerCase().startsWith(newText)) {
          // 正确输入
          if (newText === currentPart.toLowerCase()) {
            // 完成一个部分
            setScore((prev) => prev + 10);
            if (currentPartIndex < currentSpell.parts.length - 1) {
              setCurrentPartIndex((prev) => prev + 1);
              setTypedText('');
            } else {
              // 完成全部
              setGameState('success');
              setShowEffect(true);

              setTimeout(() => {
                addInventory({
                  id: 'levitation-charm',
                  name: '漂浮咒',
                  description: '你学会了羽加迪姆·勒维奥萨！',
                  icon: '🪶',
                  isKeyItem: true,
                });

                const dialogue = getDialogueById('charms-success');
                if (dialogue) {
                  startDialogue(dialogue);
                }

                onClose();
              }, 2000);
            }
          }
        } else {
          // 错误输入
          setScore((prev) => Math.max(0, prev - 5));
          setGameState('failed');
          
          setTimeout(() => {
            setGameState('playing');
            setCurrentPartIndex(0);
            setTypedText('');
          }, 1500);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedText, currentPart, currentPartIndex, currentSpell.parts.length, gameState, addInventory, startDialogue, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center"
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
          🪄 魔咒课
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-center mb-6"
        >
          {currentSpell.effect}
        </motion.p>

        {/* 分数 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <span className="text-gray-400">分数：</span>
          <motion.span
            key={score}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-gold font-bold text-xl"
          >
            {score}
          </motion.span>
        </motion.div>

        {/* 魔法棒动画 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{ rotate: [-10, 10, -10] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <Wand2 className="w-20 h-20 text-gold" />
            {showEffect && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 3 }}
                className="absolute -top-4 -right-4"
              >
                ✨
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* 咒语显示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 rounded-xl p-6 mb-6"
        >
          <div className="text-center">
            {/* 已完成的部分 */}
            <div className="text-green-400 text-xl mb-2">
              {currentSpell.parts.slice(0, currentPartIndex).join(' ')}
            </div>
            
            {/* 当前正在输入的部分 */}
            <div className="text-white text-3xl font-bold tracking-wider">
              {currentPart.split('').map((char, index) => {
                const typedIndex = typedText.length;
                if (index < typedIndex) {
                  return (
                    <span key={index} className="text-green-400">
                      {char}
                    </span>
                  );
                } else if (index === typedIndex) {
                  return (
                    <motion.span
                      key={index}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="text-gold"
                    >
                      {char}
                    </motion.span>
                  );
                }
                return <span key={index} className="text-gray-500">{char}</span>;
              })}
            </div>

            {/* 剩余部分 */}
            <div className="text-gray-600 text-xl mt-2">
              {currentSpell.parts.slice(currentPartIndex + 1).join(' ')}
            </div>
          </div>
        </motion.div>

        {/* 状态提示 */}
        <AnimatePresence>
          {gameState === 'failed' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-lg bg-red-900/50 flex items-center gap-3 mb-4"
            >
              <AlertCircle className="w-6 h-6 text-red-400" />
              <span className="text-white">发音错误！再试一次！</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {gameState === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-lg bg-green-900/50 flex items-center gap-3 mb-4"
            >
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span className="text-white font-bold">咒语施放成功！</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 提示 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-xs text-center"
        >
          💡 输入咒语：{currentSpell.name}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default CharmsMiniGame;
