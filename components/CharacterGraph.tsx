'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { characters, getCharacterById } from '@/data/characters';
import useGameStore from '@/store/useGameStore';

interface CharacterGraphProps {
  isOpen: boolean;
  onClose: () => void;
}

// 魔法风格统一配色
const magicColors = {
  primary: '#6b21a8',      // 神秘紫色
  secondary: '#1e1b4b',    // 深紫蓝
  accent: '#fbbf24',       // 金色点缀
  cardBg: '#1a1a2e',       // 卡片背景
  border: '#4c1d95',       // 边框颜色
  text: '#e9d5ff'          // 文字颜色
};

const CharacterGraph = ({ isOpen, onClose }: CharacterGraphProps) => {
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { unlockedCharacters } = useGameStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const selectedChar = selectedCharacter ? getCharacterById(selectedCharacter) : null;

  // 统计解锁进度
  const unlockedCount = unlockedCharacters.length;
  const totalCount = characters.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm overflow-y-auto"
          onClick={handleOverlayClick}
        >
          {/* 关闭按钮 */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={onClose}
            className="fixed top-6 right-6 w-12 h-12 rounded-full bg-gray-800 border border-gold/30 flex items-center justify-center text-gold hover:bg-gray-700 transition-colors z-50"
          >
            <span className="text-2xl">×</span>
          </motion.button>

          {/* 主体内容 */}
          <div className="min-h-screen flex flex-col items-center py-8 px-4">
            {/* 标题 */}
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-gold text-3xl font-bold tracking-wider mb-4 mt-4"
            >
              ✦ 人物关系图谱 ✦
            </motion.h2>
            
            {/* 解锁进度 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-purple-400/70 text-sm mb-8"
            >
              已解锁: <span className="text-amber-400 font-bold">{unlockedCount}</span> / {totalCount}
            </motion.div>

            {/* 人物图谱主体 - 标题下方的人物卡片网格 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-6xl"
            >
              {/* 均衡排列所有人物卡片 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {characters.map((character, index) => {
                  const isUnlocked = unlockedCharacters.includes(character.id);
                  
                  return (
                    <motion.div
                      key={character.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => isUnlocked && setSelectedCharacter(character.id)}
                      className={`transition-all duration-300 ${
                        isUnlocked ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'
                      } ${
                        selectedCharacter === character.id ? 'ring-2 ring-amber-400' : ''
                      }`}
                    >
                      {/* 人物卡片 - 魔法风格 */}
                      <div 
                        className={`relative rounded-xl overflow-hidden border-2 backdrop-blur-sm ${
                          isUnlocked 
                            ? 'border-purple-700/50 bg-gradient-to-b from-purple-900/20 to-purple-950/40' 
                            : 'border-gray-700/30 bg-gray-900/30'
                        }`}
                        style={{ 
                          boxShadow: isUnlocked 
                            ? '0 4px 20px rgba(107, 33, 168, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                            : '0 2px 10px rgba(0, 0, 0, 0.3)'
                        }}
                      >
                        {/* 魔法光晕效果 */}
                        {isUnlocked && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                        )}
                        
                        {/* 头像 */}
                        <div className="relative w-full aspect-square">
                          {isUnlocked ? (
                            <img 
                              src={character.avatar}
                              alt={character.name}
                              className="w-full h-full object-cover"
                              style={{ filter: 'brightness(1.1) saturate(1.1)' }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-800/50 flex items-center justify-center">
                              <span className="text-4xl text-gray-600">🔒</span>
                            </div>
                          )}
                          
                          {/* 魔法悬停遮罩 */}
                          {isUnlocked && (
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-purple-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2">
                              <span className="text-amber-300 text-xs font-bold tracking-wider">✦ 查看详情 ✦</span>
                            </div>
                          )}
                          
                          {/* 角标装饰 */}
                          {isUnlocked && (
                            <>
                              <div className="absolute top-1 right-1 w-3 h-3 border-t border-r border-amber-400/50" />
                              <div className="absolute top-1 left-1 w-3 h-3 border-t border-l border-amber-400/50" />
                              <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-amber-400/50" />
                              <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-amber-400/50" />
                            </>
                          )}
                        </div>

                        {/* 名称 */}
                        <div className={`px-2 py-2 text-center ${
                          isUnlocked 
                            ? 'bg-gradient-to-b from-purple-900/80 to-purple-950/90' 
                            : 'bg-gray-900/80'
                        }`}>
                          <span className={`text-xs font-medium tracking-wide ${
                            isUnlocked ? 'text-purple-200' : 'text-gray-500'
                          }`}>
                            {isUnlocked ? character.name : '???'}
                          </span>
                        </div>

                        {/* 角色标签 */}
                        <div className={`px-2 py-1.5 text-center border-t ${
                          isUnlocked 
                            ? 'bg-black/30 border-purple-700/30' 
                            : 'bg-gray-900/50 border-gray-700/30'
                        }`}>
                          <span className={`text-xs font-medium ${
                            isUnlocked ? 'text-purple-300/80' : 'text-gray-600'
                          }`}>
                            {isUnlocked ? character.role : '未解锁'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* 底部装饰 */}
            <div className="mt-12 text-purple-400/50 text-sm flex items-center gap-2">
              <span className="text-purple-500">✦</span>
              与角色对话后解锁档案
              <span className="text-purple-500">✦</span>
            </div>
          </div>

          {/* 人物详情弹窗 */}
          <AnimatePresence>
            {selectedChar && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-[110]"
                onClick={() => setSelectedCharacter(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative max-w-lg w-full mx-4 bg-gradient-to-b from-purple-950 via-purple-900 to-black border border-purple-600/50 rounded-2xl overflow-hidden"
                  style={{ boxShadow: '0 0 40px rgba(107, 33, 168, 0.4), 0 0 80px rgba(107, 33, 168, 0.2)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* 魔法边框装饰 */}
                  <div className="absolute inset-0 border border-purple-500/20 rounded-2xl pointer-events-none" />
                  
                  {/* 头部 */}
                  <div className="relative h-36 bg-gradient-to-br from-purple-800/60 via-indigo-900/40 to-purple-950/80">
                    {/* 魔法粒子效果 */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-4 left-1/4 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
                      <div className="absolute top-8 right-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse delay-100" />
                      <div className="absolute bottom-8 left-1/3 w-1 h-1 bg-amber-300 rounded-full animate-pulse delay-200" />
                      <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-300" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* 头像 */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="absolute -bottom-16 left-1/2 -translate-x-1/2"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-purple-500 to-amber-400 rounded-full blur-lg opacity-50 animate-pulse" />
                        <img 
                          src={selectedChar.avatar}
                          alt={selectedChar.name}
                          className="relative w-32 h-32 rounded-full border-4 border-purple-500/50 shadow-2xl object-cover"
                          style={{ boxShadow: '0 0 20px rgba(107, 33, 168, 0.5)' }}
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* 内容 */}
                  <div className="pt-16 px-6 pb-6">
                    {/* 姓名 */}
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-purple-400">✦</span>
                        <h3 className="text-amber-300 text-2xl font-bold tracking-wide">{selectedChar.name}</h3>
                        <span className="text-purple-400">✦</span>
                      </div>
                      <p className="text-purple-300/70 text-sm tracking-wider">{selectedChar.nameEn}</p>
                      <span className="inline-block mt-3 px-4 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-700/50 to-indigo-700/50 border border-purple-500/30 text-purple-200">
                        {selectedChar.house === 'gryffindor' && '格兰芬多'}
                        {selectedChar.house === 'slytherin' && '斯莱特林'}
                        {selectedChar.house === 'ravenclaw' && '拉文克劳'}
                        {selectedChar.house === 'hufflepuff' && '赫奇帕奇'}
                      </span>
                    </div>

                    {/* 角色 */}
                    <div className="text-center mb-4">
                      <span className="text-purple-400/70">角色：</span>
                      <span className="text-purple-200 font-medium">{selectedChar.role}</span>
                    </div>

                    {/* 描述 */}
                    <div className="bg-gradient-to-br from-purple-900/40 to-black/40 rounded-xl p-4 border border-purple-700/30">
                      <h4 className="text-amber-400 text-sm font-bold mb-2 flex items-center gap-2">
                        <span>📜</span> 人物介绍
                      </h4>
                      <p className="text-purple-200/80 text-sm leading-relaxed">
                        {selectedChar.description}
                      </p>
                    </div>

                    {/* 关系 */}
                    {selectedChar.relationships.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-amber-400 text-sm font-bold mb-2 flex items-center gap-2">
                          <span>🔗</span> 关联人物
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedChar.relationships.map((relId) => {
                            const relChar = getCharacterById(relId);
                            return relChar ? (
                              <motion.span 
                                key={relId}
                                whileHover={{ scale: 1.05 }}
                                className="px-3 py-1.5 bg-gradient-to-r from-purple-800/50 to-indigo-800/50 rounded-lg text-xs text-purple-200 border border-purple-600/30 cursor-pointer hover:border-purple-400/50 transition-colors"
                                onClick={() => setSelectedCharacter(relId)}
                              >
                                {relChar.name}
                              </motion.span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 关闭按钮 */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedCharacter(null)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-purple-200 hover:bg-purple-800/50 hover:border-purple-400/50 transition-all"
                  >
                    <span className="text-lg">×</span>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CharacterGraph;