import { create } from 'zustand';
import type { GameMode, DialogueLine, InventoryItem, PlayerProfile, House, Spell } from '@/types/game';
import { locations } from '@/data/scenario';

// 中文角色名到角色ID的映射
const characterNameToId: Record<string, string> = {
  '哈利·波特': 'harry',
  '哈利': 'harry',
  '罗恩·韦斯莱': 'ron',
  '罗恩': 'ron',
  '赫敏·格兰杰': 'hermione',
  '赫敏': 'hermione',
  '阿不思·邓布利多': 'dumbledore',
  '邓布利多': 'dumbledore',
  '西弗勒斯·斯内普': 'snape',
  '斯内普': 'snape',
  '米勒娃·麦格': 'mcgonagall',
  '麦格教授': 'mcgonagall',
  '伏地魔': 'voldemort',
  '奇洛教授': 'quirrell',
  '鲁伯·海格': 'hagrid',
  '海格': 'hagrid',
  '德拉科·马尔福': 'malfoy',
  '马尔福': 'malfoy',
  '莉莉·波特': 'lily',
  '莉莉': 'lily',
  '詹姆·波特': 'james',
  '詹姆': 'james',
  '金妮·韦斯莱': 'ginny',
  '金妮': 'ginny',
  '弗立维教授': 'flitwick',
  '斯拉格霍恩教授': 'slughorn',
  '分院帽': 'sorting-hat'
};

interface GameStore {
  // 游戏状态
  currentMode: GameMode;
  currentLocationId: string;
  isTyping: boolean;
  inventory: InventoryItem[];

  // 对话状态
  dialogueQueue: DialogueLine[];
  dialogueIndex: number;

  // 解锁的地点
  unlockedLocations: string[];

  // 解锁的角色（用于人物档案）
  unlockedCharacters: string[];

  // 玩家档案
  playerProfile: PlayerProfile;

  // 咒语系统
  knownSpells: Spell[];
  currentSpell: Spell | null;
  spellCastHistory: string[];

  // 方法
  setMode: (mode: GameMode) => void;
  changeLocation: (locationId: string) => void;
  startDialogue: (lines: DialogueLine[]) => void;
  nextDialogue: () => void;
  completeTyping: () => void;
  addInventory: (item: InventoryItem) => void;
  unlockLocation: (locationId: string) => void;
  unlockCharacter: (characterId: string) => void;
  addHousePoints: (house: House, points: number) => void;
  setHouse: (house: House) => void;
  calculateHouse: () => House;
  addSpell: (spell: Spell) => void;
  setCurrentSpell: (spell: Spell | null) => void;
  castSpell: (spellId: string) => void;
  addSpellCastHistory: (spellId: string) => void;
  clearSpellCastHistory: () => void;
}

const initialPlayerProfile: PlayerProfile = {
  name: '哈利·波特',
  house: undefined,
  housePoints: {
    gryffindor: 0,
    slytherin: 0,
    ravenclaw: 0,
    hufflepuff: 0
  },
  year: 1
};

// 初始咒语
const initialSpells: Spell[] = [
  { id: 'lumos', name: '荧光闪烁', incantation: 'Lumos', effect: '照亮黑暗', icon: '💡', type: 'light', shape: 'circle', shapePattern: '圆形' },
  { id: 'incendio', name: '火焰熊熊', incantation: 'Incendio', effect: '产生火焰', icon: '🔥', type: 'fire', shape: 'zigzag', shapePattern: '锯齿线' },
  { id: 'wingardium', name: '漂浮咒', incantation: 'Wingardium Leviosa', effect: '使物体漂浮', icon: '✨', type: 'charm', shape: 'wave', shapePattern: '波浪线' },
];

