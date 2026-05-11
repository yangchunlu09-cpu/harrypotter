// 章节ID类型
export type ChapterId = 
  | 'chapter_1'  // 第一章：大难不死的男孩
  | 'chapter_2'  // 第二章：消失的玻璃
  | 'chapter_3'  // 第三章：猫头鹰传书
  | 'chapter_4'  // 第四章：九又四分之三站台
  | 'chapter_5'  // 第五章：霍格沃茨特快
  | 'chapter_6'  // 第六章：分院帽
  | 'chapter_7'  // 第七章：魔药课与决斗俱乐部
  | 'chapter_8'  // 第八章：魁地奇
  | 'chapter_9'  // 第九章：万圣节与巨怪
  | 'chapter_10' // 第十章：厄里斯魔镜
  | 'chapter_11' // 第十一章：尼可·勒梅
  | 'chapter_12' // 第十二章：厄里斯魔镜的秘密
  | 'chapter_13' // 第十三章：魔药与飞行
  | 'chapter_14' // 第十四章：禁林
  | 'chapter_15' // 第十五章：穿越活板门
  | 'chapter_16' // 第十六章：伏地魔
  | 'chapter_17'; // 第十七章：双面人

// 地点ID类型
export type LocationId = 
  | 'privet_drive'       // 女贞路
  | 'hut_on_rock'       // 礁石上的小屋
  | 'diagon_alley'      // 对角巷
  | 'gringotts'         // 古灵阁
  | 'platform934'       // 九又四分之三站台
  | 'hogwarts_express'  // 霍格沃茨特快
  | 'great_hall'        // 大礼堂
  | 'gryffindor_common' // 格兰芬多公共休息室
  | 'potions_class'     // 魔药课教室
  | 'charms_class'      // 魔咒课教室
  | 'flying_class'      // 飞行课场地
  | 'library'           // 图书馆
  | 'hagrids_hut'       // 海格的小屋
  | 'girls_bathroom'    // 女盥洗室
  | 'forbidden_forest'  // 禁林
  | 'dungeon'           // 地牢
  | 'trophy_room'       // 奖杯室
  | 'restricted_section' // 禁书区
  | 'mirror_chamber'    // 厄里斯魔镜密室
  | 'trapdoor_room';    // 活板门房间

// 物品类型
export type ItemType = 'key_item' | 'clue' | 'spell' | 'potion';

export interface GameItem {
  id: string;
  name: string;
  nameEn: string;
  type: ItemType;
  description: string;
  icon: string;
  isConsumable: boolean;
}

// 角色ID类型
export type CharacterId = 
  | 'harry'      // 哈利·波特
  | 'ron'        // 罗恩·韦斯莱
  | 'hermione'   // 赫敏·格兰杰
  | 'dumbledore' // 邓布利多
  | 'snape'      // 斯内普
  | 'mcgonagall' // 麦格教授
  | 'hagrid'     // 海格
  | 'draco'      // 马尔福
  | 'voldemort'  // 伏地魔
  | 'quirrell';  // 奇洛

// 羁绊关系类型
export type BondType = 'friendship' | 'rivalry' | 'respect' | 'fear';

export interface Bond {
  characterId: CharacterId;
  value: number;       // 0-100
  type: BondType;
  milestones: string[]; // 已达成的关键情节
}

// 关键情节标记
export type MilestoneId = 
  | 'troll_saved'           // 拯救赫敏（巨怪事件）
  | 'philosophers_stone'    // 发现魔法石秘密
  | 'quidditch_seeker'      // 成为找球手
  | 'mirror_of_erised'      // 发现厄里斯魔镜
  | 'invisibility_cloak'    // 获得隐形衣
  | 'norbert_rescued'       // 营救诺伯
  | 'potions_challenge'     // 通过魔药考验
  | 'chess_challenge';      // 通过象棋考验

export interface Milestone {
  id: MilestoneId;
  name: string;
  description: string;
  isCompleted: boolean;
}

// 逻辑条件类型
export type ConditionType = 
  | 'has_item'
  | 'milestone_completed'
  | 'bond_level'
  | 'chapter_completed'
  | 'house_points'
  | 'time_of_day';

export interface Condition {
  type: ConditionType;
  target: string;      // 目标ID
  operator: '==' | '!=' | '>' | '>=' | '<' | '<=';
  value: number | boolean | string;
}

// 章节定义
export interface Chapter {
  id: ChapterId;
  title: string;
  titleEn: string;
  description: string;
  requiredPrerequisites: Condition[];
  requiredItems: string[];
  locations: LocationId[];
  onSuccess: ChapterTransition;
  onFail: ChapterTransition;
  milestones: MilestoneId[]; // 本章节可达成的里程碑
}

export interface ChapterTransition {
  type: 'scene' | 'dialogue' | 'mini_game' | 'chapter';
  target: string;
  message?: string;
}

// 动作类型
export type ActionType = 
  | 'enter_location'
  | 'talk_to'
  | 'use_item'
  | 'cast_spell'
  | 'examine'
  | 'complete_chapter';

export interface Action {
  type: ActionType;
  target: string;
  conditions: Condition[];
  successEvent: EventTrigger;
  failEvent: EventTrigger;
}

