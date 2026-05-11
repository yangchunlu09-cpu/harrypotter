'use client';

import { create } from 'zustand';
import type { 
  GameLogicState, 
  ChapterId, 
  LocationId, 
  GameItem, 
  CharacterId, 
  MilestoneId, 
  ActionType,
  Condition
} from '@/types/gameLogic';
import { chapters } from '@/data/chapters';

import { initialItems, initialBonds, initialMilestones, initialLocationLocks } from '@/data/initialState';

const useGameLogicStore = create<GameLogicState>((set, get) => ({
  // 剧情进度
  currentChapter: 'chapter_1',
  completedChapters: [],
  
  // 区域解锁状态
  locationLocks: { ...initialLocationLocks },
  
  // 物品栏
  inventory: [...initialItems],
  
  // 羁绊系统
  bonds: { ...initialBonds },
  
  // 关键情节标记
  milestones: { ...initialMilestones },
  
  // 学院分数
  housePoints: 0,
  
  // 游戏时间
  gameTime: {
    day: 1,
    hour: 9
  },
  
  // 标记已访问的场景
  visitedLocations: [],

  // ==================== 剧情引擎 ====================

  // 剧情标志位
  plotFlags: {},

  setPlotFlag: (flag: string, value: boolean) => {
    set((state) => ({
      plotFlags: { ...state.plotFlags, [flag]: value }
    }));
  },

  getPlotFlag: (flag: string): boolean => {
    return get().plotFlags[flag] ?? false;
  },

  // 知识图谱
  knowledgeGraph: {},

  addKnowledge: (key: string, entry: import('@/types/gameLogic').KnowledgeEntry) => {
    set((state) => ({
      knowledgeGraph: {
        ...state.knowledgeGraph,
        [key]: { ...entry, revealedAt: state.gameTime }
      }
    }));
  },

  hasKnowledge: (key: string): boolean => {
    return key in get().knowledgeGraph;
  },

  getKnowledge: (key: string): import('@/types/gameLogic').KnowledgeEntry | undefined => {
    return get().knowledgeGraph[key];
  },
  
  // ==================== 章节控制 ====================
  
  startChapter: (chapterId: ChapterId): boolean => {
    const { checkChapterPrerequisites, completedChapters } = get();
    
    // 检查是否已经完成该章节
    if (completedChapters.includes(chapterId)) {
      set({ currentChapter: chapterId });
      return true;
    }
    
    // 检查前置条件
    const { meets, missing } = checkChapterPrerequisites(chapterId);
    
    if (!meets) {
      console.warn(`无法开始章节 ${chapterId}: ${missing.join(', ')}`);
      return false;
    }
    
    set({ currentChapter: chapterId });
    return true;
  },
  
  completeChapter: (chapterId: ChapterId) => {
    set((state) => {
      if (state.completedChapters.includes(chapterId)) return state;
      
      const chapter = chapters.find((c: typeof chapters[0]) => c.id === chapterId);
      
      if (!chapter) {
        console.error(`Chapter ${chapterId} not found`);
        return state;
      }
      
      // 解锁本章节的地点
      const newLocationLocks = { ...state.locationLocks };
      chapter.locations.forEach((loc: LocationId) => {
        newLocationLocks[loc] = true;
      });
      
      // 标记里程碑
      const newMilestones = { ...state.milestones };
      chapter.milestones.forEach((milestone: MilestoneId) => {
        newMilestones[milestone] = true;
      });
      
      // 更新羁绊（根据章节内容）
      const newBonds = { ...state.bonds };
      updateBondsForChapter(chapterId, newBonds);
      
      return {
        completedChapters: [...state.completedChapters, chapterId],
        locationLocks: newLocationLocks,
        milestones: newMilestones,
        currentChapter: getNextChapter(chapterId) || chapterId
      };
    });
  },
  
  // ==================== 物品管理 ====================
  
  addItem: (item: GameItem) => {
    set((state) => {
      if (state.inventory.some(i => i.id === item.id)) {
        return state;
      }
      return { inventory: [...state.inventory, item] };
    });
  },
  
  removeItem: (itemId: string) => {
    set((state) => ({
      inventory: state.inventory.filter(item => item.id !== itemId)
    }));
  },
  
  hasItem: (itemId: string): boolean => {
    const { inventory } = get();
    return inventory.some(item => item.id === itemId);
  },
  
  // ==================== 地点解锁 ====================
  
  unlockLocation: (locationId: LocationId) => {
    set((state) => ({
      locationLocks: { ...state.locationLocks, [locationId]: true }
    }));
  },
  
  lockLocation: (locationId: LocationId) => {
    set((state) => ({
      locationLocks: { ...state.locationLocks, [locationId]: false }
    }));
  },
  
  isLocationUnlocked: (locationId: LocationId): boolean => {
    const { locationLocks } = get();
    return locationLocks[locationId] || false;
  },
  
  // ==================== 羁绊系统 ====================
  
  updateBond: (characterId: CharacterId, delta: number) => {
    set((state) => {
      const bond = state.bonds[characterId];
      if (!bond) return state;
      
      const newValue = Math.max(0, Math.min(100, bond.value + delta));
      
      // 检查是否达成新的里程碑
      const newBond = { ...bond, value: newValue };
      checkBondMilestones(characterId, newBond);
      
      return {
        bonds: { ...state.bonds, [characterId]: newBond }
      };
    });
  },
  
  addMilestone: (milestoneId: MilestoneId) => {
    set((state) => ({
      milestones: { ...state.milestones, [milestoneId]: true }
    }));
  },
  
  isMilestoneCompleted: (milestoneId: MilestoneId): boolean => {
    const { milestones } = get();
    return milestones[milestoneId] || false;
  },
  
  // ==================== 逻辑校验 ====================
  
  checkTrigger: (action: ActionType, target: string): { success: boolean; message: string } => {
    const { hasItem, isMilestoneCompleted, bonds } = get();
    
    // 根据动作类型和目标执行不同的逻辑检查
    switch (action) {
      case 'enter_location': {
        const locationId = target as LocationId;
        
        // 检查地点是否解锁
        if (!get().isLocationUnlocked(locationId)) {
          return { success: false, message: '这个区域还未解锁' };
        }
        
        // 特殊地点的额外检查
        if (locationId === 'restricted_section') {
          // 禁书区需要隐形衣
          if (!hasItem('invisibility_cloak')) {
            // 触发费尔奇拦截事件
            get().updateBond('mcgonagall', -10);
            return { success: false, message: '费尔奇发现了你！他把你带到了麦格教授那里。' };
          }
        }
        
        if (locationId === 'forbidden_forest') {
          // 禁林需要特定条件
          if (!isMilestoneCompleted('quidditch_seeker')) {
            return { success: false, message: '一年级学生禁止进入禁林！' };
          }
        }
        
        // 记录访问
        set((state) => {
          if (!state.visitedLocations.includes(locationId)) {
            return { visitedLocations: [...state.visitedLocations, locationId] };
          }
          return state;
        });
        
        return { success: true, message: '' };
      }
      
      case 'talk_to': {
        const characterId = target as CharacterId;
        
        // 检查是否有足够的羁绊解锁对话
        const bond = bonds[characterId];
        if (bond && bond.value < 10) {
          return { success: false, message: `${getCharacterName(characterId)}不想和你说话。` };
        }
        
        return { success: true, message: '' };
      }
      
      case 'use_item': {
        const itemId = target;
        
        if (!hasItem(itemId)) {
          return { success: false, message: '你没有这个物品' };
        }
        
        return { success: true, message: '' };
      }
      
      case 'cast_spell': {
        const spellId = target;
        
        if (!hasItem(spellId)) {
          return { success: false, message: '你还不会这个咒语' };
        }
        
        return { success: true, message: '' };
      }
      
      case 'examine': {
        return { success: true, message: '' };
      }
      
      case 'complete_chapter': {
        const chapterId = target as ChapterId;
        const { meets } = get().checkChapterPrerequisites(chapterId);
        
        if (!meets) {
          return { success: false, message: '还未满足完成条件' };
        }
        
        return { success: true, message: '' };
      }
      
      default:
        return { success: true, message: '' };
    }
  },
  
  // ==================== 章节条件检查 ====================
  
  checkChapterPrerequisites: (chapterId: ChapterId): { meets: boolean; missing: string[] } => {
    const { hasItem, isMilestoneCompleted, bonds, completedChapters, housePoints } = get();
    const chapter = chapters.find((c: typeof chapters[0]) => c.id === chapterId);
    
    if (!chapter) {
      console.error(`Chapter ${chapterId} not found`);
      return { meets: false, missing: ['章节不存在'] };
    }
    
    const missing: string[] = [];
    
    for (const condition of chapter.requiredPrerequisites) {
      const result = evaluateCondition(condition, { hasItem, isMilestoneCompleted, bonds, completedChapters, housePoints });
      
      if (!result) {
        missing.push(getConditionDescription(condition));
      }
    }
    
    for (const itemId of chapter.requiredItems) {
      if (!hasItem(itemId)) {
        missing.push(`需要物品: ${getItemName(itemId)}`);
      }
    }
    
    return { meets: missing.length === 0, missing };
  },
  
  // ==================== 羁绊关系检查 ====================
  
  checkBondConnection: (char1: CharacterId, char2: CharacterId): boolean => {
    const { bonds, milestones } = get();
    
    // 赫敏羁绊特殊逻辑：拯救巨怪后羁绊>5自动连接
    if ((char1 === 'harry' && char2 === 'hermione') || 
        (char1 === 'hermione' && char2 === 'harry')) {
      const hermioneBond = bonds['hermione'];
      if (hermioneBond && hermioneBond.value > 5 && milestones['troll_saved']) {
        return true;
      }
    }
    
    // 罗恩羁绊特殊逻辑
    if ((char1 === 'harry' && char2 === 'ron') ||
        (char1 === 'ron' && char2 === 'harry')) {
      const ronBond = bonds['ron'];
      if (ronBond && ronBond.value > 5) {
        return true;
      }
    }
    
    return false;
  }
}));