const useGameStore = create<GameStore>((set, get) => ({
  // 初始状态
  currentMode: 'idle',
  currentLocationId: 'platform934',
  isTyping: false,
  inventory: [],
  dialogueQueue: [],
  dialogueIndex: 0,
  unlockedLocations: ['platform934', 'trainCabin'],
  unlockedCharacters: ['harry'],
  playerProfile: initialPlayerProfile,
  knownSpells: initialSpells,
  currentSpell: null,
  spellCastHistory: [],

  // 设置游戏模式
  setMode: (mode) => set({ currentMode: mode }),

  // 切换地点 - 自动解锁下一个地点
  changeLocation: (locationId) => {
    // 获取目标地点的索引
    const targetIndex = locations.findIndex(loc => loc.id === locationId);

    // 找出需要解锁的地点：当前到达的地点的下一个地点
    const locationsToUnlock: string[] = [];
    if (targetIndex !== -1 && targetIndex < locations.length - 1) {
      // 获取下一个地点
      const nextLocation = locations[targetIndex + 1];
      if (nextLocation && !get().unlockedLocations.includes(nextLocation.id)) {
        locationsToUnlock.push(nextLocation.id);
      }
    }

    set({
      currentLocationId: locationId,
      dialogueQueue: [],
      dialogueIndex: 0,
      currentMode: 'idle',
      ...(locationsToUnlock.length > 0 && {
        unlockedLocations: [...get().unlockedLocations, ...locationsToUnlock]
      })
    });
  },

  // 开始对话
  startDialogue: (lines) => {
    // 解锁对话中的角色
    lines.forEach(line => {
      if (line.speaker && line.speaker !== '旁白') {
        // 根据角色名获取角色ID
        const characterId = characterNameToId[line.speaker];
        if (characterId) {
          get().unlockCharacter(characterId);
        }
      }
    });

    set({
      dialogueQueue: lines,
      dialogueIndex: 0,
      isTyping: true,
      currentMode: 'dialogue'
    });
  },

  // 下一句对话
  nextDialogue: () => {
    const { dialogueQueue, dialogueIndex, currentMode } = get();

    if (currentMode !== 'dialogue') return;

    // 边界检查：确保对话队列有效
    if (!dialogueQueue || dialogueQueue.length === 0) {
      set({
        dialogueQueue: [],
        dialogueIndex: 0,
        isTyping: false,
        currentMode: 'idle'
      });
      return;
    }

    const nextIndex = dialogueIndex + 1;

    if (nextIndex >= dialogueQueue.length) {
      // 对话结束
      const lastLine = dialogueQueue[dialogueIndex];
      if (lastLine && lastLine.onCompleteAction) {
        // 执行对话完成动作
        const action = lastLine.onCompleteAction;
        switch (action.type) {
          case 'addInventory':
            get().addInventory(action.item);
            break;
          case 'changeLocation':
            get().changeLocation(action.locationId);
            return;
          case 'unlockLocation':
            get().unlockLocation(action.locationId);
            break;
          case 'setHouse':
            get().setHouse(action.house);
            break;
          case 'triggerEvent':
            // 触发事件逻辑可以在这里扩展
            break;
        }
      }

      set({
        dialogueQueue: [],
        dialogueIndex: 0,
        isTyping: false,
        currentMode: 'idle'
      });
    } else {
      set({
        dialogueIndex: nextIndex,
        isTyping: true
      });
    }
  },

  // 完成打字效果（快进）
  completeTyping: () => {
    set({ isTyping: false });
  },

  // 添加物品到背包
  addInventory: (item) => {
    set((state) => {
      const exists = state.inventory.some(i => i.id === item.id);
      if (exists) return state;
      return { inventory: [...state.inventory, item] };
    });
  },

  // 解锁地点
  unlockLocation: (locationId) => {
    set((state) => {
      if (state.unlockedLocations.includes(locationId)) return state;
      return { unlockedLocations: [...state.unlockedLocations, locationId] };
    });
  },

  // 解锁角色（遇到角色后解锁档案）
  unlockCharacter: (characterId) => {
    set((state) => {
      if (state.unlockedCharacters.includes(characterId)) return state;
      return { unlockedCharacters: [...state.unlockedCharacters, characterId] };
    });
  },

  // 添加学院分数
  addHousePoints: (house, points) => {
    set((state) => ({
      playerProfile: {
        ...state.playerProfile,
        housePoints: {
          ...state.playerProfile.housePoints,
          [house]: state.playerProfile.housePoints[house] + points
        }
      }
    }));
  },

  // 设置学院
  setHouse: (house) => {
    set((state) => ({
      playerProfile: {
        ...state.playerProfile,
        house
      }
    }));
  },

  // 计算并返回分数最高的学院
  calculateHouse: (): House => {
    const { housePoints } = get().playerProfile;
    let maxHouse: House = 'gryffindor';
    let maxPoints = housePoints.gryffindor;

    if (housePoints.slytherin > maxPoints) {
      maxPoints = housePoints.slytherin;
      maxHouse = 'slytherin';
    }
    if (housePoints.ravenclaw > maxPoints) {
      maxPoints = housePoints.ravenclaw;
      maxHouse = 'ravenclaw';
    }
    if (housePoints.hufflepuff > maxPoints) {
      maxPoints = housePoints.hufflepuff;
      maxHouse = 'hufflepuff';
    }

    return maxHouse;
  },

  // 添加咒语
  addSpell: (spell) => {
    set((state) => {
      const exists = state.knownSpells.some(s => s.id === spell.id);
      if (exists) return state;
      return { knownSpells: [...state.knownSpells, spell] };
    });
  },

  // 设置当前选中的咒语
  setCurrentSpell: (spell) => {
    set({ currentSpell: spell });
  },

  // 施放咒语
  castSpell: (spellId) => {
    const { knownSpells, addSpellCastHistory } = get();
    const spell = knownSpells.find(s => s.id === spellId);
    if (spell) {
      set({ currentSpell: spell });
      addSpellCastHistory(spellId);
    }
  },

  // 添加咒语施放历史
  addSpellCastHistory: (spellId) => {
    set((state) => ({
      spellCastHistory: [...state.spellCastHistory, spellId]
    }));
  },

  // 清除咒语施放历史
  clearSpellCastHistory: () => {
    set({ spellCastHistory: [] });
  }
}));

export default useGameStore;