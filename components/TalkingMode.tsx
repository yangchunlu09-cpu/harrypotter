'use client';

import { motion } from 'framer-motion';
import useGameStore from '@/store/useGameStore';
import { getLocationById } from '@/data/scenario';
import { ArrowLeft, MessageCircle } from 'lucide-react';

const TalkingMode = () => {
  const { currentMode, currentLocationId, setMode, startDialogue } = useGameStore();

  if (currentMode !== 'talking') return null;

  const location = getLocationById(currentLocationId);
  const hotzones = location?.hotzones || [];

  // 过滤出可交谈的对象（包含角色的热区）
  const talkableHotzones = hotzones.filter(hotzone => {
    if (!hotzone.description) return false;
    const desc = hotzone.description;
    return desc.includes('教授') ||
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
           desc.includes('韦斯莱');
  });

  const handleTalk = (targetDialogueId: string) => {
    import('@/data/scenario').then(({ getDialogueById }) => {
      const dialogue = getDialogueById(targetDialogueId);
      if (dialogue) {
        startDialogue(dialogue);
      }
    });
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

      {/* 交谈模式提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg"
      >
        <span className="text-gold font-bold text-sm">交谈模式</span>
      </motion.div>

      {/* 右侧选项列表 */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-40"
      >
        <div className="bg-black/80 backdrop-blur-md rounded-lg border border-gold/30 p-4">
          <h3 className="text-gold font-bold mb-4 text-center">可交谈的对象</h3>
          <div className="space-y-2">
            {talkableHotzones.length > 0 ? (
              talkableHotzones.map((hotzone, index) => (
                <motion.button
                  key={hotzone.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleTalk(hotzone.targetDialogueId)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gold/50 transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-gold" />
                  <span className="text-white text-left">{hotzone.description}</span>
                </motion.button>
              ))
            ) : (
              <div className="text-gray-400 text-center py-4">
                该场景没有可交谈的对象
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TalkingMode;