// ==================== 辅助函数 ====================

function evaluateCondition(
  condition: Condition,
  context: {
    hasItem: (id: string) => boolean;
    isMilestoneCompleted: (id: MilestoneId) => boolean;
    bonds: Record<CharacterId, { value: number }>;
    completedChapters: ChapterId[];
    housePoints: number;
  }
): boolean {
  const { hasItem, isMilestoneCompleted, bonds, completedChapters, housePoints } = context;
  
  switch (condition.type) {
    case 'has_item':
      return hasItem(condition.target);
    
    case 'milestone_completed':
      return isMilestoneCompleted(condition.target as MilestoneId);
    
    case 'bond_level': {
      const bond = bonds[condition.target as CharacterId];
      const bondValue = bond?.value || 0;
      return compareValues(bondValue, condition.operator, condition.value as number);
    }
    
    case 'chapter_completed':
      return completedChapters.includes(condition.target as ChapterId);
    
    case 'house_points':
      return compareValues(housePoints, condition.operator, condition.value as number);
    
    default:
      return true;
  }
}

function compareValues(left: number, operator: string, right: number): boolean {
  switch (operator) {
    case '==': return left === right;
    case '!=': return left !== right;
    case '>': return left > right;
    case '>=': return left >= right;
    case '<': return left < right;
    case '<=': return left <= right;
    default: return true;
  }
}

