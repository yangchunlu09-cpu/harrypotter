// 游戏模式
export type GameMode = 'idle' | 'dialogue' | 'moving' | 'examining' | 'talking';

// 学院类型
export type House = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff';

// 对话选项
export interface DialogueChoice {
  id: string;
  text: string;
  housePoints?: Record<House, number>;
  nextDialogueId?: string;
}

// 对话完成后的动作类型
export type DialogueAction =
  | { type: 'unlockLocation'; locationId: string }
  | { type: 'addInventory'; item: InventoryItem }
  | { type: 'changeLocation'; locationId: string }
  | { type: 'triggerEvent'; eventId: string }
  | { type: 'setHouse'; house: House };

// 物品/线索接口
export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  isKeyItem: boolean;
}

// 热区（可交互区域）接口
export interface Hotzone {
  id: string;
  x: string;        // 百分比字符串，如 "10%"
  y: string;        // 百分比字符串，如 "20%"
  width: string;    // 百分比字符串，如 "15%"
  height: string;   // 百分比字符串，如 "20%"
  targetDialogueId: string;
  description?: string;
}

// 对话行接口
export interface DialogueLine {
  id: string;
  speaker: string;
  text: string;
  characterImage?: string;
  emotion?: 'normal' | 'happy' | 'angry' | 'sad' | 'surprised';
  onCompleteAction?: DialogueAction;
  choices?: DialogueChoice[];
}

// 地点接口
export interface Location {
  id: string;
  name: string;
  bgImage: string;
  unlocked: boolean;
  hotzones: Hotzone[];
  onEnterDialogueId?: string;
}

// 玩家档案
export interface PlayerProfile {
  name: string;
  house?: House;
  housePoints: Record<House, number>;
  year: number;
}

// 咒语类型
export type SpellType = 'light' | 'fire' | 'charm' | 'defense' | 'healing';

// 施法形状类型
export type SpellShape = 'circle' | 'wave' | 'zigzag' | 'triangle' | 'star';

// 咒语接口
export interface Spell {
  id: string;
  name: string;
  incantation: string;
  effect: string;
  icon: string;
  type: SpellType;
  shape: SpellShape;        // 施法时需要绘制的形状
  shapePattern: string;     // 形状描述，用于提示玩家
}
