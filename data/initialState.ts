import type { GameItem, CharacterId, MilestoneId, LocationId } from '@/types/gameLogic';

// 初始物品
export const initialItems: GameItem[] = [
  {
    id: 'hogwarts_letter',
    name: '霍格沃茨录取通知书',
    nameEn: 'Hogwarts Letter',
    type: 'key_item',
    description: '一封用绿色墨水书写的信件，上面写着你的名字和地址。',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hogwarts%20acceptance%20letter%20wax%20seal%2C%20rolled%20parchment%2C%20green%20ink%2C%20owl%20delivery%2C%20magic%20envelope%2C%20Harry%20Potter%20style&image_size=square',
    isConsumable: false
  },
  {
    id: 'wand',
    name: '魔杖',
    nameEn: 'Wand',
    type: 'key_item',
    description: '一根十一英寸长的冬青木魔杖，杖芯是凤凰羽毛。',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Magic%20wand%20wooden%20handle%2C%20phoenix%20feather%20core%2C%20glowing%20tip%2C%20wizard%20wand%2C%20Harry%20Potter%20style%2C%20fantasy%20magic&image_size=square',
    isConsumable: false
  },
  {
    id: 'cauldron',
    name: '坩埚',
    nameEn: 'Cauldron',
    type: 'key_item',
    description: '一个黄铜制的坩埚，适合熬制各种魔药。',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Brass%20cauldron%20for%20potions%2C%20magical%20alchemy%20vessel%2C%20bubbling%20liquid%2C%20wizarding%20equipment%2C%20Harry%20Potter%20style&image_size=square',
    isConsumable: false
  },
  {
    id: 'quill',
    name: '羽毛笔',
    nameEn: 'Quill',
    type: 'key_item',
    description: '一支用猫头鹰羽毛制成的羽毛笔。',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Owl%20feather%20quill%20pen%2C%20elegant%20writing%20instrument%2C%20wizarding%20stationery%2C%20Harry%20Potter%20style%2C%20fantasy%20medieval&image_size=square',
    isConsumable: false
  },
  {
    id: 'parchment',
    name: '羊皮纸',
    nameEn: 'Parchment',
    type: 'key_item',
    description: '一张空白的羊皮纸，用于书写作业和笔记。',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Blank%20parchment%20scroll%2C%20ancient%20paper%2C%20wizarding%20document%2C%20aged%20yellow%20paper%2C%20Harry%20Potter%20style%2C%20fantasy&image_size=square',
    isConsumable: false
  },
  {
    id: 'lumos_spell',
    name: '荧光闪烁',
    nameEn: 'Lumos',
    type: 'spell',
    description: '一个简单的照明咒语，可以让魔杖顶端发出光芒。',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Lumos%20spell%20light%20effect%2C%20glowing%20wand%20tip%2C%20magic%20sparkles%2C%20bright%20illumination%2C%20Harry%20Potter%20spell%2C%20fantasy%20magic&image_size=square',
    isConsumable: false
  },
  {
    id: 'wingardium_leviosa',
    name: '羽加迪姆·勒维奥萨',
    nameEn: 'Wingardium Leviosa',
    type: 'spell',
    description: '悬浮咒，可以让物体漂浮起来。',
    icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Levitation%20spell%20Wingardium%20Leviosa%2C%20floating%20object%2C%20magic%20blue%20glow%2C%20wizarding%20charm%2C%20Harry%20Potter%20spell%2C%20fantasy%20magic&image_size=square',
    isConsumable: false
  }
];

// 初始羁绊值
export const initialBonds = {
  harry: {
    characterId: 'harry' as CharacterId,
    value: 100,
    type: 'friendship' as const,
    milestones: []
  },
  ron: {
    characterId: 'ron' as CharacterId,
    value: 0,
    type: 'friendship' as const,
    milestones: []
  },
  hermione: {
    characterId: 'hermione' as CharacterId,
    value: 0,
    type: 'friendship' as const,
    milestones: []
  },
  dumbledore: {
    characterId: 'dumbledore' as CharacterId,
    value: 10,
    type: 'respect' as const,
    milestones: []
  },
  snape: {
    characterId: 'snape' as CharacterId,
    value: -20,
    type: 'rivalry' as const,
    milestones: []
  },
  mcgonagall: {
    characterId: 'mcgonagall' as CharacterId,
    value: 5,
    type: 'respect' as const,
    milestones: []
  },
  hagrid: {
    characterId: 'hagrid' as CharacterId,
    value: 20,
    type: 'friendship' as const,
    milestones: []
  },
  draco: {
    characterId: 'draco' as CharacterId,
    value: -10,
    type: 'rivalry' as const,
    milestones: []
  },
  voldemort: {
    characterId: 'voldemort' as CharacterId,
    value: -100,
    type: 'fear' as const,
    milestones: []
  },
  quirrell: {
    characterId: 'quirrell' as CharacterId,
    value: 5,
    type: 'respect' as const,
    milestones: []
  }
};

// 初始里程碑状态
export const initialMilestones: Record<MilestoneId, boolean> = {
  troll_saved: false,
  philosophers_stone: false,
  quidditch_seeker: false,
  mirror_of_erised: false,
  invisibility_cloak: false,
  norbert_rescued: false,
  potions_challenge: false,
  chess_challenge: false
};

// 初始地点解锁状态 - 按照《魔法石》原著顺序
export const initialLocationLocks: Record<LocationId, boolean> = {
  privet_drive: false,          // 女贞路 - 回忆场景
  hut_on_rock: false,           // 海边小屋 - 需要完成第一章
  diagon_alley: false,          // 对角巷 - 需要海格带领
  gringotts: false,             // 古灵阁 - 需要进入对角巷后解锁
  platform934: true,            // 九又四分之三站台 - 初始解锁
  hogwarts_express: true,       // 霍格沃茨特快 - 初始解锁
  great_hall: false,            // 大礼堂 - 需要登上列车后解锁
  gryffindor_common: false,     // 格兰芬多公共休息室 - 需要分院后解锁
  potions_class: false,         // 魔药课教室 - 需要开始上课
  charms_class: false,          // 魔咒课教室 - 需要开始上课
  flying_class: false,          // 飞行课场地 - 需要开始上课
  library: false,               // 图书馆 - 需要到达霍格沃茨
  hagrids_hut: false,           // 海格的小屋 - 需要完成特定任务
  girls_bathroom: false,        // 女盥洗室 - 需要完成巨怪事件
  forbidden_forest: false,      // 禁林 - 需要完成特定任务
  dungeon: false,               // 地牢 - 需要探索
  trophy_room: false,           // 奖杯室 - 需要探索
  restricted_section: false,    // 禁书区 - 需要获得隐形衣
  mirror_chamber: false,        // 厄里斯魔镜密室 - 需要发现厄里斯魔镜
  trapdoor_room: false          // 活板门房间 - 需要完成多个任务
};
