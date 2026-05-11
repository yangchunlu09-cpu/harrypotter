import type { Scene, LogicGate, ChocolateFrogCard, KnowledgeEntry } from '@/types/gameLogic';

export const PLATFORM_SCENES: Scene[] = [
  {
    id: 'platform_enter',
    phase: 'phase_1_platform',
    title: '九又四分之三站台 - 进入',
    locationId: 'platform934',
    triggerCondition: {
      type: 'location_enter',
      target: 'platform934',
      description: '玩家进入九又四分之三站台'
    },
    acquireItems: [],
    branchOptions: [
      {
        id: 'platform_talk_ron',
        text: '主动与红发男孩交谈',
        textCn: '主动与罗恩交谈',
        effects: [
          { type: 'setFlag', target: 'met_ron', value: true },
          { type: 'updateBond', characterId: 'ron', value: 10 },
          { type: 'setFlag', target: 'ron_friendship_started', value: true }
        ],
        nextSceneId: 'platform_ron_friendship'
      },
      {
        id: 'platform_ignore_ron',
        text: '独自寻找车厢',
        textCn: '独自寻找车厢',
        effects: [
          { type: 'setFlag', target: 'met_ron', value: false }
        ],
        nextSceneId: 'platform_draco_appear'
      }
    ],
    onEnterDialogueId: 'platform_intro'
  },
  {
    id: 'platform_ron_friendship',
    phase: 'phase_1_platform',
    title: '与罗恩的初次相遇',
    locationId: 'platform934',
    triggerCondition: {
      type: 'auto',
      requiredFlags: ['met_ron'],
      description: '与罗恩交谈后'
    },
    acquireItems: [],
    branchOptions: [],
    onEnterDialogueId: 'platform_ron_intro'
  },
  {
    id: 'platform_draco_appear',
    phase: 'phase_1_platform',
    title: '德拉科登场',
    locationId: 'platform934',
    triggerCondition: {
      type: 'auto',
      description: '德拉科出现'
    },
    acquireItems: [],
    branchOptions: [
      {
        id: 'draco_arrogant_reply',
        text: '傲慢回敬',
        textCn: '傲慢回敬德拉科',
        requiredBondLevel: { draco: 0 },
        effects: [
          { type: 'setFlag', target: 'draco_rivalry_started', value: true },
          { type: 'updateBond', characterId: 'draco', value: -20 },
          { type: 'setFlag', target: 'draco_obstacle_difficulty', value: 'hard' }
        ],
        nextSceneId: 'platform_draco_rivalry'
      },
      {
        id: 'draco_cold_ignore',
        text: '冷处理',
        textCn: '冷处理德拉科',
        effects: [
          { type: 'setFlag', target: 'draco_rivalry_started', value: false },
          { type: 'setFlag', target: 'draco_obstacle_difficulty', value: 'normal' }
        ],
        nextSceneId: 'platform_boarding'
      }
    ],
    onEnterDialogueId: 'platform_draco_intro'
  },
  {
    id: 'platform_boarding',
    phase: 'phase_1_platform',
    title: '登上特快列车',
    locationId: 'platform934',
    triggerCondition: {
      type: 'auto',
      description: '登上霍格沃茨特快'
    },
    acquireItems: ['train_ticket'],
    branchOptions: [],
    onEnterDialogueId: 'platform_boarding_success',
    onExitSceneId: 'express_start'
  }
];

export const EXPRESS_SCENES: Scene[] = [
  {
    id: 'express_start',
    phase: 'phase_2_express',
    title: '特快列车出发',
    locationId: 'hogwarts_express',
    triggerCondition: {
      type: 'location_enter',
      target: 'hogwarts_express',
      description: '进入霍格沃茨特快'
    },
    acquireItems: [],
    branchOptions: [],
    onEnterDialogueId: 'express_intro'
  },
  {
    id: 'express_snack_cart',
    phase: 'phase_2_express',
    title: '零食车来了',
    locationId: 'hogwarts_express',
    triggerCondition: {
      type: 'auto',
      description: '点击零食车'
    },
    acquireItems: ['chocolate_frog'],
    branchOptions: [],
    onEnterDialogueId: 'express_snack_intro'
  },
  {
    id: 'express_hermione_encounter',
    phase: 'phase_2_express',
    title: '赫敏的蟾蜍',
    locationId: 'hogwarts_express',
    triggerCondition: {
      type: 'dialogue_complete',
      target: 'express_snack_intro',
      description: '赫敏询问关于蟾蜍'
    },
    acquireItems: [],
    branchOptions: [
      {
        id: 'hermione_help_frog',
        text: '帮助寻找蟾蜍',
        textCn: '帮助寻找纳威的蟾蜍',
        effects: [
          { type: 'setFlag', target: 'metHermione', value: true },
          { type: 'updateBond', characterId: 'hermione', value: 15 },
          { type: 'setFlag', target: 'hermione_trust_gained', value: true }
        ],
        nextSceneId: 'express_hermione_gratitude'
      },
      {
        id: 'hermione_ignore_frog',
        text: '不知道',
        textCn: '不知道蟾蜍的事',
        effects: [
          { type: 'setFlag', target: 'metHermione', value: false },
          { type: 'setFlag', target: 'hermione_rejected_help', value: true }
        ],
        nextSceneId: 'express_hermione_leaves'
      }
    ],
    onEnterDialogueId: 'express_hermione_ask'
  },
  {
    id: 'express_hermione_gratitude',
    phase: 'phase_2_express',
    title: '赫敏的感谢',
    locationId: 'hogwarts_express',
    triggerCondition: {
      type: 'auto',
      requiredFlags: ['hermione_trust_gained'],
      description: '赫敏表达感谢'
    },
    acquireItems: [],
    branchOptions: [],
    onEnterDialogueId: 'express_hermione_thanks'
  }
];

