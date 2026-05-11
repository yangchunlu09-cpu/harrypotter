// 人物角色数据
export interface Character {
  id: string;
  name: string;
  nameEn: string;
  house: 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff' | 'none';
  role: string;
  description: string;
  avatar: string;
  relationships: string[];
}

export const characters: Character[] = [
  {
    id: 'harry',
    name: '哈利·波特',
    nameEn: 'Harry Potter',
    house: 'gryffindor',
    role: '主角',
    description: '霍格沃茨魔法学校的学生，格兰芬多学院成员。他是大难不死的男孩，父母被伏地魔杀害，自己也在婴儿时期幸存下来。哈利勇敢、善良、忠诚，拥有强烈的正义感，是对抗伏地魔的关键人物。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Harry%20Potter%20young%20wizard%2C%20black%20messy%20hair%2C%20round%20glasses%2C%20lightning%20bolt%20scar%20on%20forehead%2C%20wearing%20Gryffindor%20robes%2C%20friendly%20smile%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['ron', 'hermione', 'dumbledore', 'snape', 'voldemort']
  },
  {
    id: 'ron',
    name: '罗恩·韦斯莱',
    nameEn: 'Ron Weasley',
    house: 'gryffindor',
    role: '好友',
    description: '哈利的好友，来自韦斯莱家族。罗恩虽然有时显得有些笨拙和嫉妒，但他非常忠诚勇敢，是哈利最可靠的朋友之一。他擅长棋艺，在魔法石事件中发挥了重要作用。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ron%20Weasley%20young%20wizard%2C%20red%20hair%2C%20freckles%2C%20wearing%20Gryffindor%20robes%2C%20friendly%20expression%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['harry', 'hermione', 'ginny']
  },
  {
    id: 'hermione',
    name: '赫敏·格兰杰',
    nameEn: 'Hermione Granger',
    house: 'gryffindor',
    role: '好友',
    description: '哈利和罗恩的好友，霍格沃茨最聪明的学生之一。赫敏勤奋好学，知识渊博，经常在关键时刻用智慧帮助朋友们解决难题。她是麻瓜出身，但凭借努力成为了最优秀的巫师之一。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hermione%20Granger%20anime%20portrait%2C%20young%20witch%2C%20brown%20hair%2C%20Gryffindor%20uniform%2C%20intelligent%20face&image_size=portrait_4_3',
    relationships: ['harry', 'ron']
  },
  {
    id: 'dumbledore',
    name: '阿不思·邓布利多',
    nameEn: 'Albus Dumbledore',
    house: 'gryffindor',
    role: '校长',
    description: '霍格沃茨魔法学校的校长，当代最伟大的巫师。他睿智、仁慈，是对抗伏地魔的领导者。邓布利多拥有强大的魔法能力和深邃的智慧，一直暗中保护哈利。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Albus%20Dumbledore%20old%20wizard%2C%20long%20silver%20beard%2C%20half-moon%20spectacles%2C%20wearing%20purple%20robes%2C%20wise%20kind%20expression%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['harry', 'snape', 'voldemort', 'mcgonagall']
  },
  {
    id: 'snape',
    name: '西弗勒斯·斯内普',
    nameEn: 'Severus Snape',
    house: 'slytherin',
    role: '教授',
    description: '霍格沃茨的魔药课教授，斯莱特林学院院长。他表面上冷酷、刻薄，似乎总是与哈利作对。但实际上，斯内普有着复杂的过去和深藏的秘密，他的忠诚直到最后才被揭示。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Severus%20Snape%20middle-aged%20wizard%2C%20long%20black%20hair%2C%20pale%20skin%2C%20wearing%20black%20robes%2C%20sneering%20expression%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['harry', 'dumbledore', 'voldemort', 'lily']
  },
  {
    id: 'mcgonagall',
    name: '米勒娃·麦格',
    nameEn: 'Minerva McGonagall',
    house: 'gryffindor',
    role: '教授',
    description: '霍格沃茨的变形课教授，格兰芬多学院院长，后来成为副校长。她严格但公正，是一位优秀的女巫和教师。麦格教授在关键时刻总是站在正义的一边。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Minerva%20McGonagall%20middle-aged%20witch%20professor%2C%20black%20hair%20in%20tight%20bun%2C%20wearing%20elegant%20emerald%20green%20professor%20robes%2C%20pointed%20hat%2C%20stern%20but%20kind%20expression%2C%20holding%20wand%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['dumbledore', 'harry']
  },
  {
    id: 'voldemort',
    name: '伏地魔',
    nameEn: 'Lord Voldemort',
    house: 'slytherin',
    role: '反派',
    description: '原名汤姆·里德尔，史上最强大的黑巫师。他追求永生和权力，试图建立一个纯血巫师统治的世界。伏地魔在婴儿时期被哈利挫败，后来试图东山再起。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Lord%20Voldemort%20dark%20wizard%2C%20pale%20skin%2C%20red%20eyes%2C%20snake-like%20face%2C%20wearing%20black%20robes%2C%20menacing%20expression%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['harry', 'dumbledore', 'snape', 'quirrell']
  },
  {
    id: 'quirrell',
    name: '奇洛教授',
    nameEn: 'Professor Quirrell',
    house: 'ravenclaw',
    role: '教授',
    description: '霍格沃茨的黑魔法防御课教授。他表面上胆小懦弱，但实际上被伏地魔附身，成为了伏地魔的仆人。奇洛试图帮助伏地魔获取魔法石。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professor%20Quirrell%20young%20wizard%2C%20trembling%20nervous%20expression%2C%20wearing%20tattered%20robes%2C%20scarf%20around%20head%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['voldemort', 'harry']
  },
  {
    id: 'hagrid',
    name: '鲁伯·海格',
    nameEn: 'Rubeus Hagrid',
    house: 'gryffindor',
    role: '管理员',
    description: '霍格沃茨的猎场看守，半巨人。他善良、热情，是哈利进入魔法世界的引路人。海格热爱神奇动物，经常帮助哈利和他的朋友们。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Rubeus%20Hagrid%20giant%20man%2C%20big%20beard%2C%20kind%20face%2C%20wearing%20leather%20coat%2C%20boots%2C%20warm%20smile%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['harry', 'dumbledore']
  },
  {
    id: 'malfoy',
    name: '德拉科·马尔福',
    nameEn: 'Draco Malfoy',
    house: 'slytherin',
    role: '同学',
    description: '哈利的同学，斯莱特林学院的学生。他来自纯血巫师家庭，自视甚高，经常与哈利发生冲突。马尔福性格复杂，在后续故事中有重要发展。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Draco%20Malfoy%20young%20wizard%2C%20blonde%20hair%2C%20slicked%20back%2C%20wearing%20Slytherin%20robes%2C%20smug%20expression%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['harry', 'snape']
  },
  {
    id: 'lily',
    name: '莉莉·波特',
    nameEn: 'Lily Potter',
    house: 'gryffindor',
    role: '母亲',
    description: '哈利的母亲，一位勇敢善良的女巫。她为了保护哈利牺牲了自己，她的爱成为了哈利对抗伏地魔的最强护盾。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Lily%20Potter%20young%20witch%2C%20red%20hair%2C%20kind%20face%2C%20wearing%20wizarding%20clothes%2C%20gentle%20smile%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['harry', 'snape', 'james']
  },
  {
    id: 'james',
    name: '詹姆·波特',
    nameEn: 'James Potter',
    house: 'gryffindor',
    role: '父亲',
    description: '哈利的父亲，霍格沃茨的毕业生。他勇敢、自信，与小天狼星、卢平和虫尾巴是好朋友。詹姆为了保护家人同样牺牲在了伏地魔手中。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=James%20Potter%20young%20wizard%2C%20black%20hair%2C%20glasses%2C%20wearing%20Gryffindor%20robes%2C%20confident%20smile%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['harry', 'lily']
  },
  {
    id: 'ginny',
    name: '金妮·韦斯莱',
    nameEn: 'Ginny Weasley',
    house: 'gryffindor',
    role: '同学',
    description: '罗恩的妹妹，比哈利小一岁。金妮勇敢、活泼，后来成为哈利的女友和妻子。她在对抗伏地魔的战斗中也发挥了重要作用。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Ginny%20Weasley%20young%20girl%2C%20red%20hair%2C%20bright%20eyes%2C%20wearing%20Gryffindor%20robes%2C%20cheerful%20expression%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['ron', 'harry']
  },
  {
    id: 'flitwick',
    name: '弗立维教授',
    nameEn: 'Professor Flitwick',
    house: 'ravenclaw',
    role: '教授',
    description: '霍格沃茨的魔咒课教授，拉文克劳学院院长。他身材矮小，但非常和蔼可亲，是一位出色的魔咒大师。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professor%20Flitwick%20short%20wizard%2C%20grey%20hair%2C%20kind%20face%2C%20wearing%20blue%20robes%2C%20friendly%20smile%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['harry']
  },
  {
    id: 'slughorn',
    name: '斯拉格霍恩教授',
    nameEn: 'Professor Slughorn',
    house: 'hufflepuff',
    role: '教授',
    description: '霍格沃茨的魔药课教授（后期），赫奇帕奇学院出身。他喜欢结交有才华的学生，组建了"鼻涕虫俱乐部"。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Professor%20Slughorn%20portly%20wizard%2C%20silver%20hair%2C%20kind%20face%2C%20wearing%20yellow%20robes%2C%20smug%20expression%2C%202D%20anime%20portrait%2C%20Harry%20Potter%20style&image_size=portrait_4_3',
    relationships: ['harry', 'dumbledore']
  },
  {
    id: 'sorting-hat',
    name: '分院帽',
    nameEn: 'Sorting Hat',
    house: 'none',
    role: '魔法物品',
    description: '一顶古老而睿智的魔法帽子，负责为霍格沃茨的新生分配学院。它能够读取人的思想和特质，将学生分到最适合他们的学院。',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sorting%20Hat%20old%20worn%20wizard%20hat%2C%20patched%20brown%20fabric%2C%20brass%20buckle%2C%20tattered%20edges%2C%20magical%20floating%20hat%2C%20Harry%20Potter%20style%2C%20simple%20portrait&image_size=portrait_4_3',
    relationships: ['dumbledore', 'harry']
  }
];

export const getCharacterById = (id: string): Character | undefined => {
  return characters.find(c => c.id === id);
};

export const getCharactersByHouse = (house: string): Character[] => {
  return characters.filter(c => c.house === house);
};