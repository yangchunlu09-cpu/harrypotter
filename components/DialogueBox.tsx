'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '@/store/useGameStore';
import type { DialogueChoice, House } from '@/types/game';

const DialogueBox = () => {
  const { 
    currentMode, 
    dialogueQueue, 
    dialogueIndex, 
    nextDialogue,
    addHousePoints,
    calculateHouse,
    setHouse
  } = useGameStore();

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef<number | null>(null);
  const textRef = useRef('');

  const currentLine = dialogueQueue[dialogueIndex];
  const hasChoices = currentLine?.choices && currentLine.choices.length > 0;

  // 清理定时器
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 打字机效果
  useEffect(() => {
    if (currentMode !== 'dialogue' || !currentLine) {
      clearTimer();
      setDisplayedText('');
      setIsTyping(false);
      return;
    }

    if (textRef.current === currentLine.text && displayedText === currentLine.text) {
      setIsTyping(false);
      return;
    }

    textRef.current = currentLine.text;
    const fullText = currentLine.text;
    let index = 0;

    clearTimer();
    setIsTyping(true);
    setDisplayedText('');

    timerRef.current = window.setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearTimer();
      }
    }, 30);

    return () => clearTimer();
  }, [currentMode, currentLine, clearTimer, dialogueIndex]);

  // 处理选项点击
  const handleChoiceClick = useCallback((choice: DialogueChoice) => {
    if (!currentLine || !hasChoices) return;

    // 如果选项有学院分数，添加分数
    if (choice.housePoints) {
      Object.entries(choice.housePoints).forEach(([house, points]) => {
        addHousePoints(house as House, points);
      });
    }

    // 如果是最后一个问题，计算学院并设置
    if (currentLine.id === 'sc-q4') {
      const house = calculateHouse();
      setHouse(house);
    }

    // 继续下一段对话
    nextDialogue();
  }, [currentLine, hasChoices, addHousePoints, calculateHouse, setHouse, nextDialogue]);

  // 点击处理（非选项模式）
  const handleClick = useCallback(() => {
    if (currentMode !== 'dialogue' || !currentLine) return;

    // 如果有选项，不处理点击
    if (hasChoices) return;

    if (isTyping) {
      clearTimer();
      setDisplayedText(currentLine.text);
      setIsTyping(false);
    } else {
      nextDialogue();
    }
  }, [currentMode, currentLine, hasChoices, isTyping, clearTimer, nextDialogue]);

  // 键盘事件支持
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleClick();
      }
    };

    if (currentMode === 'dialogue') {
      window.addEventListener('keydown', handleKeyPress);
    }

    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentMode, handleClick]);

  // 组件卸载时清理
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return (
    <AnimatePresence>
      {currentMode === 'dialogue' && currentLine && (
        <>
          {/* 对话框 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute bottom-0 left-0 right-0 ${hasChoices ? 'h-1/5' : 'h-1/4'} pointer-events-auto`}
            onClick={handleClick}
          >
            <div className="w-full h-full bg-gradient-to-t from-black/95 via-black/90 to-black/70 backdrop-blur-md border-t border-gold/30 p-6 flex flex-col justify-end">
              {/* 发言者名称 */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-gold animate-pulse" />
                <span className="text-gold font-bold text-lg tracking-wider">
                  {currentLine.speaker}
                </span>
                
                {currentLine.emotion && (
                  <span className="px-2 py-0.5 bg-gray-700/80 rounded text-xs text-gray-300">
                    {currentLine.emotion === 'normal' && '平静'}
                    {currentLine.emotion === 'happy' && '开心'}
                    {currentLine.emotion === 'angry' && '生气'}
                    {currentLine.emotion === 'sad' && '悲伤'}
                    {currentLine.emotion === 'surprised' && '惊讶'}
                  </span>
                )}
              </div>

              {/* 对话文本 */}
              <div className="text-white text-xl leading-relaxed min-h-[48px]">
                {displayedText}
                {isTyping && !hasChoices && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-block w-0.5 h-6 bg-gold ml-1"
                  />
                )}
              </div>

              {/* 继续提示（非选项模式） */}
              {!isTyping && !hasChoices && dialogueIndex < dialogueQueue.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-4 right-6 text-gold/60 text-sm flex items-center gap-2"
                >
                  <span>点击继续</span>
                  <motion.span
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    ▼
                  </motion.span>
                </motion.div>
              )}

              {!isTyping && !hasChoices && dialogueIndex >= dialogueQueue.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-4 right-6 text-gray-400/60 text-sm"
                >
                  对话结束
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* 选项按钮（当有选项时显示） */}
          {hasChoices && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-full max-w-2xl px-8 pointer-events-auto">
                {currentLine.choices?.map((choice, index) => (
                  <motion.button
                    key={choice.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleChoiceClick(choice)}
                    className="w-full p-4 mb-3 bg-black/70 backdrop-blur-sm border-2 border-gold/30 rounded-xl text-left hover:border-gold/60 transition-all duration-200"
                  >
                    <span className="text-white text-lg">
                      {choice.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default DialogueBox;
