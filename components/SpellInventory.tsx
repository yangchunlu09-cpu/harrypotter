'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Wand2 } from 'lucide-react';
import useGameStore from '@/store/useGameStore';

interface SpellInventoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSpell: () => void;
}

const SpellInventory = ({ isOpen, onClose, onSelectSpell }: SpellInventoryProps) => {
  const { knownSpells, setCurrentSpell, clearSpellCastHistory } = useGameStore();

  const handleSpellSelect = (spellId: string) => {
    const spell = knownSpells.find(s => s.id === spellId);
    if (spell) {
      setCurrentSpell(spell);
      clearSpellCastHistory();
      onClose();
      onSelectSpell(); // 选择咒语后直接触发施法界面
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md mx-4 p-6 bg-gradient-to-b from-gray-900 to-gray-800 rounded-xl border-2 border-gold/30"
          >
            {/* 标题 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Wand2 className="w-8 h-8 text-gold" />
                <h2 className="text-gold font-bold text-2xl">咒语书</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* 咒语列表 */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {knownSpells.map((spell, index) => (
                <motion.button
                  key={spell.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSpellSelect(spell.id)}
                  className="w-full p-4 bg-gray-700/50 rounded-lg border border-gray-600 hover:border-gold/50 transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{spell.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">{spell.name}</span>
                        <span className="text-gold text-sm italic">{spell.incantation}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{spell.effect}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-purple-400">施法形状:</span>
                        <span className="text-xs text-gold">{spell.shapePattern}</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* 提示 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 text-xs text-center mt-4"
            >
              💡 选择咒语后，鼠标会变成法杖，点击目标施放咒语
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpellInventory;
