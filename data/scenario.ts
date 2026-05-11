import type { Location, DialogueLine } from '@/types/game';

// 地点数据 - 按照《魔法石》原著顺序解锁
export const locations: Location[] = [
  {
    id: 'platform934',
    name: '九又四分之三站台',
    bgImage: '/platform934.png',
    unlocked: true,
    onEnterDialogueId: 'platform934-opening',
    hotzones: [
      { id: 'platform-sign', x: '30%', y: '40%', width: '20%', height: '15%', targetDialogueId: 'platform-sign', description: '站台标识牌' },
      { id: 'train-entrance', x: '55%', y: '50%', width: '20%', height: '25%', targetDialogueId: 'train-entrance', description: '进入霍格沃茨特快' },
      { id: 'weasley-family', x: '70%', y: '55%', width: '15%', height: '20%', targetDialogueId: 'weasley-family', description: '韦斯莱一家人' }
    ]
  },
  {
    id: 'trainCabin',
    name: '霍格沃茨特快车厢',
    bgImage: '/rainCabin.png',
    unlocked: true,
    hotzones: [
      { id: 'window', x: '60%', y: '40%', width: '20%', height: '25%', targetDialogueId: 'train-window', description: '车窗' },
      { id: 'seat', x: '30%', y: '60%', width: '25%', height: '20%', targetDialogueId: 'train-seat', description: '座位' },
      { id: 'snack-cart', x: '70%', y: '60%', width: '15%', height: '18%', targetDialogueId: 'snack-cart', description: '零食车' },
      { id: 'ron-train', x: '45%', y: '55%', width: '15%', height: '25%', targetDialogueId: 'train-ron', description: '罗恩·韦斯莱' },
      { id: 'hermione-train', x: '65%', y: '55%', width: '15%', height: '25%', targetDialogueId: 'train-hermione', description: '赫敏·格兰杰' }
    ]
  },
  {
    id: 'hogwarts',
    name: '霍格沃茨城堡',
    bgImage: '/Hogwarts.jpg',
    unlocked: false,
    hotzones: [
      { id: 'main-entrance', x: '45%', y: '60%', width: '15%', height: '25%', targetDialogueId: 'main-entrance', description: '主入口' },
      { id: 'castle-tower', x: '30%', y: '25%', width: '10%', height: '20%', targetDialogueId: 'castle-tower', description: '城堡塔楼' }
    ]
  },
  {
    id: 'greatHall',
    name: '大礼堂',
    bgImage: '/greatHall.png',
    unlocked: false,
    onEnterDialogueId: 'sorting-ceremony',
    hotzones: [
      { id: 'gryffindor-table', x: '25%', y: '50%', width: '15%', height: '20%', targetDialogueId: 'gryffindor-table', description: '格兰芬多长桌' },
      { id: 'slytherin-table', x: '70%', y: '50%', width: '15%', height: '20%', targetDialogueId: 'slytherin-table', description: '斯莱特林长桌' },
      { id: 'dumbledore-greathall', x: '50%', y: '35%', width: '10%', height: '15%', targetDialogueId: 'dumbledore-greathall', description: '邓布利多' },
      { id: 'sorting-hat', x: '50%', y: '25%', width: '8%', height: '12%', targetDialogueId: 'sorting-hat', description: '分院帽' },
      { id: 'mcgonagall-greathall', x: '45%', y: '38%', width: '8%', height: '12%', targetDialogueId: 'mcgonagall-greathall', description: '麦格教授' }
    ]
  },
  {
    id: 'gryffindorCommonRoom',
    name: '格兰芬多休息室',
    bgImage: '/gryffindorCommonRoom.jpg',
    unlocked: false,
    hotzones: [
      { id: 'fireplace', x: '50%', y: '50%', width: '20%', height: '25%', targetDialogueId: 'gryffindor-fireplace', description: '壁炉' },
      { id: 'sofa', x: '30%', y: '60%', width: '15%', height: '12%', targetDialogueId: 'gryffindor-sofa', description: '沙发' },
      { id: 'ron-commonroom', x: '25%', y: '55%', width: '12%', height: '20%', targetDialogueId: 'ron-commonroom', description: '罗恩·韦斯莱' },
      { id: 'hermione-commonroom', x: '40%', y: '55%', width: '12%', height: '20%', targetDialogueId: 'hermione-commonroom', description: '赫敏·格兰杰' }
    ]
  },
  {
    id: 'potionsClassroom',
    name: '魔药课教室',
    bgImage: '/potionsClassroom.jpg',
    unlocked: false,
    hotzones: [
      { id: 'snape-professor', x: '75%', y: '40%', width: '12%', height: '18%', targetDialogueId: 'snape-professor', description: '斯内普教授' },
      { id: 'cauldron', x: '35%', y: '55%', width: '10%', height: '15%', targetDialogueId: 'potions-minigame', description: '坩埚' },
      { id: 'ingredients-shelf', x: '10%', y: '45%', width: '12%', height: '25%', targetDialogueId: 'ingredients-shelf', description: '药材架' }
    ]
  },
  {
    id: 'charmsClassroom',
    name: '魔咒课教室',
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Charms%20classroom%20bright%20and%20airy%2C%20sunlight%20through%20windows%2C%20wands%20floating%20in%20mid-air%2C%20colorful%20charm%20effects%2C%20Flitwick%20on%20stack%20of%20books%2C%20cheerful%20learning%20atmosphere&image_size=landscape_16_9',
    unlocked: false,
    hotzones: [
      { id: 'flitwick-desk', x: '60%', y: '35%', width: '12%', height: '18%', targetDialogueId: 'flitwick-desk', description: '弗立维教授的讲台' },
      { id: 'wands', x: '25%', y: '50%', width: '15%', height: '15%', targetDialogueId: 'wands', description: '魔杖架' }
    ]
  },
  {
    id: 'library',
    name: '图书馆',
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hogwarts%20library%20vast%20interior%2C%20tall%20bookshelves%20reaching%20ceiling%2C%20reading%20tables%20with%20candles%2C%20quiet%20atmosphere%2C%20restricted%20section%20with%20chains%2C%20ancient%20tombs%20and%20scrolls&image_size=landscape_16_9',
    unlocked: false,
    hotzones: [
      { id: 'reading-table', x: '40%', y: '55%', width: '20%', height: '15%', targetDialogueId: 'reading-table', description: '阅读桌' },
      { id: 'book-shelf', x: '65%', y: '45%', width: '15%', height: '30%', targetDialogueId: 'book-shelf', description: '书架' },
      { id: 'mcgonagall', x: '20%', y: '50%', width: '10%', height: '25%', targetDialogueId: 'mcgonagall', description: '麦格教授' }
    ]
  },
  {
    id: 'creaturesClassroom',
    name: '海格的小屋',
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hagrid%27s%20hut%20exterior%20and%20interior%2C%20rustic%20wooden%20cabin%2C%20stone%20fireplace%2C%20boar%20heads%20on%20walls%2C%20giant%20chair%20and%20table%2C%20magical%20creature%20treats%2C%20cozy%20warm%20atmosphere&image_size=landscape_16_9',
    unlocked: false,
    hotzones: [
      { id: 'creature-pen', x: '50%', y: '55%', width: '20%', height: '25%', targetDialogueId: 'creatures-minigame', description: '动物围栏' },
      { id: 'hagrid', x: '25%', y: '45%', width: '12%', height: '25%', targetDialogueId: 'hagrid', description: '海格' }
    ]
  },
  {
    id: 'girlsBathroom',
    name: '女盥洗室',
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Girls%20bathroom%20in%20castle%2C%20marble%20floors%2C%20stone%20walls%2C%20old%20fashioned%20taps%2C%20mirrors%2C%20stalls%2C%20mysterious%20dark%20corner%2C%20troll%20footprints%2C%20dramatic%20atmosphere&image_size=landscape_16_9',
    unlocked: false,
    hotzones: [
      { id: 'mirror', x: '60%', y: '45%', width: '10%', height: '15%', targetDialogueId: 'mirror', description: '镜子' },
      { id: 'stall', x: '30%', y: '50%', width: '12%', height: '25%', targetDialogueId: 'stall', description: '隔间' }
    ]
  },
  {
    id: 'flyingField',
    name: '飞行课场地',
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Quidditch%20pitch%20outdoor%20flying%20field%2C%20green%20grass%2C%20goalposts%2C%20students%20on%20broomsticks%2C%20blue%20sky%2C%20wind%20blowing%2C%20magical%20flying%20lesson%20atmosphere&image_size=landscape_16_9',
    unlocked: false,
    hotzones: [
      { id: 'broomstick', x: '40%', y: '50%', width: '15%', height: '20%', targetDialogueId: 'flying-minigame', description: '飞天扫帚' },
      { id: 'madame-hooch', x: '70%', y: '35%', width: '12%', height: '18%', targetDialogueId: 'madame-hooch', description: '霍琦夫人' }
    ]
  },
  {
    id: 'transfigurationClassroom',
    name: '变形课教室',
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Transfiguration%20classroom%20formal%20setting%2C%20wooden%20desks%2C%20McGonagall%27s%20desk%2C%20chalkboard%20with%20spells%2C%20floating%20objects%20being%20transformed%2C%20disciplined%20learning%20atmosphere&image_size=landscape_16_9',
    unlocked: false,
    hotzones: [
      { id: 'mcgonagall-desk', x: '70%', y: '35%', width: '12%', height: '18%', targetDialogueId: 'mcgonagall-desk', description: '麦格教授的讲台' },
      { id: 'desks', x: '40%', y: '55%', width: '20%', height: '15%', targetDialogueId: 'desks', description: '课桌' }
    ]
  },
  {
    id: 'astronomyTower',
    name: '天文塔',
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Astronomy%20tower%20observatory%2C%20giant%20telescopes%2C%20starry%20night%20sky%2C%20celestial%20maps%2C%20planetary%20models%2C%20high%20above%20Hogwarts%2C%20magical%20cosmic%20atmosphere&image_size=landscape_16_9',
    unlocked: false,
    hotzones: [
      { id: 'telescope', x: '60%', y: '50%', width: '12%', height: '25%', targetDialogueId: 'telescope', description: '望远镜' },
      { id: 'stars', x: '40%', y: '30%', width: '25%', height: '15%', targetDialogueId: 'stars', description: '星空' }
    ]
  },
  {
    id: 'defenseClassroom',
    name: '黑魔法防御课教室',
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Defense%20Against%20Dark%20Arts%20classroom%2C%20training%20dummies%2C%20protective%20shields%2C%20spells%20in%20action%2C%20Quirrell%27s%20turban%2C%20dark%20mysterious%20atmosphere%2C%20defensive%20magic%20training&image_size=landscape_16_9',
    unlocked: false,
    hotzones: [
      { id: 'dummy', x: '50%', y: '50%', width: '15%', height: '25%', targetDialogueId: 'defense-minigame', description: '训练假人' },
      { id: 'quirrell-desk', x: '70%', y: '35%', width: '12%', height: '18%', targetDialogueId: 'quirrell', description: '奇洛教授' }
    ]
  },
  {
    id: 'forbiddenForest',
    name: '禁林',
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Forbidden%20Forest%20dark%20mysterious%2C%20tall%20ancient%20trees%2C%20moss%20covered%20ground%2C%20mysterious%20lights%2C%20centaur%20silhouettes%2C%20Devil%27s%20Snare%2C%20enchanted%20magical%20forest%20atmosphere&image_size=landscape_16_9',
    unlocked: false,
    hotzones: [
      { id: 'devil-snare', x: '50%', y: '60%', width: '25%', height: '30%', targetDialogueId: 'devil-snare', description: '魔鬼网' },
      { id: 'forest-path', x: '30%', y: '50%', width: '15%', height: '20%', targetDialogueId: 'forest-path', description: '森林小径' }
    ]
  },
  {
    id: 'slytherinCommonRoom',
    name: '斯莱特林休息室',
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Slytherin%20common%20room%20dark%20elegant%2C%20green%20and%20silver%20decor%2C%20snake%20motifs%2C%20underground%20lake%20view%2C%20sophisticated%20furniture%2C%20mysterious%20atmosphere&image_size=landscape_16_9',
    unlocked: false,
    hotzones: [
      { id: 'slytherin-fireplace', x: '50%', y: '50%', width: '20%', height: '25%', targetDialogueId: 'slytherin-fireplace', description: '壁炉' },
      { id: 'slytherin-table', x: '30%', y: '60%', width: '15%', height: '12%', targetDialogueId: 'slytherin-table', description: '桌子' }
    ]
  },
  {
    id: 'ravenclawCommonRoom',
    name: '拉文克劳休息室',
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ravenclaw%20common%20room%20bright%20intellectual%2C%20blue%20and%20bronze%20decor%2C%20starry%20ceiling%2C%20books%20and%20scrolls%2C%20eagle%20statues%2C%20high%20tower%20view%2C%20scholarly%20atmosphere&image_size=landscape_16_9',
    unlocked: false,
    hotzones: [
      { id: 'ravenclaw-window', x: '70%', y: '40%', width: '15%', height: '20%', targetDialogueId: 'ravenclaw-window', description: '窗户' },
      { id: 'ravenclaw-books', x: '30%', y: '50%', width: '12%', height: '18%', targetDialogueId: 'ravenclaw-books', description: '书籍' }
    ]
  },
  {
    id: 'hufflepuffCommonRoom',
    name: '赫奇帕奇休息室',
    bgImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hufflepuff%20common%20room%20warm%20welcoming%2C%20yellow%20and%20black%20decor%2C%20round%20tables%2C%20cozy%20armchairs%2C%20plants%20and%20flowers%2C%20basement%20location%2C%20friendly%20atmosphere&image_size=landscape_16_9',
    unlocked: false,
    hotzones: [
      { id: 'hufflepuff-table', x: '50%', y: '55%', width: '25%', height: '15%', targetDialogueId: 'hufflepuff-table', description: '长桌' },
      { id: 'hufflepuff-plants', x: '20%', y: '50%', width: '12%', height: '20%', targetDialogueId: 'hufflepuff-plants', description: '植物' }
    ]
  }
];