export const SORTING_SCENES: Scene[] = [
  {
    id: 'sorting_ceremony',
    phase: 'phase_3_sorting',
    title: '分院仪式',
    locationId: 'great_hall',
    triggerCondition: {
      type: 'location_enter',
      target: 'great_hall',
      description: '进入大礼堂参加分院'
    },
    acquireItems: [],
    branchOptions: [
      {
        id: 'sorting_deselect_slytherin',
        text: '不要去斯莱特林',
        textCn: '心中默念：不要去斯莱特林',
        effects: [
          { type: 'setFlag', target: 'sorting_wish_expressed', value: true }
        ]
      }
    ],
    onEnterDialogueId: 'sorting_intro'
  },
  {
    id: 'sorting_reaction_game',
    phase: 'phase_3_sorting',
    title: '分院帽的考验',
    locationId: 'great_hall',
    triggerCondition: {
      type: 'auto',
      requiredFlags: ['draco_rivalry_started'],
      description: '德拉科相关flag触发更难分院'
    },
    acquireItems: [],
    branchOptions: [
      {
        id: 'sorting_fast_react',
        text: '快速点击表达意志',
        textCn: '快速点击表达意志',
        effects: [
          { type: 'setFlag', target: 'sorting_resist_slytherin', value: true }
        ]
      }
    ],
    onEnterDialogueId: 'sorting_hat_hesitate'
  }
];

export const ADAPTATION_SCENES: Scene[] = [
  {
    id: 'charms_class_wingardium',
    phase: 'phase_4_adaptation',
    title: '魔咒课 - 悬浮咒',
    locationId: 'charms_class',
    triggerCondition: {
      type: 'location_enter',
      target: 'charms_class',
      description: '进入魔咒课学习悬浮咒'
    },
    acquireItems: ['lumos_spell'],
    branchOptions: [],
    onEnterDialogueId: 'charms_class_intro'
  },
  {
    id: 'library_research',
    phase: 'phase_4_adaptation',
    title: '图书馆研究',
    locationId: 'library',
    triggerCondition: {
      type: 'location_enter',
      target: 'library',
      requiredFlags: ['knowledge_nicolas_flamel'],
      description: '持有尼可·勒梅知识后可在图书馆研究'
    },
    acquireItems: [],
    branchOptions: [
      {
        id: 'library_search_stone',
        text: '查阅魔法石相关书籍',
        textCn: '查阅关于魔法石的资料',
        requiredFlags: ['knowledge_nicolas_flamel'],
        effects: [
          { type: 'addKnowledge', target: 'philosophers_stone', value: true },
          { type: 'setFlag', target: 'stone_investigation_started', value: true }
        ],
        nextSceneId: 'library_stone_clue'
      }
    ],
    onEnterDialogueId: 'library_intro'
  },
  {
    id: 'library_hermione_meet',
    phase: 'phase_4_adaptation',
    title: '图书馆邂逅赫敏',
    locationId: 'library',
    triggerCondition: {
      type: 'location_enter',
      target: 'library',
      description: '赫敏在图书馆等候'
    },
    acquireItems: [],
    branchOptions: [],
    onEnterDialogueId: 'library_hermione_waiting'
  }
];

