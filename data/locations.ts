import type { Location, DialogueLine } from '@/types/game';

// 地点数据 - 按照原著情节顺序解锁
export const locations: Location[] = [
  {
    id: 'platform934',
    name: '九又四分之三站台',
    bgImage: '/bg_platform.jpg',
    unlocked: true,
    hotzones: [
      {
        id: 'platform-sign',
        x: '30%',
        y: '40%',
        width: '20%',
        height: '15%',
        targetDialogueId: 'platform-sign',
        description: '站台标识牌'
      },
      {
        id: 'trolley',
        x: '60%',
        y: '55%',
        width: '15%',
        height: '20%',
        targetDialogueId: 'trolley',
        description: '手推车'
      }
    ]
  },
  {
    id: 'hogwarts_express',
    name: '霍格沃茨特快',
    bgImage: '',
    unlocked: true,
    hotzones: [
      {
        id: 'train-door',
        x: '45%',
        y: '55%',
        width: '12%',
        height: '20%',
        targetDialogueId: 'train-door',
        description: '列车车门'
      },
      {
        id: 'snack-cart',
        x: '70%',
        y: '60%',
        width: '15%',
        height: '18%',
        targetDialogueId: 'snack-cart',
        description: '零食车'
      }
    ]
  },
  {
    id: 'great_hall',
    name: '大礼堂',
    bgImage: '/bg_great_hall.jpg',
    unlocked: false,
    hotzones: [
      {
        id: 'gryffindor-table',
        x: '25%',
        y: '50%',
        width: '15%',
        height: '20%',
        targetDialogueId: 'gryffindor-table',
        description: '格兰芬多长桌'
      },
      {
        id: 'dumbledores-chair',
        x: '50%',
        y: '35%',
        width: '10%',
        height: '15%',
        targetDialogueId: 'dumbledores-chair',
        description: '邓布利多的座位'
      },
      {
        id: 'sorting-hat',
        x: '50%',
        y: '25%',
        width: '8%',
        height: '12%',
        targetDialogueId: 'sorting-hat',
        description: '分院帽'
      }
    ]
  },
  {
    id: 'gryffindor_common',
    name: '格兰芬多公共休息室',
    bgImage: '',
    unlocked: false,
    hotzones: [
      {
        id: 'common-fireplace',
        x: '50%',
        y: '55%',
        width: '20%',
        height: '25%',
        targetDialogueId: 'common-fireplace',
        description: '壁炉'
      },
      {
        id: 'common-couch',
        x: '30%',
        y: '60%',
        width: '15%',
        height: '12%',
        targetDialogueId: 'common-couch',
        description: '沙发'
      }
    ]
  },
  {
    id: 'charms_class',
    name: '魔咒课教室',
    bgImage: '',
    unlocked: false,
    hotzones: [
      {
        id: 'flitwick-desk',
        x: '75%',
        y: '40%',
        width: '12%',
        height: '18%',
        targetDialogueId: 'flitwick-desk',
        description: '弗立维教授的讲台'
      },
      {
        id: 'wand-practice',
        x: '40%',
        y: '55%',
        width: '15%',
        height: '20%',
        targetDialogueId: 'wand-practice',
        description: '魔杖练习区'
      }
    ]
  },
  {
    id: 'potions_class',
    name: '魔药课教室',
    bgImage: '/bg_potions.jpg',
    unlocked: false,
    hotzones: [
      {
        id: 'snape-desk',
        x: '75%',
        y: '40%',
        width: '12%',
        height: '18%',
        targetDialogueId: 'snape-desk',
        description: '斯内普的讲台'
      },
      {
        id: 'cauldron',
        x: '35%',
        y: '55%',
        width: '10%',
        height: '15%',
        targetDialogueId: 'cauldron',
        description: '坩埚'
      },
      {
        id: 'ingredients-shelf',
        x: '10%',
        y: '45%',
        width: '12%',
        height: '25%',
        targetDialogueId: 'ingredients-shelf',
        description: '药材架'
      }
    ]
  },
  {
    id: 'flying_class',
    name: '飞行课场地',
    bgImage: '',
    unlocked: false,
    hotzones: [
      {
        id: 'broom-rack',
        x: '80%',
        y: '50%',
        width: '12%',
        height: '20%',
        targetDialogueId: 'broom-rack',
        description: '扫帚架'
      },
      {
        id: 'flying-area',
        x: '45%',
        y: '55%',
        width: '25%',
        height: '25%',
        targetDialogueId: 'flying-area',
        description: '飞行练习区'
      }
    ]
  },
  {
    id: 'library',
    name: '图书馆',
    bgImage: '',
    unlocked: false,
    hotzones: [
      {
        id: 'reading-table',
        x: '40%',
        y: '55%',
        width: '20%',
        height: '15%',
        targetDialogueId: 'reading-table',
        description: '阅读桌'
      },
      {
        id: 'book-shelf',
        x: '65%',
        y: '45%',
        width: '15%',
        height: '30%',
        targetDialogueId: 'book-shelf',
        description: '书架'
      },
      {
        id: 'restricted-section',
        x: '20%',
        y: '40%',
        width: '12%',
        height: '35%',
        targetDialogueId: 'restricted-section',
        description: '禁书区'
      }
    ]
  },
  {
    id: 'hagrids_hut',
    name: '海格的小屋',
    bgImage: '',
    unlocked: false,
    hotzones: [
      {
        id: 'hut-door',
        x: '50%',
        y: '55%',
        width: '12%',
        height: '18%',
        targetDialogueId: 'hut-door',
        description: '小屋门'
      },
      {
        id: 'boar-hide',
        x: '35%',
        y: '50%',
        width: '15%',
        height: '20%',
        targetDialogueId: 'boar-hide',
        description: '野猪皮'
      }
    ]
  },
  {
    id: 'girls_bathroom',
    name: '女盥洗室',
    bgImage: '',
    unlocked: false,
    hotzones: [
      {
        id: 'mirror',
        x: '60%',
        y: '45%',
        width: '10%',
        height: '15%',
        targetDialogueId: 'mirror',
        description: '镜子'
      },
      {
        id: 'stall',
        x: '30%',
        y: '50%',
        width: '12%',
        height: '25%',
        targetDialogueId: 'stall',
        description: '隔间'
      }
    ]
  },
  {
    id: 'dungeon',
    name: '地牢',
    bgImage: '',
    unlocked: false,
    hotzones: [
      {
        id: 'troll-spot',
        x: '50%',
        y: '55%',
        width: '20%',
        height: '25%',
        targetDialogueId: 'troll-spot',
        description: '巨怪出没处'
      }
    ]
  },
  {
    id: 'mirror_chamber',
    name: '厄里斯魔镜密室',
    bgImage: '',
    unlocked: false,
    hotzones: [
      {
        id: 'mirror_of_erised',
        x: '50%',
        y: '45%',
        width: '25%',
        height: '35%',
        targetDialogueId: 'mirror_of_erised',
        description: '厄里斯魔镜'
      }
    ]
  },
  {
    id: 'forbidden_forest',
    name: '禁林',
    bgImage: '',
    unlocked: false,
    hotzones: [
      {
        id: 'centaur-clearing',
        x: '50%',
        y: '50%',
        width: '20%',
        height: '25%',
        targetDialogueId: 'centaur-clearing',
        description: '马人空地'
      },
      {
        id: 'norbert-cave',
        x: '70%',
        y: '60%',
        width: '15%',
        height: '20%',
        targetDialogueId: 'norbert-cave',
        description: '诺伯的洞穴'
      }
    ]
  },
  {
    id: 'trapdoor_room',
    name: '活板门房间',
    bgImage: '',
    unlocked: false,
    hotzones: [
      {
        id: 'trapdoor',
        x: '50%',
        y: '65%',
        width: '15%',
        height: '10%',
        targetDialogueId: 'trapdoor',
        description: '活板门'
      },
      {
        id: 'chess-board',
        x: '45%',
        y: '55%',
        width: '25%',
        height: '25%',
        targetDialogueId: 'chess-board',
        description: '巫师棋棋盘'
      }
    ]
  }
];

