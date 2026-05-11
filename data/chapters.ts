import type { Chapter, ChapterId, LocationId, MilestoneId } from '@/types/gameLogic';

export const chapters: Chapter[] = [
  // ==================== 第一章：大难不死的男孩 ====================
  {
    id: 'chapter_1',
    title: '第一章：大难不死的男孩',
    titleEn: 'Chapter 1: The Boy Who Lived',
    description: '讲述哈利·波特的身世和他在女贞路的童年生活。',
    requiredPrerequisites: [],
    requiredItems: [],
    locations: ['privet_drive'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_2',
      message: '海格来了！'
    },
    onFail: {
      type: 'dialogue',
      target: 'dursley_reject',
      message: '德思礼一家拒绝让你离开。'
    },
    milestones: []
  },

  // ==================== 第二章：消失的玻璃 ====================
  {
    id: 'chapter_2',
    title: '第二章：消失的玻璃',
    titleEn: 'Chapter 2: The Vanishing Glass',
    description: '哈利收到霍格沃茨的录取通知书，但被弗农姨父藏起来。',
    requiredPrerequisites: [
      { type: 'chapter_completed', target: 'chapter_1', operator: '==', value: true }
    ],
    requiredItems: [],
    locations: ['privet_drive', 'hut_on_rock'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_3',
      message: '你被带到了海边的小屋。'
    },
    onFail: {
      type: 'dialogue',
      target: 'stay_with_dursleys',
      message: '你继续留在女贞路。'
    },
    milestones: []
  },

  // ==================== 第三章：猫头鹰传书 ====================
  {
    id: 'chapter_3',
    title: '第三章：猫头鹰传书',
    titleEn: 'Chapter 3: The Letters from No One',
    description: '海格出现，告诉哈利他是一个巫师，并带他去对角巷。',
    requiredPrerequisites: [
      { type: 'chapter_completed', target: 'chapter_2', operator: '==', value: true }
    ],
    requiredItems: [],
    locations: ['hut_on_rock', 'diagon_alley'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_4',
      message: '欢迎来到对角巷！'
    },
    onFail: {
      type: 'dialogue',
      target: 'hagrid_denied',
      message: '海格没能带你离开。'
    },
    milestones: []
  },

  // ==================== 第四章：九又四分之三站台 ====================
  {
    id: 'chapter_4',
    title: '第四章：九又四分之三站台',
    titleEn: 'Chapter 4: The Keeper of the Keys',
    description: '哈利在对角巷购买学习用品，并遇到罗恩·韦斯莱。',
    requiredPrerequisites: [
      { type: 'chapter_completed', target: 'chapter_3', operator: '==', value: true }
    ],
    requiredItems: ['wand'],
    locations: ['diagon_alley', 'gringotts', 'platform934'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_5',
      message: '你登上了霍格沃茨特快！'
    },
    onFail: {
      type: 'dialogue',
      target: 'missed_train',
      message: '你错过了火车。'
    },
    milestones: []
  },

  // ==================== 第五章：霍格沃茨特快 ====================
  {
    id: 'chapter_5',
    title: '第五章：霍格沃茨特快',
    titleEn: 'Chapter 5: Diagon Alley',
    description: '在火车上，哈利与罗恩成为朋友，并见到了赫敏。',
    requiredPrerequisites: [
      { type: 'chapter_completed', target: 'chapter_4', operator: '==', value: true }
    ],
    requiredItems: [],
    locations: ['hogwarts_express'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_6',
      message: '霍格沃茨到了！'
    },
    onFail: {
      type: 'chapter',
      target: 'chapter_4',
      message: '你必须先登上火车。'
    },
    milestones: []
  },

  // ==================== 第六章：分院帽 ====================
  {
    id: 'chapter_6',
    title: '第六章：分院帽',
    titleEn: 'Chapter 6: The Journey from Platform Nine and Three-Quarters',
    description: '新生分院仪式，哈利被分到格兰芬多学院。',
    requiredPrerequisites: [
      { type: 'chapter_completed', target: 'chapter_5', operator: '==', value: true }
    ],
    requiredItems: [],
    locations: ['great_hall', 'gryffindor_common'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_7',
      message: '欢迎来到格兰芬多！'
    },
    onFail: {
      type: 'dialogue',
      target: 'sorting_failed',
      message: '分院帽无法决定你的学院。'
    },
    milestones: []
  },

  // ==================== 第七章：魔药课与决斗俱乐部 ====================
  {
    id: 'chapter_7',
    title: '第七章：魔药课与决斗俱乐部',
    titleEn: 'Chapter 7: The Sorting Hat',
    description: '开始上课，哈利在魔药课上与斯内普发生冲突，并加入决斗俱乐部。',
    requiredPrerequisites: [
      { type: 'chapter_completed', target: 'chapter_6', operator: '==', value: true }
    ],
    requiredItems: ['cauldron'],
    locations: ['potions_class', 'charms_class', 'library', 'hagrids_hut'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_8',
      message: '第一堂课结束了。'
    },
    onFail: {
      type: 'dialogue',
      target: 'class_failed',
      message: '你没能完成课堂任务。'
    },
    milestones: []
  },

  // ==================== 第八章：魁地奇 ====================
  {
    id: 'chapter_8',
    title: '第八章：魁地奇',
    titleEn: 'Chapter 8: Potions Master',
    description: '哈利被选为格兰芬多魁地奇队的找球手。',
    requiredPrerequisites: [
      { type: 'chapter_completed', target: 'chapter_7', operator: '==', value: true }
    ],
    requiredItems: [],
    locations: ['flying_class'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_9',
      message: '你成为了魁地奇找球手！'
    },
    onFail: {
      type: 'dialogue',
      target: 'quidditch_rejected',
      message: '麦格教授没有选中你。'
    },
    milestones: ['quidditch_seeker']
  },

  // ==================== 第九章：万圣节与巨怪 ====================
  {
    id: 'chapter_9',
    title: '第九章：万圣节与巨怪',
    titleEn: 'Chapter 9: The Midnight Duel',
    description: '万圣节晚宴上，一只巨怪闯入城堡，哈利和罗恩拯救了赫敏。',
    requiredPrerequisites: [
      { type: 'milestone_completed', target: 'quidditch_seeker', operator: '==', value: true }
    ],
    requiredItems: [],
    locations: ['great_hall', 'dungeon', 'girls_bathroom'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_10',
      message: '你拯救了赫敏！'
    },
    onFail: {
      type: 'dialogue',
      target: 'troll_escape',
      message: '你没能阻止巨怪。'
    },
    milestones: ['troll_saved']
  },

  // ==================== 第十章：厄里斯魔镜 ====================
  {
    id: 'chapter_10',
    title: '第十章：厄里斯魔镜',
    titleEn: 'Chapter 10: Halloween',
    description: '哈利发现了厄里斯魔镜，并看到了他的父母。',
    requiredPrerequisites: [
      { type: 'milestone_completed', target: 'troll_saved', operator: '==', value: true }
    ],
    requiredItems: [],
    locations: ['mirror_chamber'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_11',
      message: '你看到了镜中的幻象。'
    },
    onFail: {
      type: 'dialogue',
      target: 'mirror_blocked',
      message: '邓布利多阻止了你。'
    },
    milestones: ['mirror_of_erised']
  },

  // ==================== 第十一章：尼可·勒梅 ====================
  {
    id: 'chapter_11',
    title: '第十一章：尼可·勒梅',
    titleEn: 'Chapter 11: Quidditch',
    description: '哈利、罗恩和赫敏开始调查魔法石的秘密。',
    requiredPrerequisites: [
      { type: 'milestone_completed', target: 'mirror_of_erised', operator: '==', value: true }
    ],
    requiredItems: [],
    locations: ['library'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_12',
      message: '你们发现了尼可·勒梅的秘密！'
    },
    onFail: {
      type: 'dialogue',
      target: 'research_failed',
      message: '你们没能找到线索。'
    },
    milestones: ['philosophers_stone']
  },

  // ==================== 第十二章：厄里斯魔镜的秘密 ====================
  {
    id: 'chapter_12',
    title: '第十二章：厄里斯魔镜的秘密',
    titleEn: 'Chapter 12: The Mirror of Erised',
    description: '邓布利多告诉哈利关于魔法石和厄里斯魔镜的真相。',
    requiredPrerequisites: [
      { type: 'milestone_completed', target: 'philosophers_stone', operator: '==', value: true }
    ],
    requiredItems: [],
    locations: ['mirror_chamber'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_13',
      message: '邓布利多信任你。'
    },
    onFail: {
      type: 'dialogue',
      target: 'dumbledore_distrust',
      message: '邓布利多对你隐瞒了真相。'
    },
    milestones: []
  },

  // ==================== 第十三章：魔药与飞行 ====================
  {
    id: 'chapter_13',
    title: '第十三章：魔药与飞行',
    titleEn: 'Chapter 13: Nicolas Flamel',
    description: '准备穿越活板门的试炼，包括魔药挑战和飞行测试。',
    requiredPrerequisites: [
      { type: 'chapter_completed', target: 'chapter_12', operator: '==', value: true }
    ],
    requiredItems: ['lumos_spell'],
    locations: ['potions_class', 'trophy_room'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_14',
      message: '你们准备好面对挑战了！'
    },
    onFail: {
      type: 'dialogue',
      target: 'preparation_failed',
      message: '你们还没有准备好。'
    },
    milestones: ['potions_challenge']
  },

  // ==================== 第十四章：禁林 ====================
  {
    id: 'chapter_14',
    title: '第十四章：禁林',
    titleEn: 'Chapter 14: Cornelius Fudge',
    description: '进入禁林，面对各种神奇动物，发现伏地魔的踪迹。',
    requiredPrerequisites: [
      { type: 'milestone_completed', target: 'potions_challenge', operator: '==', value: true }
    ],
    requiredItems: ['invisibility_cloak'],
    locations: ['forbidden_forest'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_15',
      message: '你们发现了真相！'
    },
    onFail: {
      type: 'dialogue',
      target: 'forest_fail',
      message: '你们没能完成禁林任务。'
    },
    milestones: ['norbert_rescued']
  },

  // ==================== 第十五章：穿越活板门 ====================
  {
    id: 'chapter_15',
    title: '第十五章：穿越活板门',
    titleEn: 'Chapter 15: The Forbidden Forest',
    description: '哈利、罗恩和赫敏穿越活板门，面对各种魔法挑战。',
    requiredPrerequisites: [
      { type: 'milestone_completed', target: 'norbert_rescued', operator: '==', value: true }
    ],
    requiredItems: [],
    locations: ['trapdoor_room'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_16',
      message: '你们通过了所有考验！'
    },
    onFail: {
      type: 'dialogue',
      target: 'trapdoor_fail',
      message: '你们没能通过考验。'
    },
    milestones: ['chess_challenge']
  },

  // ==================== 第十六章：伏地魔 ====================
  {
    id: 'chapter_16',
    title: '第十六章：伏地魔',
    titleEn: 'Chapter 16: Through the Trapdoor',
    description: '哈利面对奇洛和附在他身上的伏地魔。',
    requiredPrerequisites: [
      { type: 'milestone_completed', target: 'chess_challenge', operator: '==', value: true }
    ],
    requiredItems: [],
    locations: ['trapdoor_room'],
    onSuccess: {
      type: 'chapter',
      target: 'chapter_17',
      message: '你击败了伏地魔！'
    },
    onFail: {
      type: 'dialogue',
      target: 'voldemort_win',
      message: '伏地魔获胜了...'
    },
    milestones: []
  },

  // ==================== 第十七章：双面人 ====================
  {
    id: 'chapter_17',
    title: '第十七章：双面人',
    titleEn: 'Chapter 17: The Man with Two Faces',
    description: '学年结束，邓布利多解释一切，哈利回家过暑假。',
    requiredPrerequisites: [
      { type: 'chapter_completed', target: 'chapter_16', operator: '==', value: true }
    ],
    requiredItems: [],
    locations: ['great_hall'],
    onSuccess: {
      type: 'scene',
      target: 'end_credits',
      message: '恭喜你完成了第一年！'
    },
    onFail: {
      type: 'dialogue',
      target: 'end_fail',
      message: '故事还没结束...'
    },
    milestones: []
  }
];

export const getChapterById = (chapterId: ChapterId): Chapter | undefined => {
  return chapters.find(chapter => chapter.id === chapterId);
};
