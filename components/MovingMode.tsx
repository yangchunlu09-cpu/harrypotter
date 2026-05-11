'use client';

import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '@/store/useGameStore';
import { locations } from '@/data/scenario';
import { ArrowLeft, MapPin, Lock } from 'lucide-react';

const MovingMode = () => {
  const { currentMode, currentLocationId, unlockedLocations, setMode, changeLocation } = useGameStore();

  if (currentMode !== 'moving') return null;

  const handleLocationClick = (locationId: string) => {
    if (unlockedLocations.includes(locationId)) {
      changeLocation(locationId);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
    >
      {/* 返回按钮 */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setMode('idle')}
        className="absolute top-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg flex items-center gap-2 text-white hover:bg-black/80 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-bold">返回</span>
      </motion.button>

      {/* 标题 */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-1/2 transform -translate-x-1/2 text-gold font-bold text-2xl"
      >
        选择目的地
      </motion.h2>

      {/* 地点列表 */}
      <div className="w-full max-w-md p-4 mt-20 overflow-y-auto max-h-[calc(100vh-120px)]">
        <AnimatePresence mode="popLayout">
          {locations.map((location, index) => {
            const isUnlocked = unlockedLocations.includes(location.id);
            const isCurrent = location.id === currentLocationId;

            return (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.button
                  whileHover={isUnlocked ? { scale: 1.02 } : {}}
                  whileTap={isUnlocked ? { scale: 0.98 } : {}}
                  onClick={() => handleLocationClick(location.id)}
                  disabled={!isUnlocked}
                  className={`w-full p-4 rounded-xl flex items-center gap-4 mb-3 transition-all duration-200 ${
                    isCurrent
                      ? 'bg-gold/20 border-2 border-gold'
                      : isUnlocked
                      ? 'bg-white/10 border-2 border-white/20 hover:border-white/40 hover:bg-white/15'
                      : 'bg-gray-800/50 border-2 border-gray-600/50 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {isUnlocked ? (
                    <MapPin className={`w-8 h-8 ${isCurrent ? 'text-gold' : 'text-blue-400'}`} />
                  ) : (
                    <Lock className="w-8 h-8 text-gray-500" />
                  )}
                  
                  <div className="flex-1 text-left">
                    <div className={`font-bold text-lg ${
                      isCurrent ? 'text-gold' : isUnlocked ? 'text-white' : 'text-gray-500'
                    }`}>
                      {location.name}
                    </div>
                    <div className={`text-sm ${
                      isUnlocked ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {isCurrent ? '当前位置' : isUnlocked ? '已解锁' : '未解锁'}
                    </div>
                  </div>

                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-3 h-3 rounded-full bg-gold"
                    />
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MovingMode;