export const TROLL_CRISIS_SCENES: Scene[] = [
  {
    id: 'troll_event_halloween',
    phase: 'phase_5_troll_crisis',
    title: '万圣节巨怪事件',
    locationId: 'dungeon',
    triggerCondition: {
      type: 'auto',
      description: '万圣节巨怪闯入'
    },
    acquireItems: [],
    branchOptions: [],
    onEnterDialogueId: 'troll_event_intro'
  },
  {
    id: 'troll_hermione_tragedy',
    phase: 'phase_5_troll_crisis',
    title: '赫敏未被拯救',
    locationId: 'dungeon',
    triggerCondition: {
      type: 'auto',
      requiredFlags: ['hermione_rejected_help'],
      description: '因之前拒绝帮助赫敏，她未被拯救'
    },
    acquireItems: [],
    branchOptions: [],
    onEnterDialogueId: 'troll_tragedy_hermione_not_saved'
  },
  {
    id: 'troll_rescue_success',
    phase: 'phase_5_troll_crisis',
    title: '铁三角成立',
    locationId: 'dungeon',
    triggerCondition: {
      type: 'auto',
      requiredFlags: ['hermione_trust_gained'],
      description: '成功拯救赫敏，三人组成立'
    },
    acquireItems: [],
    branchOptions: [
      {
        id: 'troll_trio_form',
        text: '与罗恩、赫敏一起面对巨怪',
        textCn: '铁三角共同对抗巨怪',
        effects: [
          { type: 'setFlag', target: 'golden_triangle_formed', value: true },
          { type: 'updateBond', characterId: 'ron', value: 20 },
          { type: 'updateBond', characterId: 'hermione', value: 25 },
          { type: 'addMilestone', target: 'troll_saved' }
        ]
      }
    ],
    onEnterDialogueId: 'troll_rescue_dialogue'
  }
];

export const ALL_SCENES: Scene[] = [
  ...PLATFORM_SCENES,
  ...EXPRESS_SCENES,
  ...SORTING_SCENES,
  ...ADAPTATION_SCENES,
  ...TROLL_CRISIS_SCENES
];

export const LOGIC_GATES: LogicGate[] = [
  {
    id: 'gate_hermione_rescue',
    description: '检查是否在特快列车上与赫敏建立信任',
    conditions: [
      { type: 'bond_level', target: 'hermione', operator: '>=', value: 10 }
    ],
    onPass: { type: 'triggerScene', target: 'troll_rescue_success' },
    onFail: { type: 'triggerScene', target: 'troll_hermione_tragedy' }
  },
  {
    id: 'gate_draco_obstacle',
    description: '检查德拉科障碍难度',
    conditions: [
      { type: 'milestone_completed', target: 'drdraco_rivalry_started', operator: '==', value: true }
    ],
    onPass: { type: 'triggerScene', target: 'sorting_reaction_game' },
    onFail: { type: 'triggerScene', target: 'sorting_ceremony' }
  },
  {
    id: 'gate_library_info',
    description: '检查赫敏是否会在图书馆提供禁书区信息',
    conditions: [
      { type: 'bond_level', target: 'hermione', operator: '>=', value: 15 }
    ],
    onPass: { type: 'setFlag', target: 'hermione_shares_restricted_info', value: true },
    onFail: { type: 'showMessage', message: '赫敏不愿意分享禁书区的传闻...' }
  }
];

export const CHOCOLATE_FROG_CARDS: ChocolateFrogCard[] = [
  {
    id: 'card_nicolas_flamel',
    name: '尼可·勒梅',
    nameEn: 'Nicolas Flamel',
    description: '著名的炼金术大师，魔法石的创造者。据说他已经活了600多年。',
    image: '/cards/nicolas_flamel.png',
    knowledgeKey: 'Nicolas Flamel'
  },
  {
    id: 'card_dumbledore',
    name: '阿不思·邓布利多',
    nameEn: 'Albus Dumbledore',
    description: '霍格沃茨魔法学校校长，被公认为当代最伟大的巫师。',
    image: '/cards/dumbledore.png',
    knowledgeKey: 'Dumbledore secrets'
  }
];

export const INITIAL_KNOWLEDGE: Record<string, KnowledgeEntry> = {};

export function getSceneById(sceneId: string): Scene | undefined {
  return ALL_SCENES.find(scene => scene.id === sceneId);
}

export function getScenesByPhase(phase: string): Scene[] {
  return ALL_SCENES.filter(scene => scene.phase === phase);
}

export function getNextScenes(currentSceneId: string): Scene[] {
  const currentScene = getSceneById(currentSceneId);
  if (!currentScene || !currentScene.onExitSceneId) return [];
  return ALL_SCENES.filter(scene => scene.id === currentScene.onExitSceneId);
}

export function checkLogicGate(gateId: string, conditions: { type: string; target: string; operator: string; value: unknown }[]): boolean {
  const gate = LOGIC_GATES.find(g => g.id === gateId);
  if (!gate) return false;
  
  return gate.conditions.every(condition => {
    const found = conditions.find(c => c.target === condition.target);
    if (!found) return false;
    
    switch (condition.operator) {
      case '>=':
        return (found.value as number) >= (condition.value as number);
      case '<=':
        return (found.value as number) <= (condition.value as number);
      case '==':
        return found.value === condition.value;
      case '!=':
        return found.value !== condition.value;
      default:
        return false;
    }
  });
}