function getConditionDescription(condition: Condition): string {
  switch (condition.type) {
    case 'has_item':
      return `需要物品: ${getItemName(condition.target)}`;
    case 'milestone_completed':
      return `需要完成: ${getMilestoneName(condition.target as MilestoneId)}`;
    case 'bond_level':
      return `${getCharacterName(condition.target as CharacterId)}羁绊${condition.operator}${condition.value}`;
    case 'chapter_completed':
      return `需要完成章节: ${getChapterName(condition.target as ChapterId)}`;
    case 'house_points':
      return `学院分数${condition.operator}${condition.value}`;
    default:
      return `未满足条件: ${condition.type}`;
  }
}

function getNextChapter(chapterId: ChapterId): ChapterId | null {
  const chapterOrder: ChapterId[] = [
    'chapter_1', 'chapter_2', 'chapter_3', 'chapter_4',
    'chapter_5', 'chapter_6', 'chapter_7', 'chapter_8',
    'chapter_9', 'chapter_10', 'chapter_11', 'chapter_12',
    'chapter_13', 'chapter_14', 'chapter_15', 'chapter_16', 'chapter_17'
  ];
  
  const currentIndex = chapterOrder.indexOf(chapterId);
  if (currentIndex < chapterOrder.length - 1) {
    return chapterOrder[currentIndex + 1];
  }
  return null;
}

