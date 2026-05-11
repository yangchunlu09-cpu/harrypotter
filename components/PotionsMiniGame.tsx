'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FlaskConical, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import useGameStore from '@/store/useGameStore';
import { getDialogueById } from '@/data/scenario';

// 魔药材料数据
const potionIngredients = [
  { 
    id: 'ingredient1', 
    name: '草药', 
    description: '散发着神秘的绿色光芒',
    color: 'from-emerald-400 to-green-600', 
    innerColor: 'from-green-300 to-emerald-500',
    symbol: '🌿'
  },
  { 
    id: 'ingredient2', 
    name: '牛黄', 
    description: '如同凝固的金色阳光',
    color: 'from-amber-400 to-yellow-600', 
    innerColor: 'from-yellow-300 to-amber-500',
    symbol: '💎'
  },
  { 
    id: 'ingredient3', 
    name: '树根', 
    description: '古老而充满魔力的木质纹理',
    color: 'from-orange-700 to-amber-900', 
    innerColor: 'from-orange-600 to-amber-800',
    symbol: '🌳'
  },
];

// 正确的添加顺序
const correctOrder = ['ingredient1', 'ingredient2', 'ingredient3'];

interface PotionsMiniGameProps {
  onClose: () => void;
}

const PotionsMiniGame = ({ onClose }: PotionsMiniGameProps) => {
  const { addInventory, startDialogue } = useGameStore();
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [placedIngredients, setPlacedIngredients] = useState<string[]>([]);
  const [gameState, setGameState] = useState<'playing' | 'success' | 'failed'>('playing');
  const [showBubbles, setShowBubbles] = useState(false);
  const [potionColor, setPotionColor] = useState('from-purple-900/30 to-indigo-900/30');

  const remainingIngredients = potionIngredients.filter(
    (ing) => !placedIngredients.includes(ing.id)
  );

  // 更新魔药颜色
  useEffect(() => {
    if (placedIngredients.length === 1) {
      setPotionColor('from-green-800/50 to-emerald-800/50');
    } else if (placedIngredients.length === 2) {
      setPotionColor('from-amber-700/50 to-yellow-800/50');
    } else if (placedIngredients.length === 3) {
      setPotionColor('from-purple-600/60 to-pink-600/60');
    } else {
      setPotionColor('from-purple-900/30 to-indigo-900/30');
    }
  }, [placedIngredients]);

  const handleIngredientClick = (ingredientId: string) => {
    if (gameState !== 'playing' || placedIngredients.includes(ingredientId)) return;
    setSelectedIngredient(ingredientId);
  };

  const handleCauldronClick = () => {
    if (!selectedIngredient || gameState !== 'playing') return;

    const ingredientId = selectedIngredient;
    const expectedIndex = placedIngredients.length;

    if (correctOrder[expectedIndex] === ingredientId) {
      setShowBubbles(true);
      setTimeout(() => setShowBubbles(false), 800);

      const newPlaced = [...placedIngredients, ingredientId];
      setPlacedIngredients(newPlaced);

      if (newPlaced.length === correctOrder.length) {
        setTimeout(() => {
          setGameState('success');
          
          setTimeout(() => {
            addInventory({
              id: 'successful-potion',
              name: '成功的魔药',
              description: '你成功制作了一瓶完美的魔药！',
              icon: '🧪',
              isKeyItem: true,
            });
            
            const dialogue = getDialogueById('potions-success');
            if (dialogue) {
              startDialogue(dialogue);
            }
            
            onClose();
          }, 2000);
        }, 500);
      }
    } else {
      setGameState('failed');
      
      setTimeout(() => {
        setGameState('playing');
        setPlacedIngredients([]);
      }, 2500);
    }
    
    setSelectedIngredient(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(circle at 50% 30%, rgba(75, 0, 130, 0.4) 0%, rgba(0, 0, 0, 0.95) 100%)'
      }}
    >
      {/* 背景魔法星星 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
            animate={{
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 关闭按钮 */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-black/40 backdrop-blur-xl rounded-full hover:bg-black/60 transition-all border border-white/10 hover:border-gold/30 shadow-2xl"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-6 h-6 text-gray-300 hover:text-gold transition-colors" />
      </motion.button>

      <div className="w-full max-w-5xl relative z-10">
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-900/60 via-amber-900/60 to-purple-900/60 rounded-2xl border border-gold/20 shadow-2xl"
            style={{
              boxShadow: '0 0 60px rgba(212, 175, 55, 0.15), inset 0 0 60px rgba(139, 92, 246, 0.05)'
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-gold" fill="currentColor" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold text-gold mb-1" style={{ textShadow: '0 0 30px rgba(212,175,55,0.5)' }}>
                魔药课教室
              </h2>
              <p className="text-purple-300/70 text-sm">调配治疗药水 - 注意顺序</p>
            </div>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              <Sparkles className="w-8 h-8 text-gold" fill="currentColor" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 主游戏区域 */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* 坩埚区域 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <div className="relative">
              {/* 蒸汽效果 */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bg-white/20 rounded-full"
                    style={{
                      width: `${20 + i * 15}px`,
                      height: `${20 + i * 15}px`,
                      left: `${i * -10}px`,
                    }}
                    animate={{
                      y: [0, -60, -60],
                      opacity: [0, 0.5, 0],
                      scale: [0.8, 1.5, 1],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>

              {/* 坩埚 */}
              <motion.div
                onClick={handleCauldronClick}
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedIngredient ? 'hover:scale-105' : ''
                }`}
                whileHover={selectedIngredient ? { scale: 1.02 } : {}}
                whileTap={selectedIngredient ? { scale: 0.98 } : {}}
              >
                {/* 坩埚外部 - 铜色金属质感 */}
                <div className="relative">
                  <div className="w-64 h-44 mx-auto">
                    {/* 坩埚上边缘 - 金属光泽 */}
                    <motion.div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-8 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-t-full shadow-lg"
                      style={{ boxShadow: '0 -4px 12px rgba(217, 119, 6, 0.3), inset 0 4px 8px rgba(255, 255, 255, 0.2)' }}
                    />
                    
                    {/* 坩埚主体 */}
                    <motion.div
                      className="absolute top-4 left-1/2 transform -translate-x-1/2 w-64 h-36 bg-gradient-to-b from-amber-800 via-amber-900 to-stone-900 rounded-b-[50%]"
                      style={{
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 -20px 40px rgba(0, 0, 0, 0.4), inset 0 10px 30px rgba(217, 119, 6, 0.2)'
                      }}
                    />

                    {/* 魔药液体 */}
                    <motion.div
                      className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-52 h-28 bg-gradient-to-b ${potionColor} rounded-b-[45%] overflow-hidden`}
                      animate={gameState === 'success' ? {
                        scale: [1, 1.02, 1],
                      } : gameState === 'failed' ? {
                        rotate: [0, -2, 2, 0],
                      } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      {/* 液体表面反光 */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
                      
                      {/* 沸腾气泡 */}
                      <AnimatePresence>
                        {showBubbles && [...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute bg-white/40 rounded-full"
                            style={{
                              width: `${4 + Math.random() * 8}px`,
                              height: `${4 + Math.random() * 8}px`,
                              left: `${10 + Math.random() * 80}%`,
                              bottom: '10%',
                            }}
                            initial={{ y: 0, opacity: 0 }}
                            animate={{
                              y: -80 - Math.random() * 40,
                              opacity: [0, 0.8, 0],
                              scale: [0.5, 1.2, 0.3],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                              duration: 0.8 + Math.random() * 0.6,
                              delay: Math.random() * 0.4,
                            }}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* 火焰底座 */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="relative w-48 h-8">
                      {[...Array(7)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute bottom-0 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 rounded-t-full"
                          style={{
                            width: `${20 + (i % 2 === 0 ? 10 : 0)}px`,
                            left: `${i * 30 - 30}px`,
                          }}
                          animate={{
                            height: [15 + i * 2, 25 + i * 3, 15 + i * 2],
                            opacity: [0.7, 1, 0.7],
                            scale: [0.95, 1.05, 0.95],
                          }}
                          transition={{
                            duration: 0.4 + i * 0.08,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 状态显示 */}
                <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 text-center w-full">
                  {gameState === 'failed' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-red-900/70 backdrop-blur-sm rounded-xl border border-red-500/50"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <span className="text-red-200 font-bold">💥 魔药爆炸！重新开始</span>
                    </motion.div>
                  ) : gameState === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-900/70 backdrop-blur-sm rounded-xl border border-green-500/50"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-200 font-bold">✨ 完美！魔药成功！</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-900/40 backdrop-blur-sm rounded-xl border border-purple-500/30"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FlaskConical className="w-5 h-5 text-purple-300" />
                      <span className="text-purple-200 font-bold">
                        {selectedIngredient ? '点击坩埚放入材料' : '选择下方的材料'}
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* 进度指示器 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-28 flex justify-center gap-3"
              >
                {potionIngredients.map((ingredient, index) => {
                  const isPlaced = placedIngredients.includes(ingredient.id);
                  const isNext = index === placedIngredients.length;
                  
                  return (
                    <motion.div
                      key={ingredient.id}
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border-2 transition-all ${
                        isPlaced
                          ? 'bg-gradient-to-br from-green-600/60 to-emerald-800/60 border-green-400 shadow-lg shadow-green-500/30'
                          : isNext && gameState === 'playing'
                          ? 'bg-gradient-to-br from-amber-600/40 to-yellow-800/40 border-gold/50 animate-pulse shadow-lg shadow-gold/20'
                          : 'bg-gray-800/50 border-gray-600/50'
                      }`}
                      animate={isPlaced ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ delay: index * 0.1 }}
                    >
                      {isPlaced ? (
                        <CheckCircle className="w-7 h-7 text-green-300" />
                      ) : (
                        <span className={isNext ? 'opacity-100' : 'opacity-40'}>
                          {ingredient.symbol}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* 材料选择区域 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1"
          >
            <div className="bg-gradient-to-b from-gray-900/80 to-gray-950/90 backdrop-blur-xl rounded-2xl border border-gold/20 p-6 shadow-2xl"
                 style={{ boxShadow: '0 0 40px rgba(0, 0, 0, 0.5), inset 0 0 60px rgba(139, 92, 246, 0.05)' }}>
              <h3 className="text-gold font-bold text-lg mb-5 text-center flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" /> 魔法材料 <Sparkles className="w-5 h-5" />
              </h3>
              
              <div className="space-y-4">
                {potionIngredients.map((ingredient, index) => {
                  const isPlaced = placedIngredients.includes(ingredient.id);
                  const isSelected = selectedIngredient === ingredient.id;
                  const isNext = !isPlaced && potionIngredients[placedIngredients.length]?.id === ingredient.id;
                  
                  return (
                    <motion.button
                      key={ingredient.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      onClick={() => handleIngredientClick(ingredient.id)}
                      disabled={isPlaced || gameState !== 'playing'}
                      className={`w-full p-5 rounded-xl border-2 transition-all duration-300 ${
                        isPlaced
                          ? 'bg-gray-800/40 border-gray-700/30 cursor-not-allowed opacity-50'
                          : isSelected
                          ? 'bg-gradient-to-r from-gold/30 to-amber-600/30 border-gold shadow-lg shadow-gold/30 scale-102'
                          : isNext
                          ? 'bg-gradient-to-r from-purple-600/20 to-amber-600/20 border-purple-500/50 hover:border-gold/40 hover:shadow-purple-500/20 cursor-pointer'
                          : 'bg-gray-800/60 border-gray-700/50 hover:border-gray-500/70 cursor-pointer'
                      }`}
                      whileHover={!isPlaced && gameState === 'playing' ? { scale: 1.02 } : {}}
                      whileTap={!isPlaced && gameState === 'playing' ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center gap-4">
                        {/* 材料图标 */}
                        <motion.div
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${ingredient.color} flex items-center justify-center text-2xl shadow-lg ${
                            isSelected ? 'ring-2 ring-gold ring-offset-2 ring-offset-gray-900' : ''
                          }`}
                          animate={isNext && !isSelected ? {
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, -2, 0],
                          } : isSelected ? {
                            scale: [1, 1.1, 1],
                          } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          style={{
                            boxShadow: isSelected 
                              ? '0 0 30px rgba(212,175,55,0.4)' 
                              : isNext
                              ? '0 0 20px rgba(139,92,246,0.3)'
                              : '0 4px 15px rgba(0,0,0,0.3)'
                          }}
                        >
                          {isPlaced ? (
                            <CheckCircle className="w-7 h-7 text-green-200" />
                          ) : (
                            <span>{ingredient.symbol}</span>
                          )}
                        </motion.div>
                        
                        {/* 材料信息 */}
                        <div className="flex-1 text-left">
                          <div className={`font-bold ${isPlaced ? 'text-gray-500' : 'text-white'}`}>
                            {ingredient.name}
                          </div>
                          <div className={`text-sm ${isPlaced ? 'text-gray-600' : 'text-gray-400'}`}>
                            {ingredient.description}
                          </div>
                        </div>

                        {/* 状态标记 */}
                        {isSelected && (
                          <motion.div
                            className="text-gold text-xs font-bold px-3 py-1 bg-gold/20 rounded-full"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            已选择
                          </motion.div>
                        )}
                        {isPlaced && (
                          <span className="text-green-400 text-xs font-bold">已添加</span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* 提示区域 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 pt-5 border-t border-gold/10"
              >
                <div className="text-center">
                  <p className="text-purple-300/70 text-sm mb-2">💡 正确顺序提示</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-900/30 rounded-lg border border-purple-500/20">
                    <span className="text-lg">🌿</span>
                    <span className="text-purple-400">→</span>
                    <span className="text-lg">💎</span>
                    <span className="text-purple-400">→</span>
                    <span className="text-lg">🌳</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* 成功粒子效果 */}
        <AnimatePresence>
          {gameState === 'success' && (
            <>
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-gold to-yellow-400"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
                  animate={{
                    x: (Math.random() - 0.5) * 800,
                    y: (Math.random() - 0.5) * 600,
                    opacity: 0,
                    scale: [0.5, 1.5, 0],
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    ease: 'easeOut',
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* 失败爆炸效果 */}
        <AnimatePresence>
          {gameState === 'failed' && (
            <>
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.3 }}
                  animate={{
                    x: (Math.random() - 0.5) * 600,
                    y: (Math.random() - 0.5) * 500,
                    opacity: 0,
                    scale: [0.3, 2, 0],
                  }}
                  transition={{
                    duration: 0.8 + Math.random() * 0.5,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PotionsMiniGame;