// 对话数据
export const dialogues: Record<string, DialogueLine[]> = {
  // 九又四分之三站台开场
  'platform934-opening': [
    {
      id: 'opening-1',
      speaker: '旁白',
      text: '国王十字车站，伦敦。你站在第九站台和第十站台之间，手里紧握着霍格沃茨的录取通知书。',
      emotion: 'normal',
      characterImage: ''
    },
    {
      id: 'opening-2',
      speaker: '旁白',
      text: '海格告诉过你，要找到九又四分之三站台，就必须径直朝第九和第十站台之间的隔墙走去。',
      emotion: 'normal',
      characterImage: ''
    },
    {
      id: 'opening-3',
      speaker: '哈利',
      text: '这看起来就是一堵普通的墙啊...真的要直接走过去吗？',
      emotion: 'surprised',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20teenage%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20green%20eyes%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20wearing%20casual%20clothes%2C%20nervous%20but%20determined%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'opening-4',
      speaker: '旁白',
      text: '深吸一口气，你推着行李车，朝着那堵看似坚不可摧的墙壁冲去——',
      emotion: 'normal',
      characterImage: ''
    },
    {
      id: 'opening-5',
      speaker: '旁白',
      text: '奇迹发生了！你没有撞到墙，而是穿过了它！眼前豁然开朗，一辆深红色的蒸汽火车出现在你面前，站台上挤满了穿着巫师袍的学生。',
      emotion: 'happy',
      characterImage: ''
    },
    {
      id: 'opening-6',
      speaker: '哈利',
      text: '哇...这就是九又四分之三站台！霍格沃茨特快！我做到了！',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20teenage%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20green%20eyes%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20wearing%20casual%20clothes%2C%20excited%20and%20amazed%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 韦斯莱一家人在站台的对话
  'weasley-family': [
    {
      id: 'weasley-1',
      speaker: '莫丽·韦斯莱',
      text: '孩子们，记得在火车上要乖！别惹麻烦！',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Molly%20Weasley%20middle-aged%20witch%2C%20red%20hair%20in%20a%20bun%2C%20warm%20smile%2C%20wearing%20a%20housewife%20dress%2C%20maternal%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'weasley-2',
      speaker: '亚瑟·韦斯莱',
      text: '放心吧，莫丽。他们会很好的。哈利，欢迎来到魔法世界！',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Arthur%20Weasley%20middle-aged%20wizard%2C%20red%20hair%20and%20glasses%2C%20kind%20eyes%2C%20wearing%20ministry%20robes%2C%20friendly%20smile%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'weasley-3',
      speaker: '金妮',
      text: '我真希望我也能去霍格沃茨！明年我就可以了！',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ginny%20Weasley%20young%20girl%2C%20red%20hair%2C%20bright%20eyes%2C%20excited%20expression%2C%20wizarding%20clothes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 罗恩在列车上的对话
  'train-ron': [
    {
      id: 'ron-train-1',
      speaker: '罗恩',
      text: '嘿！你是哈利·波特吗？我是罗恩·韦斯莱。',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ron%20Weasley%20young%20teenage%20wizard%2C%20red%20hair%2C%20freckles%2C%20wearing%20Gryffindor%20robes%2C%20friendly%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'ron-train-2',
      speaker: '哈利',
      text: '是的！很高兴认识你，罗恩。',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20teenage%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20green%20eyes%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20wearing%20Gryffindor%20robes%2C%20friendly%20smile%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'ron-train-3',
      speaker: '罗恩',
      text: '我有五个哥哥和一个妹妹。家里的钱不多，但我很期待霍格沃茨！',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ron%20Weasley%20young%20teenage%20wizard%2C%20red%20hair%2C%20freckles%2C%20wearing%20Gryffindor%20robes%2C%20slightly%20nervous%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3',
      onCompleteAction: { type: 'unlockLocation', locationId: 'hogwarts' }
    }
  ],
  // 赫敏在列车上的对话
  'train-hermione': [
    {
      id: 'hermione-train-1',
      speaker: '赫敏',
      text: '你们好！我是赫敏·格兰杰。你们准备好学习魔法了吗？',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hermione%20Granger%20young%20teenage%20witch%2C%20brown%20bushy%20hair%2C%20brown%20eyes%2C%20wearing%20Gryffindor%20robes%2C%20intelligent%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'hermione-train-2',
      speaker: '哈利',
      text: '当然！我已经迫不及待了。',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20teenage%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20green%20eyes%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20excited%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'hermione-train-3',
      speaker: '赫敏',
      text: '我已经把所有课本都读过了。你们知道吗，龙血有十二种不同的用途。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hermione%20Granger%20young%20teenage%20witch%2C%20brown%20hair%2C%20confident%20expression%2C%20wearing%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 邓布利多在大礼堂的对话
  'dumbledore-greathall': [
    {
      id: 'dumbledore-1',
      speaker: '邓布利多',
      text: '欢迎来到霍格沃茨，孩子们！在这里，你们将开始一段奇妙的魔法之旅。',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Albus%20Dumbledore%20old%20wizard%2C%20long%20silver%20beard%2C%20half-moon%20spectacles%2C%20wearing%20purple%20robes%2C%20kind%20wise%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'dumbledore-2',
      speaker: '邓布利多',
      text: '记住，我们的学院是一个大家庭，团结和勇气是我们最宝贵的财富。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Albus%20Dumbledore%20old%20wizard%2C%20long%20silver%20beard%2C%20half-moon%20spectacles%2C%20wearing%20purple%20robes%2C%20wise%20serious%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3',
      onCompleteAction: { type: 'unlockLocation', locationId: 'gryffindorCommonRoom' }
    }
  ],
  // 麦格教授在大礼堂的对话
  'mcgonagall-greathall': [
    {
      id: 'mcgonagall-1',
      speaker: '麦格教授',
      text: '波特先生，欢迎来到霍格沃茨。我是麦格教授，负责格兰芬多学院。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Minerva%20McGonagall%20middle-aged%20witch%2C%20black%20hair%20in%20tight%20bun%2C%20wearing%20green%20robes%2C%20stern%20but%20kind%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'mcgonagall-2',
      speaker: '麦格教授',
      text: '希望你能在这里学到很多东西，但记住，纪律是学习的基础。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Minerva%20McGonagall%20middle-aged%20witch%2C%20black%20hair%2C%20wearing%20green%20robes%2C%20serious%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 斯内普教授在魔药课教室的对话
  'snape-professor': [
    {
      id: 'snape-1',
      speaker: '斯内普',
      text: '波特...我听说过你的大名。但在我的课堂上，只有才华才是最重要的。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Severus%20Snape%20middle-aged%20wizard%2C%20long%20black%20hair%2C%20pale%20skin%2C%20wearing%20black%20robes%2C%20sneering%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'snape-2',
      speaker: '斯内普',
      text: '魔药是一门精密的艺术，容不得半点马虎。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Severus%20Snape%20middle-aged%20wizard%2C%20long%20black%20hair%2C%20pale%20skin%2C%20wearing%20black%20robes%2C%20serious%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 罗恩在格兰芬多休息室的对话
  'ron-commonroom': [
    {
      id: 'ron-cr-1',
      speaker: '罗恩',
      text: '嘿哈利！格兰芬多休息室太棒了！你见过这里的壁炉吗？',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ron%20Weasley%20teenage%20wizard%2C%20red%20hair%2C%20excited%20expression%2C%20wearing%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'ron-cr-2',
      speaker: '罗恩',
      text: '弗雷德和乔治说这里有一条秘密通道，我们应该找找看！',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ron%20Weasley%20teenage%20wizard%2C%20red%20hair%2C%20excited%20expression%2C%20wearing%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 赫敏在格兰芬多休息室的对话
  'hermione-commonroom': [
    {
      id: 'hermione-cr-1',
      speaker: '赫敏',
      text: '哈利，罗恩，我们应该开始复习功课了。明天有魔药课测验。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hermione%20Granger%20teenage%20witch%2C%20brown%20hair%2C%20serious%20expression%2C%20wearing%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'hermione-cr-2',
      speaker: '赫敏',
      text: '你们知道吗，水仙根粉末加入艾草浸液可以制作一种强效安眠药。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hermione%20Granger%20teenage%20witch%2C%20brown%20hair%2C%20knowledgeable%20expression%2C%20wearing%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 站台对话
  'platform-sign': [
    {
      id: 'platform-1',
      speaker: '哈利',
      text: '九又四分之三站台...这就是我要找的地方。',
      emotion: 'surprised',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20surprised%20expression%2C%20wearing%20wizarding%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'platform-2',
      speaker: '哈利',
      text: '墙上的标志微微发光，显示着神秘的数字。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20curious%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'platform-3',
      speaker: '哈利',
      text: '我需要穿过这面墙才能到达站台...有点紧张。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20nervous%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3',
      onCompleteAction: { type: 'unlockLocation', locationId: 'trainCabin' }
    }
  ],
  // 进入列车对话
  'train-entrance': [
    {
      id: 'train-enter-1',
      speaker: '哈利',
      text: '我应该登上这趟列车，开始我的魔法之旅。',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20excited%20happy%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3',
      onCompleteAction: { type: 'changeLocation', locationId: 'trainCabin' }
    }
  ],
  // 列车对话
  'train-window': [
    {
      id: 'train-window-1',
      speaker: '哈利',
      text: '窗外的风景快速掠过，我们正在前往霍格沃茨。',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20happy%20expression%2C%20looking%20out%20window%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'train-window-2',
      speaker: '哈利',
      text: '看到了一些奇怪的生物在窗外飞过...是鹰头马身有翼兽吗？',
      emotion: 'surprised',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20surprised%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  'train-seat': [
    {
      id: 'train-seat-1',
      speaker: '哈利',
      text: '这是一个舒适的座位，旁边放着我的行李箱。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20relaxed%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'train-seat-2',
      speaker: '罗恩',
      text: '你好！我是罗恩·韦斯莱。能坐这里吗？',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ron%20Weasley%20young%20wizard%2C%20red%20hair%2C%20freckles%2C%20friendly%20smile%2C%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'train-seat-3',
      speaker: '哈利',
      text: '当然可以！我是哈利·波特。',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20friendly%20smile%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'train-seat-4',
      speaker: '罗恩',
      text: '哈利·波特？！真的是你吗？',
      emotion: 'surprised',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ron%20Weasley%20young%20wizard%2C%20red%20hair%2C%20freckles%2C%20surprised%20expression%2C%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3',
      onCompleteAction: { type: 'unlockLocation', locationId: 'hogwarts' }
    }
  ],
  'snack-cart': [
    {
      id: 'snack-1',
      speaker: '列车员',
      text: '需要买些零食吗？巧克力蛙、比比多味豆、酸爆糖...',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hogwarts%20Express%20conductor%2C%20middle-aged%20man%2C%20uniform%20cap%2C%20friendly%20smile%2C%20wizarding%20train%20attendant%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'snack-2',
      speaker: '哈利',
      text: '给我来一块巧克力蛙吧。',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20excited%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'snack-3',
      speaker: '列车员',
      text: '好的，一西可。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hogwarts%20Express%20conductor%2C%20middle-aged%20man%2C%20uniform%2C%20professional%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 城堡对话
  'main-entrance': [
    {
      id: 'castle-1',
      speaker: '哈利',
      text: '霍格沃茨城堡，比我想象的还要壮观。',
      emotion: 'surprised',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20amazed%20expression%2C%20looking%20at%20castle%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'castle-2',
      speaker: '麦格教授',
      text: '欢迎来到霍格沃茨，波特先生。请跟我来参加分院仪式。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Minerva%20McGonagall%20middle-aged%20witch%2C%20black%20hair%20bun%2C%20green%20robes%2C%20welcoming%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3',
      onCompleteAction: { type: 'unlockLocation', locationId: 'greatHall' }
    }
  ],
  'castle-tower': [
    {
      id: 'tower-1',
      speaker: '哈利',
      text: '从这里可以看到整个霍格沃茨的全景。',
      emotion: 'surprised'
    }
  ],
  // 大礼堂对话
  'gryffindor-table': [
    {
      id: 'gryff-table-1',
      speaker: '罗恩',
      text: '太好了！我们都分到了格兰芬多！',
      emotion: 'happy'
    },
    {
      id: 'gryff-table-2',
      speaker: '赫敏',
      text: '恭喜你们！我也是格兰芬多的。',
      emotion: 'happy',
      onCompleteAction: { type: 'unlockLocation', locationId: 'gryffindorCommonRoom' }
    }
  ],
  'slytherin-table': [
    {
      id: 'sly-table-1',
      speaker: '德拉科',
      text: '哼...波特竟然进了格兰芬多？真没想到。',
      emotion: 'angry',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Draco%20Malfoy%20young%20teenage%20wizard%2C%20blonde%20hair%2C%20sneering%20expression%2C%20wearing%20Slytherin%20robes%2C%20arrogant%20attitude%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'sly-table-2',
      speaker: '哈利',
      text: '我可不想和你一样进斯莱特林。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20determined%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  'dumbledores-chair': [
    {
      id: 'dum-1',
      speaker: '邓布利多',
      text: '欢迎来到霍格沃茨，新生们。记住我们的校训：永远不要相信任何能够独立思考的东西，除非你能看清它把头脑藏在哪里。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Albus%20Dumbledore%20old%20wizard%2C%20silver%20beard%2C%20half-moon%20spectacles%2C%20wise%20expression%2C%20purple%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  'sorting-hat': [
    {
      id: 'hat-1',
      speaker: '分院帽',
      text: '啊...又是一年新生。让我看看你们都有什么潜力。',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sorting%20Hat%20old%20worn%20wizard%20hat%2C%20patched%20brown%20fabric%2C%20brass%20buckle%2C%20tattered%20edges%2C%20magical%20floating%20hat%2C%20Harry%20Potter%20style%2C%20simple%20portrait&image_size=portrait_4_3'
    }
  ],
  // 格兰芬多休息室对话
  'gryffindor-fireplace': [
    {
      id: 'gryff-fire-1',
      speaker: '哈利',
      text: '温暖的火焰跳动着，休息室里充满了家的感觉。',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20comfortable%20expression%2C%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'gryff-fire-2',
      speaker: '罗恩',
      text: '明天我们就开始上课了！我听说麦格教授的变形课很严格。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ron%20Weasley%20teenage%20wizard%2C%20red%20hair%2C%20freckles%2C%20concerned%20expression%2C%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'gryff-fire-3',
      speaker: '赫敏',
      text: '我们应该早点睡觉，养精蓄锐。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hermione%20Granger%20teenage%20witch%2C%20brown%20hair%2C%20responsible%20expression%2C%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3',
      onCompleteAction: { type: 'unlockLocation', locationId: 'potionsClassroom' }
    }
  ],
  'gryffindor-sofa': [
    {
      id: 'gryff-sofa-1',
      speaker: '哈利',
      text: '这个沙发真舒服，可以好好休息一下了。',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20relaxed%20happy%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 魔药课教室对话
  'snape-desk': [
    {
      id: 'snape-1',
      speaker: '斯内普',
      text: '波特...我听说你很有名。让我看看你是否配得上这份名声。',
      emotion: 'angry',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Severus%20Snape%20middle-aged%20wizard%2C%20long%20black%20hair%2C%20pale%20skin%2C%20angry%20sneering%20expression%2C%20black%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'snape-2',
      speaker: '哈利',
      text: '...',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20nervous%20expression%2C%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'snape-3',
      speaker: '斯内普',
      text: '告诉我，波特，如果我把水仙根粉末加入艾草浸液会得到什么？',
      emotion: 'angry',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Severus%20Snape%20middle-aged%20wizard%2C%20long%20black%20hair%2C%20pale%20skin%2C%20angry%20expression%2C%20black%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'snape-4',
      speaker: '赫敏',
      text: '那是一种安眠药，教授。叫做生死水。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hermione%20Granger%20teenage%20witch%2C%20brown%20hair%2C%20confident%20expression%2C%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  'potions-minigame': [
    {
      id: 'potions-mini-1',
      speaker: '斯内普',
      text: '今天我们要熬制一种简单的解毒剂。按正确顺序加入材料。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Severus%20Snape%20middle-aged%20wizard%2C%20long%20black%20hair%2C%20pale%20skin%2C%20serious%20expression%2C%20black%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  'ingredients-shelf': [
    {
      id: 'ing-shelf-1',
      speaker: '哈利',
      text: '架子上摆满了各种奇怪的药材：龙血、独角兽毛、魔药粉...',
      emotion: 'surprised',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20amazed%20expression%2C%20looking%20at%20potions%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 魔咒课教室对话
  'flitwick-desk': [
    {
      id: 'flit-1',
      speaker: '弗立维教授',
      text: '欢迎来到魔咒课！今天我们要学习漂浮咒：羽加迪姆·勒维奥萨！',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Filius%20Flitwick%20short%20wizard%2C%20white%20hair%2C%20glasses%2C%20wearing%20blue%20robes%2C%20cheerful%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'flit-2',
      speaker: '弗立维教授',
      text: '记住，魔杖要轻轻挥动，念咒时要有节奏感。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Filius%20Flitwick%20short%20wizard%2C%20white%20hair%2C%20glasses%2C%20wearing%20blue%20robes%2C%20serious%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  'wands': [
    {
      id: 'wands-1',
      speaker: '哈利',
      text: '我的魔杖在发光...它好像很兴奋。',
      emotion: 'surprised',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20excited%20expression%2C%20holding%20wand%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 图书馆对话
  'reading-table': [
    {
      id: 'read-1',
      speaker: '赫敏',
      text: '哈利，罗恩，我们需要查一些关于魔法石的资料。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hermione%20Granger%20teenage%20witch%2C%20brown%20hair%2C%20serious%20expression%2C%20in%20library%2C%20Gryffindor%20robes%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'read-2',
      speaker: '哈利',
      text: '好主意，赫敏。我们得弄清楚那个镜子是什么。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20determined%20expression%2C%20in%20library%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  'book-shelf': [
    {
      id: 'books-1',
      speaker: '哈利',
      text: '这些书都好古老...有些甚至在动！',
      emotion: 'surprised',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20surprised%20expression%2C%20looking%20at%20magic%20books%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  'mcgonagall': [
    {
      id: 'mcgonagall-1',
      speaker: '麦格教授',
      text: '波特先生，请注意图书馆的安静。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Minerva%20McGonagall%20middle-aged%20witch%2C%20black%20hair%20bun%2C%20green%20robes%2C%20strict%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 海格的小屋对话
  'hagrid': [
    {
      id: 'hagrid-1',
      speaker: '海格',
      text: '哈利！见到你真高兴！要来杯茶吗？',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Rubeus%20Hagrid%20giant%20half-giant%2C%20big%20beard%2C%20wild%20hair%2C%20wearing%20leather%20coat%2C%20friendly%20smile%2C%20warm%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'hagrid-2',
      speaker: '哈利',
      text: '海格！谢谢你带我去对角巷。',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20grateful%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'hagrid-3',
      speaker: '海格',
      text: '小事一桩，孩子。对了，我有件事想告诉你...',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Rubeus%20Hagrid%20giant%2C%20big%20beard%2C%20serious%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'hagrid-4',
      speaker: '海格',
      text: '关于你父母的事...还有魔法石...',
      emotion: 'sad',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Rubeus%20Hagrid%20giant%2C%20big%20beard%2C%20sad%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3',
      onCompleteAction: { type: 'unlockLocation', locationId: 'library' }
    }
  ],
  'creatures-minigame': [
    {
      id: 'creatures-1',
      speaker: '海格',
      text: '这是诺伯，我的小龙。你能帮我照顾它吗？',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Rubeus%20Hagrid%20giant%2C%20big%20beard%2C%20excited%20happy%20expression%2C%20holding%20baby%20dragon%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ],
  // 分院仪式对话
  'sorting-ceremony': [
    {
      id: 'sorting-1',
      speaker: '麦格教授',
      text: '欢迎来到霍格沃茨！现在请新生们上前进行分院。',
      emotion: 'normal',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Minerva%20McGonagall%20middle-aged%20witch%2C%20black%20hair%20bun%2C%20green%20robes%2C%20serious%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    },
    {
      id: 'sorting-2',
      speaker: '分院帽',
      text: '嗯...很有勇气，也很聪明...我决定了！格兰芬多！',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sorting%20Hat%20old%20worn%20wizard%20hat%2C%20patched%2C%20brown%2C%20with%20eyes%2C%20talking%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3',
      onCompleteAction: { type: 'setHouse', house: 'gryffindor' }
    },
    {
      id: 'sorting-3',
      speaker: '邓布利多',
      text: '恭喜你，波特先生！欢迎加入格兰芬多！',
      emotion: 'happy',
      characterImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Albus%20Dumbledore%20old%20wizard%2C%20silver%20beard%2C%20half-moon%20spectacles%2C%20purple%20robes%2C%20happy%20expression%2C%202D%20anime%20illustration%20style%2C%20Harry%20Potter%20series%2C%20portrait&image_size=portrait_4_3'
    }
  ]
};

// 根据ID获取地点
export const getLocationById = (id: string): Location | undefined => {
  return locations.find(l => l.id === id);
};

// 根据ID获取对话
export const getDialogueById = (id: string): DialogueLine[] | undefined => {
  return dialogues[id];
};
