'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useGameStore from '@/store/useGameStore';

interface MainMenuProps {
  onOpenSpells: () => void;
}

const MainMenu = ({ onOpenSpells }: MainMenuProps) => {
  const { currentMode, setMode, inventory, knownSpells } = useGameStore();
  const [starPositions, setStarPositions] = useState<Array<{ left: string; top: string; delay: number }>>([]);

  useEffect(() => {
    const positions = [...Array(6)].map(() => ({
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      delay: Math.random() * 2
    }));
    setStarPositions(positions);
  }, []);

  // 在对话模式下隐藏菜单（避免遮挡对话框），其他模式都显示
  if (currentMode === 'dialogue') return null;

  const menuItems = [
    {
      id: 'examine',
      label: '调查',
      onClick: () => setMode('examining'),
      symbol: '✦'
    },
    {
      id: 'move',
      label: '移动',
      onClick: () => setMode('moving'),
      symbol: '☽'
    },
    {
      id: 'talk',
      label: '交谈',
      onClick: () => setMode('talking'),
      symbol: '★'
    },
    {
      id: 'inventory',
      label: '背包',
      onClick: () => {},
      badge: inventory.length > 0 ? inventory.length : null,
      symbol: '◆'
    },
    {
      id: 'spells',
      label: '咒语',
      onClick: onOpenSpells,
      badge: knownSpells.length > 0 ? knownSpells.length : null,
      symbol: '⚗'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-1/2 right-4 -translate-y-1/2 z-30 pointer-events-auto"
    >
      {/* 魔法边框装饰 */}
      <div className="relative">
        {/* 背景魔法纹路 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/90 to-black/80 rounded-lg border border-gold/30 backdrop-blur-sm">
          {/* 星星装饰 */}
          {starPositions.map((pos, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-gold/40 text-xs"
              style={{
                left: pos.left,
                top: pos.top
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: pos.delay
              }}
            >
              ✦
            </motion.div>
          ))}
        </div>

        <div className="relative px-3 py-4 flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={item.onClick}
              className="relative flex flex-col items-center gap-1 group"
            >
              {/* 魔法按钮主体 */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                {/* 外圈光芒 */}
                <motion.div
                  className="absolute inset-0 border border-gold/30 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(251, 191, 36, 0.3)',
                      '0 0 20px rgba(251, 191, 36, 0.5)',
                      '0 0 10px rgba(251, 191, 36, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
                
                {/* 内圈 */}
                <div className="absolute inset-1 bg-gradient-to-br from-gray-800 to-black rounded-full border border-gold/40 flex items-center justify-center">
                  <div className="text-gold text-lg font-bold">{item.symbol}</div>
                </div>
              </div>

              {/* 中文标签 - 始终显示 */}
              <span className="text-gold text-xs font-bold tracking-wider whitespace-nowrap">
                {item.label}
              </span>

              {/* Badge */}
              {item.badge && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-900/90 border-2 border-gold rounded-full flex items-center justify-center"
                >
                  <span className="text-gold text-xs font-bold">{item.badge}</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* 顶部装饰 */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gold/40" />
        
        {/* 底部装饰 */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gold/40" />
      </div>
    </motion.div>
  );
};

export default MainMenu;
