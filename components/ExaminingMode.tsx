'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '@/store/useGameStore';
import { getLocationById, locations } from '@/data/scenario';
import { ArrowLeft, Search } from 'lucide-react';
import PotionsMiniGame from './PotionsMiniGame';
import CharmsMiniGame from './CharmsMiniGame';
import FlyingMiniGame from './FlyingMiniGame';
import CareOfMagicalCreaturesMiniGame from './CareOfMagicalCreaturesMiniGame';
import DefenseAgainstTheDarkArtsMiniGame from './DefenseAgainstTheDarkArtsMiniGame';

type MiniGameType = 'potions' | 'charms' | 'flying' | 'creatures' | 'defense' | null;

const ExaminingMode = () => {
  const { currentMode, currentLocationId, setMode, startDialogue, changeLocation } = useGameStore();
  const [activeMiniGame, setActiveMiniGame] = useState<MiniGameType>(null);

  if (currentMode !== 'examining') return null;

  const location = getLocationById(currentLocationId);
  const hotzones = location?.hotzones || [];

  // 找到下一个地点
  const currentIndex = locations.findIndex(loc => loc.id === currentLocationId);
  const nextLocation = currentIndex < locations.length - 1 ? locations[currentIndex + 1] : null;

  // 过滤出物品调查（不包含人物对话）
  const itemHotzones = hotzones.filter(hotzone => {
    if (!hotzone.description) return false;
    const desc = hotzone.description;
    // 排除人物相关的热区
    return !(desc.includes('教授') ||
             desc.includes('罗恩') ||
             desc.includes('赫敏') ||
             desc.includes('马尔福') ||
             desc.includes('海格') ||
             desc.includes('卢娜') ||
             desc.includes('塞德里克') ||
             desc.includes('邓布利多') ||
             desc.includes('弗立维') ||
             desc.includes('霍琦') ||
             desc.includes('奇洛') ||
             desc.includes('胖夫人') ||
             desc.includes('韦斯莱'));
  });

  const handleHotzoneClick = (hotzoneId: string, targetDialogueId: string) => {
    // 检查是否是小游戏触发点
    switch (targetDialogueId) {
      case 'potions-minigame':
        setActiveMiniGame('potions');
        return;
      case 'charms-minigame':
        setActiveMiniGame('charms');
        return;
      case 'flying-minigame':
        setActiveMiniGame('flying');
        return;
      case 'creatures-minigame':
        setActiveMiniGame('creatures');
        return;
      case 'defense-minigame':
        setActiveMiniGame('defense');
        return;
      default:
        // 正常对话触发
        import('@/data/scenario').then(({ getDialogueById }) => {
          const dialogue = getDialogueById(targetDialogueId);
          if (dialogue) {
            startDialogue(dialogue);
          }
        });
    }
  };

  const handleCloseMiniGame = () => {
    setActiveMiniGame(null);
  };

  const handleGoToNextLocation = () => {
    if (nextLocation) {
      if (nextLocation.unlocked) {
        changeLocation(nextLocation.id);
      } else {
        // 提示需要解锁
        import('@/data/scenario').then(({ getDialogueById }) => {
          const dialogue = getDialogueById('location-locked');
          if (dialogue) {
            startDialogue(dialogue);
          } else {
            // 简单提示
            alert('该地点尚未解锁！');
          }
        });
      }
    }
  };

  return (
    <>
      {/* 返回按钮 */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setMode('idle')}
        className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg flex items-center gap-2 text-white hover:bg-black/80 transition-colors z-50"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-bold">返回</span>
      </motion.button>

      {/* 调查模式提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg"
      >
        <span className="text-gold font-bold text-sm">调查模式</span>
      </motion.div>

      {/* 右侧选项列表 */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-40"
      >
        <div className="bg-black/80 backdrop-blur-md rounded-lg border border-gold/30 p-4 max-h-[80vh] overflow-y-auto">
          <h3 className="text-gold font-bold mb-4 text-center">可调查的物品</h3>

          <div className="space-y-2">
            {/* 去往下一个地点按钮 */}
            {nextLocation && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0 }}
                onClick={handleGoToNextLocation}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gold/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="w-5 h-5 text-gold" />
                <div className="text-left flex-1">
                  <span className="text-white text-left">前往下一个地点</span>
                  <div className="text-gold/70 text-xs">{nextLocation.name}</div>
                </div>
                {!nextLocation.unlocked && (
                  <span className="text-red-400 text-xs">🔒</span>
                )}
              </motion.button>
            )}

            {itemHotzones.map((hotzone, index) => (
              <motion.button
                key={hotzone.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: nextLocation ? (index + 1) * 0.1 : index * 0.1 }}
                onClick={() => handleHotzoneClick(hotzone.id, hotzone.targetDialogueId)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gold/50 transition-all"
              >
                <Search className="w-5 h-5 text-gold" />
                <span className="text-white text-left">{hotzone.description}</span>
              </motion.button>
            ))}
            {itemHotzones.length === 0 && !nextLocation && (
              <div className="text-gray-400 text-center py-4">
                该场景没有可调查的物品
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* 小游戏组件 */}
      <AnimatePresence>
        {activeMiniGame === 'potions' && (
          <PotionsMiniGame onClose={handleCloseMiniGame} />
        )}
        {activeMiniGame === 'charms' && (
          <CharmsMiniGame onClose={handleCloseMiniGame} />
        )}
        {activeMiniGame === 'flying' && (
          <FlyingMiniGame onClose={handleCloseMiniGame} />
        )}
        {activeMiniGame === 'creatures' && (
          <CareOfMagicalCreaturesMiniGame onClose={handleCloseMiniGame} />
        )}
        {activeMiniGame === 'defense' && (
          <DefenseAgainstTheDarkArtsMiniGame onClose={handleCloseMiniGame} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ExaminingMode;