export interface EventTrigger {
  type: string;
  data: Record<string, unknown>;
}

// 游戏逻辑状态
export interface GameLogicState {
  // 剧情进度
  currentChapter: ChapterId;
  completedChapters: ChapterId[];
  
  // 区域解锁状态
  locationLocks: Record<LocationId, boolean>;
  
  // 物品栏
  inventory: GameItem[];
  
  // 羁绊系统
  bonds: Record<CharacterId, Bond>;
  
  // 关键情节标记
  milestones: Record<MilestoneId, boolean>;
  
  // 学院分数
  housePoints: number;
  
  // 游戏时间
  gameTime: {
    day: number;
    hour: number;
  };
  
  // 标记已访问的场景
  visitedLocations: LocationId[];
  
  // 方法
  // 章节控制
  startChapter: (chapterId: ChapterId) => boolean;
  completeChapter: (chapterId: ChapterId) => void;
  
  // 物品管理
  addItem: (item: GameItem) => void;
  removeItem: (itemId: string) => void;
  hasItem: (itemId: string) => boolean;
  
  // 地点解锁
  unlockLocation: (locationId: LocationId) => void;
  lockLocation: (locationId: LocationId) => void;
  isLocationUnlocked: (locationId: LocationId) => boolean;
  
  // 羁绊系统
  updateBond: (characterId: CharacterId, delta: number) => void;
  addMilestone: (milestoneId: MilestoneId) => void;
  isMilestoneCompleted: (milestoneId: MilestoneId) => boolean;
  
  // 逻辑校验
  checkTrigger: (action: ActionType, target: string) => { success: boolean; message: string };
  
  // 章节条件检查
  checkChapterPrerequisites: (chapterId: ChapterId) => { meets: boolean; missing: string[] };
  
  // 羁绊关系检查
  checkBondConnection: (char1: CharacterId, char2: CharacterId) => boolean;

  // ==================== 剧情引擎 ====================
  
  // 剧情标志位
  plotFlags: Record<string, boolean>;
  setPlotFlag: (flag: string, value: boolean) => void;
  getPlotFlag: (flag: string) => boolean;
  
  // 知识图谱
  knowledgeGraph: Record<string, KnowledgeEntry>;
  addKnowledge: (key: string, entry: KnowledgeEntry) => void;
  hasKnowledge: (key: string) => boolean;
  getKnowledge: (key: string) => KnowledgeEntry | undefined;
}

// 知识图谱条目
export interface KnowledgeEntry {
  key: string;
  name: string;
  description: string;
  sourceItem?: string;
  revealedAt?: { day: number; hour: number };
  relatedCharacters?: CharacterId[];
  relatedLocations?: LocationId[];
  isSecret?: boolean;
}

// 剧情阶段枚举
export type PlotPhase = 
  | 'phase_1_platform'    // 第一阶段：九又四分之三站台
  | 'phase_2_express'      // 第二阶段：特快列车
  | 'phase_3_sorting'      // 第三阶段：分院仪式
  | 'phase_4_adaptation'  // 第四阶段：入学适应
  | 'phase_5_troll_crisis'; // 危机阶段：万圣节巨怪

// 场景分支选项
export interface BranchOption {
  id: string;
  text: string;
  textCn?: string;
  requiredFlags?: string[];
  requiredItems?: string[];
  requiredBondLevel?: Partial<Record<CharacterId, number>>;
  effects: BranchEffect[];
  nextSceneId?: string;
  isHidden?: boolean;
}

// 分支效果
export interface BranchEffect {
  type: 'setFlag' | 'unsetFlag' | 'addItem' | 'removeItem' | 'updateBond' | 'addKnowledge' | 'gainHousePoints' | 'loseHousePoints' | 'triggerScene' | 'lockBranch' | 'addMilestone';
  target?: string;
  value?: number | string | boolean;
  characterId?: CharacterId;
}

// 场景数据结构
export interface Scene {
  id: string;
  phase: PlotPhase;
  title: string;
  locationId?: LocationId;
  triggerCondition: SceneTrigger;
  acquireItems: string[];
  branchOptions: BranchOption[];
  onEnterDialogueId?: string;
  onExitSceneId?: string;
  prerequisites?: Condition[];
}

// 场景触发器
export interface SceneTrigger {
  type: 'auto' | 'location_enter' | 'item_used' | 'dialogue_complete' | 'bond_threshold' | 'chapter_complete' | 'time_reached';
  target?: string;
  requiredFlags?: string[];
  description?: string;
}

// 剧情锁检查结果
export interface PlotLockResult {
  isUnlocked: boolean;
  missingRequirements: string[];
  failedConditions: string[];
}

// 逻辑锁配置
export interface LogicGate {
  id: string;
  description: string;
  conditions: Condition[];
  onPass: 
    | { type: 'triggerScene'; target: string } 
    | { type: 'setFlag'; target: string; value?: boolean };
  onFail: { type: 'triggerScene'; target: string } | { type: 'showMessage'; message: string };
}

// 巧克力蛙卡片数据
export interface ChocolateFrogCard {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  image: string;
  knowledgeKey?: string;
}
