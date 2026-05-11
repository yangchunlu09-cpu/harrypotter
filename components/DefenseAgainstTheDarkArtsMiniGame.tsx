'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Swords, CheckCircle, AlertCircle } from 'lucide-react';
import useGameStore from '@/store/useGameStore';
import { getDialogueById } from '@/data/scenario';

interface DefenseAgainstTheDarkArtsMiniGameProps {
  onClose: () => void;
}

// 咒语和对应手势
const spells = [
  { id: 'expelliarmus', name: '除你武器', gesture: '✋', damage: 30 },
  { id: 'stupefy', name: '昏昏倒地', gesture: '☝️', damage: 25 },
  { id: 'protego', name: '盔甲护身', gesture: '🛡️', damage: 0, isShield: true },
  { id: 'sectumsempra', name: '神锋无影', gesture: '✌️', damage: 40 },
];

// 敌人数据
const enemies = [
  { id: 'boggart', name: '博格特', emoji: '👻', hp: 100 },
  { id: 'dementor', name: '摄魂怪', emoji: '👻', hp: 150 },
];

const DefenseAgainstTheDarkArtsMiniGame = ({ onClose }: DefenseAgainstTheDarkArtsMiniGameProps) => {
  const { addInventory, startDialogue } = useGameStore();
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [enemyHp, setEnemyHp] = useState(enemies[0].hp);
  const [playerHp, setPlayerHp] = useState(100);
  const [gameState, setGameState] = useState<'playing' | 'success' | 'failed'>('playing');
  const [score, setScore] = useState(0);
  const [selectedSpell, setSelectedSpell] = useState<string | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [battleLog, setBattleLog] = useState<string[]>([]);

  const currentEnemy = enemies[currentEnemyIndex];

  const addLog = (message: string) => {
    setBattleLog((prev) => [...prev.slice(-4), message]);
  };

  const handleSpellSelect = (spellId: string) => {
    if (!isPlayerTurn || gameState !== 'playing') return;

    setSelectedSpell(spellId);
    const spell = spells.find((s) => s.id === spellId);
    
    if (!spell) return;

    setIsPlayerTurn(false);

    // 玩家攻击或防御
    if (spell.isShield) {
      addLog(`🛡️ 你使用了 ${spell.name}！`);
    } else {
      const damage = spell.damage;
      setEnemyHp((prev) => Math.max(0, prev - damage));
      addLog(`⚔️ 你使用 ${spell.name} 造成了 ${damage} 点伤害！`);
    }

    // 检查敌人是否被击败
    setTimeout(() => {
      if (enemyHp <= spell.damage) {
        addLog(`💀 ${currentEnemy.name} 被击败！`);
        setScore((prev) => prev + 50);

        if (currentEnemyIndex < enemies.length - 1) {
          setTimeout(() => {
            setCurrentEnemyIndex((prev) => prev + 1);
            setEnemyHp(enemies[currentEnemyIndex + 1].hp);
            setIsPlayerTurn(true);
            setSelectedSpell(null);
          }, 1500);
        } else {
          setGameState('success');
          setTimeout(() => {
            addInventory({
              id: 'dark-arts-defense',
              name: '黑魔法防御',
              description: '你学会了如何对抗黑暗生物！',
              icon: '🛡️',
              isKeyItem: true,
            });

            const dialogue = getDialogueById('defense-success');
            if (dialogue) {
              startDialogue(dialogue);
            }

            onClose();
          }, 1500);
        }
      } else {
        // 敌人反击
        setTimeout(() => {
          const enemyDamage = 20;
          setPlayerHp((prev) => {
            const newHp = prev - enemyDamage;
            if (newHp <= 0) {
              addLog(`💔 ${currentEnemy.name} 攻击造成 ${enemyDamage} 点伤害！你被击败了！`);
              setGameState('failed');
              setTimeout(() => {
                setCurrentEnemyIndex(0);
                setEnemyHp(enemies[0].hp);
                setPlayerHp(100);
                setScore(0);
                setBattleLog([]);
                setGameState('playing');
              }, 2000);
            } else {
              addLog(`💔 ${currentEnemy.name} 攻击造成 ${enemyDamage} 点伤害！`);
              setIsPlayerTurn(true);
              setSelectedSpell(null);
            }
            return Math.max(0, newHp);
          });
        }, 1000);
      }
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-gradient-to-b from-purple-900 to-black flex items-center justify-center"
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
          className="text-gold font-bold text-2xl text-center mb-4"
        >
          ⚔️ 黑魔法防御课
        </motion.h2>

        {/* 分数 */}
        <div className="text-center mb-4">
          <span className="text-gray-400">分数: </span>
          <span className="text-gold font-bold text-xl">{score}</span>
        </div>

        {/* 战斗区域 */}
        <div className="flex justify-between items-center mb-6">
          {/* 玩家 */}
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-5xl mb-2"
            >
              🧙
            </motion.div>
            <div className="text-white font-bold mb-1">你</div>
            <div className="w-24 h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500"
                initial={{ width: '100%' }}
                animate={{ width: `${playerHp}%` }}
              />
            </div>
            <span className="text-green-400 text-xs">{playerHp}/100</span>
          </div>

          {/* VS */}
          <div className="text-gold font-bold text-xl">VS</div>

          {/* 敌人 */}
          <div className="text-center">
            <motion.div
              animate={selectedSpell ? { scale: [1, 0.8, 1] } : { x: [-5, 5, -5] }}
              transition={{ duration: 0.3 }}
              className="text-5xl mb-2"
            >
              {currentEnemy.emoji}
            </motion.div>
            <div className="text-white font-bold mb-1">{currentEnemy.name}</div>
            <div className="w-24 h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-500"
                initial={{ width: '100%' }}
                animate={{ width: `${(enemyHp / currentEnemy.hp) * 100}%` }}
              />
            </div>
            <span className="text-red-400 text-xs">{enemyHp}/{currentEnemy.hp}</span>
          </div>
        </div>

        {/* 战斗日志 */}
        <div className="bg-black/50 rounded-lg p-3 mb-4 h-24 overflow-y-auto">
          {battleLog.map((log, index) => (
            <div key={index} className="text-gray-300 text-sm mb-1">{log}</div>
          ))}
        </div>

        {/* 咒语选择 */}
        <div className="grid grid-cols-2 gap-3">
          {spells.map((spell) => (
            <motion.button
              key={spell.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSpellSelect(spell.id)}
              disabled={!isPlayerTurn || gameState !== 'playing'}
              className={`p-4 rounded-xl flex items-center gap-3 ${
                selectedSpell === spell.id
                  ? 'bg-gold/30 border-2 border-gold'
                  : 'bg-gray-800/50 border-2 border-gray-600'
              } disabled:opacity-50`}
            >
              <span className="text-2xl">{spell.gesture}</span>
              <div className="text-left">
                <div className="text-white font-bold">{spell.name}</div>
                <div className="text-gray-400 text-xs">
                  {spell.isShield ? '防御' : `伤害: ${spell.damage}`}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* 回合提示 */}
        <div className="mt-4 text-center">
          {isPlayerTurn ? (
            <span className="text-green-400">轮到你了！选择一个咒语！</span>
          ) : (
            <span className="text-red-400">敌人行动中...</span>
          )}
        </div>

        {/* 游戏结束状态 */}
        <AnimatePresence>
          {gameState === 'failed' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 flex items-center justify-center"
            >
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-red-400 text-2xl font-bold mb-2">战斗失败！</h2>
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
              className="absolute inset-0 bg-black/80 flex items-center justify-center"
            >
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-green-400 text-2xl font-bold mb-2">战斗胜利！</h2>
                <p className="text-gray-400">最终得分: {score}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DefenseAgainstTheDarkArtsMiniGame;
