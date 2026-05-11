'use client';

import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '@/store/useGameStore';
import { useState, useEffect, useCallback } from 'react';
import DialogueBox from './DialogueBox';
import MainMenu from './MainMenu';
import ExaminingMode from './ExaminingMode';
import TalkingMode from './TalkingMode';
import MovingMode from './MovingMode';
import SpellInventory from './SpellInventory';
import CharacterGraph from './CharacterGraph';
import ShapeDrawer from './ShapeDrawer';
import { getLocationById, getDialogueById } from '@/data/scenario';
import Image from 'next/image';
import { Wand2, Users } from 'lucide-react';

// 学院颜色映射
const houseColors: Record<string, string> = {
  gryffindor: '#740001',
  slytherin: '#1a472a',
  ravenclaw: '#0e1a40',
  hufflepuff: '#ecb939'
};

// 禁林背景颜色
const forbiddenForestColor = '#0a1a0a';

// 背景层
const BackgroundLayer = () => {
  const { currentLocationId } = useGameStore();
  const location = getLocationById(currentLocationId);
  
  // 优先使用真实背景图，没有则使用占位图
  const bgImageUrl = location?.bgImage && location.bgImage !== ''
    ? location.bgImage
    : `https://placehold.co/1920x1080/1a1a1a/fbbf24?text=${encodeURIComponent(location?.name || '未知场景')}`;

  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLocationId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={bgImageUrl}
            alt={location?.name || '场景'}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1536px) 100vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// 魔鬼网藤蔓层