function updateBondsForChapter(chapterId: ChapterId, bonds: Record<CharacterId, { value: number }>) {
  // 根据章节更新羁绊
  switch (chapterId) {
    case 'chapter_4': // 九又四分之三站台 - 遇见罗恩
      bonds['ron'] = { ...bonds['ron'], value: Math.min(100, bonds['ron'].value + 10) };
      break;
    case 'chapter_5': // 霍格沃茨特快 - 与罗恩成为朋友
      bonds['ron'] = { ...bonds['ron'], value: Math.min(100, bonds['ron'].value + 5) };
      break;
    case 'chapter_6': // 分院帽 - 与赫敏初次见面
      bonds['hermione'] = { ...bonds['hermione'], value: Math.min(100, bonds['hermione'].value + 5) };
      break;
    case 'chapter_9': // 万圣节与巨怪 - 拯救赫敏
      bonds['hermione'] = { ...bonds['hermione'], value: Math.min(100, bonds['hermione'].value + 20) };
      break;
    case 'chapter_14': // 禁林 - 与罗恩赫敏加深友谊
      bonds['ron'] = { ...bonds['ron'], value: Math.min(100, bonds['ron'].value + 10) };
      bonds['hermione'] = { ...bonds['hermione'], value: Math.min(100, bonds['hermione'].value + 10) };
      break;
  }
}

function checkBondMilestones(_characterId: CharacterId, bond: { value: number; milestones: string[] }) {
  // 根据羁绊值解锁里程碑
  if (bond.value >= 20 && !bond.milestones.includes('friend')) {
    bond.milestones.push('friend');
  }
  if (bond.value >= 50 && !bond.milestones.includes('close_friend')) {
    bond.milestones.push('close_friend');
  }
  if (bond.value >= 80 && !bond.milestones.includes('best_friend')) {
    bond.milestones.push('best_friend');
  }
}

function getCharacterName(characterId: CharacterId): string {
  const names: Record<CharacterId, string> = {
    harry: '哈利·波特',
    ron: '罗恩·韦斯莱',
    hermione: '赫敏·格兰杰',
    dumbledore: '阿不思·邓布利多',
    snape: '西弗勒斯·斯内普',
    mcgonagall: '米勒娃·麦格',
    hagrid: '鲁伯·海格',
    draco: '德拉科·马尔福',
    voldemort: '伏地魔',
    quirrell: '奇洛教授'
  };
  return names[characterId] || characterId;
}

function getItemName(itemId: string): string {
  const items: Record<string, string> = {
    invisibility_cloak: '隐形衣',
    wand: '魔杖',
    cauldron: '坩埚',
    potion_ingredients: '魔药材料',
    quill: '羽毛笔',
    parchment: '羊皮纸',
    book_of_spells: '咒语书'
  };
  return items[itemId] || itemId;
}

function getMilestoneName(milestoneId: MilestoneId): string {
  const names: Record<MilestoneId, string> = {
    troll_saved: '拯救赫敏（巨怪事件）',
    philosophers_stone: '发现魔法石秘密',
    quidditch_seeker: '成为找球手',
    mirror_of_erised: '发现厄里斯魔镜',
    invisibility_cloak: '获得隐形衣',
    norbert_rescued: '营救诺伯',
    potions_challenge: '通过魔药考验',
    chess_challenge: '通过象棋考验'
  };
  return names[milestoneId] || milestoneId;
}

function getChapterName(chapterId: ChapterId): string {
  const chapter = chapters.find((c: typeof chapters[0]) => c.id === chapterId);
  return chapter?.title || chapterId;
}

export default useGameLogicStore;