// 对话数据
export const dialogues: Record<string, DialogueLine[]> = {
  'platform-sign': [
    {
      id: 'ps-1',
      speaker: '旁白',
      text: '九又四分之三站台...这就是传说中的魔法站台。',
      emotion: 'normal'
    },
    {
      id: 'ps-2',
      speaker: '哈利',
      text: '我终于找到了！',
      emotion: 'happy'
    }
  ],
  'trolley': [
    {
      id: 'trolley-1',
      speaker: '胖夫人',
      text: '亲爱的，需要来点巧克力蛙吗？',
      emotion: 'happy'
    },
    {
      id: 'trolley-2',
      speaker: '哈利',
      text: '好的，请给我一块！',
      emotion: 'normal'
    }
  ],
  'train-door': [
    {
      id: 'td-1',
      speaker: '罗恩',
      text: '嘿，这里有个空位！',
      emotion: 'happy'
    },
    {
      id: 'td-2',
      speaker: '哈利',
      text: '谢谢你！',
      emotion: 'normal'
    }
  ],
  'snack-cart': [
    {
      id: 'sc-1',
      speaker: '推车女巫',
      text: '需要点什么？比比多味豆？巧克力蛙？',
      emotion: 'happy'
    },
    {
      id: 'sc-2',
      speaker: '哈利',
      text: '请给我一块巧克力蛙。',
      emotion: 'normal'
    }
  ],
  'gryffindor-table': [
    {
      id: 'gt-1',
      speaker: '罗恩',
      text: '哈利！快来坐这边！',
      emotion: 'happy'
    },
    {
      id: 'gt-2',
      speaker: '哈利',
      text: '谢谢你，罗恩！',
      emotion: 'normal'
    }
  ],
  'dumbledores-chair': [
    {
      id: 'dc-1',
      speaker: '邓布利多',
      text: '欢迎来到霍格沃茨，年轻的巫师们！',
      emotion: 'happy'
    }
  ],
  'sorting-hat': [
    {
      id: 'sh-1',
      speaker: '分院帽',
      text: '嗯...很有意思的小家伙...',
      emotion: 'surprised'
    },
    {
      id: 'sh-2',
      speaker: '分院帽',
      text: '勇敢、机智、忠诚...我决定了！格兰芬多！',
      emotion: 'happy'
    }
  ],
  'common-fireplace': [
    {
      id: 'cf-1',
      speaker: '罗恩',
      text: '这里真舒服！',
      emotion: 'happy'
    }
  ],
  'common-couch': [
    {
      id: 'cc-1',
      speaker: '赫敏',
      text: '我们应该复习一下今天的咒语。',
      emotion: 'normal'
    }
  ],
  'flitwick-desk': [
    {
      id: 'fd-1',
      speaker: '弗立维教授',
      text: '举起你们的魔杖，跟着我说：羽加迪姆勒维奥萨！',
      emotion: 'happy'
    }
  ],
  'wand-practice': [
    {
      id: 'wp-1',
      speaker: '旁白',
      text: '练习悬浮咒的区域。',
      emotion: 'normal'
    }
  ],
  'snape-desk': [
    {
      id: 'sd-1',
      speaker: '斯内普',
      text: '波特...又是你。',
      emotion: 'angry'
    },
    {
      id: 'sd-2',
      speaker: '斯内普',
      text: '我希望你在魔药课上能表现得好一些。',
      emotion: 'normal'
    }
  ],
  'cauldron': [
    {
      id: 'c-1',
      speaker: '旁白',
      text: '一口巨大的铜制坩埚，里面的药水正在沸腾。',
      emotion: 'normal'
    }
  ],
  'ingredients-shelf': [
    {
      id: 'is-1',
      speaker: '旁白',
      text: '架子上摆满了各种奇怪的药材和魔法材料。',
      emotion: 'normal'
    }
  ],
  'broom-rack': [
    {
      id: 'br-1',
      speaker: '伍德',
      text: '波特，这是你的扫帚！',
      emotion: 'happy'
    }
  ],
  'flying-area': [
    {
      id: 'fa-1',
      speaker: '麦格教授',
      text: '注意安全，孩子们！',
      emotion: 'normal'
    }
  ],
  'reading-table': [
    {
      id: 'rt-1',
      speaker: '赫敏',
      text: '哈利，这里有一本关于魔法石的书！',
      emotion: 'surprised'
    },
    {
      id: 'rt-2',
      speaker: '哈利',
      text: '真的吗？快让我看看！',
      emotion: 'happy'
    }
  ],
  'book-shelf': [
    {
      id: 'bs-1',
      speaker: '旁白',
      text: '高耸的书架直达天花板，成千上万的魔法书籍整齐排列。',
      emotion: 'normal'
    }
  ],
  'restricted-section': [
    {
      id: 'rs-1',
      speaker: '赫敏',
      text: '那是禁书区，我们不能进去...',
      emotion: 'sad'
    }
  ],
  'hut-door': [
    {
      id: 'hd-1',
      speaker: '海格',
      text: '哈利！进来坐坐！',
      emotion: 'happy'
    }
  ],
  'boar-hide': [
    {
      id: 'bh-1',
      speaker: '海格',
      text: '这是我打猎时得到的野猪皮！',
      emotion: 'happy'
    }
  ],
  'mirror': [
    {
      id: 'm-1',
      speaker: '赫敏',
      text: '我在这里哭的时候遇到了巨怪...',
      emotion: 'sad'
    }
  ],
  'stall': [
    {
      id: 's-1',
      speaker: '旁白',
      text: '赫敏曾经在这里躲避巨怪。',
      emotion: 'normal'
    }
  ],
  'troll-spot': [
    {
      id: 'ts-1',
      speaker: '罗恩',
      text: '就是这里！巨怪就在这里！',
      emotion: 'angry'
    }
  ],
  'mirror_of_erised': [
    {
      id: 'me-1',
      speaker: '哈利',
      text: '我看到了我的父母...',
      emotion: 'sad'
    }
  ],
  'centaur-clearing': [
    {
      id: 'cc-1',
      speaker: '费伦泽',
      text: '你不该来这里，哈利·波特。',
      emotion: 'normal'
    }
  ],
  'norbert-cave': [
    {
      id: 'nc-1',
      speaker: '罗恩',
      text: '诺伯就在这里！',
      emotion: 'surprised'
    }
  ],
  'trapdoor': [
    {
      id: 't-1',
      speaker: '哈利',
      text: '这就是通往魔法石的入口...',
      emotion: 'surprised'
    }
  ],
  'chess-board': [
    {
      id: 'cb-1',
      speaker: '罗恩',
      text: '我来下棋，你们先走！',
      emotion: 'normal'
    }
  ]
};

export const getLocationById = (id: string): Location | undefined => {
  return locations.find(l => l.id === id);
};

export const getDialogueById = (id: string): DialogueLine[] | undefined => {
  return dialogues[id];
};

// 获取所有已解锁的地点
export const getUnlockedLocations = (): Location[] => {
  return locations.filter(l => l.unlocked);
};