const DevilSnareLayer = () => {
  const { currentLocationId, spellCastHistory, addInventory, startDialogue } = useGameStore();
  const [isDefeated, setIsDefeated] = useState(false);
  const [showEffect, setShowEffect] = useState(false);

  // 检查是否击败了魔鬼网（先 Lumos 再 Incendio）
  useEffect(() => {
    const history = spellCastHistory;
    const lumosIndex = history.indexOf('lumos');
    const incendioIndex = history.indexOf('incendio');
    
    // 如果先施放了 Lumos，再施放 Incendio，且魔鬼网未被击败
    if (lumosIndex !== -1 && incendioIndex !== -1 && lumosIndex < incendioIndex && !isDefeated) {
      setShowEffect(true);
      setTimeout(() => {
        setIsDefeated(true);
        setShowEffect(false);
        
        // 添加奖励物品
        addInventory({
          id: 'unicorn-hair',
          name: '独角兽毛发',
          description: '珍贵的魔法材料，可用于制作魔杖',
          icon: '🦄',
          isKeyItem: true
        });
        
        // 触发胜利对话
        const dialogue = getDialogueById('devil-snare-defeated');
        if (dialogue) {
          startDialogue(dialogue);
        }
      }, 2000);
    }
  }, [spellCastHistory, isDefeated, addInventory, startDialogue]);

  // 只在禁林场景显示
  if (currentLocationId !== 'forbiddenForest') return null;

  return (
    <div className="absolute inset-0 z-5 pointer-events-none">
      <AnimatePresence>
        {!isDefeated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {/* 魔鬼网藤蔓 */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-full w-8 bg-gradient-to-b from-green-800 to-green-950 opacity-80"
                style={{
                  left: `${10 + i * 11}%`,
                  transform: `skewX(${Math.random() * 20 - 10}deg)`
                }}
                animate={{
                  y: [0, 10, 0],
                  scaleY: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
            
            {/* 藤蔓细节 */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`leaf-${i}`}
                className="absolute w-6 h-4 bg-green-700 rounded-full"
                style={{
                  left: `${5 + Math.random() * 90}%`,
                  top: `${10 + Math.random() * 80}%`
                }}
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
              />
            ))}

            {/* 火焰效果 */}
            {showEffect && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={`fire-${i}`}
                    className="absolute w-4 h-8 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-full blur-sm"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      bottom: '30%'
                    }}
                    animate={{
                      y: [0, -100 - Math.random() * 50],
                      opacity: [1, 1, 0],
                      scale: [1, 1.5, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 人物立绘层
const CharacterLayer = () => {
  const { dialogueQueue, dialogueIndex } = useGameStore();
  const currentLine = dialogueQueue[dialogueIndex];
  
  if (!currentLine) return null;

  // 旁白不显示立绘
  if (currentLine.speaker === '旁白') return null;

  // 优先使用真实立绘，没有则使用占位图
  const characterImageUrl = currentLine.characterImage && currentLine.characterImage !== ''
    ? currentLine.characterImage
    : `https://placehold.co/320x480/2d2d2d/fbbf24?text=${encodeURIComponent(currentLine.speaker)}`;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLine.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          {/* 人物立绘 */}
          <div className="relative">
            <div className="relative w-56 h-72 border-2 border-amber-500/50" style={{ background: 'transparent' }}>
              <Image
                src={characterImageUrl}
                alt={currentLine.speaker}
                fill
                className="object-contain"
                sizes="224px"
                style={{ 
                  filter: 'brightness(1.1) saturate(1.1) drop-shadow(0 10px 30px rgba(0, 0, 0, 0.6))'
                }}
              />
            </div>
          </div>
          
          {/* 情绪标签 */}
          {currentLine.emotion && (
            <div className="mt-4 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-sm text-gray-300">
              {currentLine.emotion === 'normal' && '平静'}
              {currentLine.emotion === 'happy' && '开心'}
              {currentLine.emotion === 'angry' && '生气'}
              {currentLine.emotion === 'sad' && '悲伤'}
              {currentLine.emotion === 'surprised' && '惊讶'}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// UI层
const UILayer = () => {
  const { currentLocationId, playerProfile, currentSpell } = useGameStore();
  const location = getLocationById(currentLocationId);

  // 学院徽章
  const getHouseBadge = () => {
    if (!playerProfile.house) return null;
    
    const houseNames: Record<string, string> = {
      gryffindor: '格兰芬多',
      slytherin: '斯莱特林',
      ravenclaw: '拉文克劳',
      hufflepuff: '赫奇帕奇'
    };
    
    return (
      <div className="absolute top-4 right-4 px-3 py-2 rounded-lg" style={{ backgroundColor: houseColors[playerProfile.house] }}>
        <span className="text-white font-bold text-sm">
          {houseNames[playerProfile.house]}
        </span>
      </div>
    );
  };

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* 场景名称 */}
      <div className="absolute top-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-lg">
        <span className="text-gold font-bold text-sm">
          {location?.name || '未知场景'}
        </span>
      </div>

      {/* 学院徽章 */}
      {getHouseBadge()}

      {/* 当前选中的咒语 */}
      {currentSpell && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-16 left-4 px-3 py-2 bg-purple-900/80 backdrop-blur-sm rounded-lg flex items-center gap-2"
        >
          <Wand2 className="w-4 h-4 text-gold" />
          <span className="text-white text-sm font-bold">{currentSpell.incantation}</span>
        </motion.div>
      )}

      {/* 对话框 */}
      <DialogueBox />
    </div>
  );
};

// 魔杖光标 - 已禁用，使用普通鼠标样式
const WandCursor = () => {
  return null;
};

// 主组件
const GameViewport = () => {
  const { currentLocationId, startDialogue, playerProfile, clearSpellCastHistory, currentSpell, castSpell, setCurrentSpell } = useGameStore();
  const [hasTriggeredSorting, setHasTriggeredSorting] = useState(false);
  const [isSpellInventoryOpen, setIsSpellInventoryOpen] = useState(false);
  const [isCharacterGraphOpen, setIsCharacterGraphOpen] = useState(false);
  const [isDrawingShape, setIsDrawingShape] = useState(false);

  // 进入大礼堂时触发分院仪式
  useEffect(() => {
    const location = getLocationById(currentLocationId);
    
    if (location?.id === 'greatHall' && !playerProfile.house && !hasTriggeredSorting) {
      const dialogue = getDialogueById('sorting-ceremony');
      if (dialogue) {
        setHasTriggeredSorting(true);
        setTimeout(() => {
          startDialogue(dialogue);
        }, 1000);
      }
    }
  }, [currentLocationId, playerProfile.house, hasTriggeredSorting, startDialogue]);

  // 切换场景时清除咒语施放历史
  useEffect(() => {
    clearSpellCastHistory();
  }, [currentLocationId, clearSpellCastHistory]);

  // 处理形状绘制完成
  const handleShapeDrawComplete = useCallback((success: boolean) => {
    setIsDrawingShape(false);
    if (success && currentSpell) {
      castSpell(currentSpell.id);
      // 施法成功后清空当前咒语，等待下次选择
      setTimeout(() => {
        setCurrentSpell(null);
      }, 500);
    }
  }, [currentSpell, castSpell, setCurrentSpell]);

  // 处理场景点击（选中咒语时触发形状绘制）
  const handleViewportClick = useCallback(() => {
    if (currentSpell && !isDrawingShape) {
      setIsDrawingShape(true);
    }
  }, [currentSpell, isDrawingShape]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      {/* 人物档案按钮 - 悬浮在左上角 */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsCharacterGraphOpen(true)}
        className="fixed top-4 left-4 z-50 flex flex-col items-center gap-1"
      >
        <div className="relative w-14 h-14 flex items-center justify-center">
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
          <div className="absolute inset-1.5 bg-gradient-to-br from-gray-800 to-black rounded-full border border-gold/40 flex items-center justify-center">
            <Users className="w-6 h-6 text-gold" />
          </div>
        </div>
        
        {/* 标签 */}
        <span className="text-gold text-xs font-bold tracking-wider">人物档案</span>
      </motion.button>

      <div 
        className={`relative overflow-hidden shadow-2xl ${currentSpell && !isDrawingShape ? 'pointer-cursor' : 'wand-cursor'}`}
        style={{
          width: '90vw',
          maxWidth: 'max-w-5xl',
          aspectRatio: '16/9'
        }}
        onClick={handleViewportClick}
      >
        <BackgroundLayer />
        <DevilSnareLayer />
        <CharacterLayer />
        <UILayer />
        
        {/* 主菜单 */}
        <MainMenu onOpenSpells={() => setIsSpellInventoryOpen(true)} />
        
        {/* 调查模式 */}
        <ExaminingMode />
        
        {/* 交谈模式 */}
        <TalkingMode />
        
        {/* 移动模式 */}
        <MovingMode />
      </div>

      {/* 咒语背包 */}
      <SpellInventory 
        isOpen={isSpellInventoryOpen} 
        onClose={() => setIsSpellInventoryOpen(false)} 
        onSelectSpell={() => setIsDrawingShape(true)}
      />

      {/* 人物图谱 */}
      <CharacterGraph 
        isOpen={isCharacterGraphOpen} 
        onClose={() => setIsCharacterGraphOpen(false)} 
      />

      {/* 魔杖光标 */}
      <WandCursor />

      {/* 形状绘制器 */}
      <ShapeDrawer 
        isActive={isDrawingShape} 
        onComplete={handleShapeDrawComplete} 
      />
    </div>
  );
};

export default GameViewport;
