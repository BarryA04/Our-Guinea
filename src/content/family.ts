export const familyPrompts = [
  {
    id: 'memory', collection: 'connections',
    en: { question: 'What is one memory of Guinea you would like to share with me?', followUps: ['Who was there with you?', 'What do you remember seeing or hearing?'] },
    fr: { question: 'Quel souvenir de Guinée aimerais-tu partager avec moi ?', followUps: ['Qui était avec toi ?', 'Que te souviens-tu avoir vu ou entendu ?'] },
  },
  {
    id: 'place', collection: 'connections',
    en: { question: 'Is there a place in Guinea that is special to you? What makes it meaningful?', followUps: ['How would you describe that place to someone who has never been?', 'What did you enjoy doing there?'] },
    fr: { question: 'Y a-t-il un lieu en Guinée qui compte pour toi ? Pourquoi ?', followUps: ['Comment décrirais-tu ce lieu à quelqu’un qui n’y est jamais allé ?', 'Qu’aimais-tu y faire ?'] },
  },
  {
    id: 'tradition', collection: 'connections',
    en: { question: 'What is a family tradition you would like to pass on, and why?', followUps: ['Who introduced you to this tradition?', 'How could we try it together?'] },
    fr: { question: 'Quelle tradition familiale aimerais-tu transmettre, et pourquoi ?', followUps: ['Qui t’a fait découvrir cette tradition ?', 'Comment pourrions-nous l’essayer ensemble ?'] },
  },
  {
    id: 'games', collection: 'childhood',
    en: { question: 'What games did you play as a child?', followUps: ['Who did you play with?', 'Could you teach me how the game worked?'] },
    fr: { question: 'À quels jeux jouais-tu pendant ton enfance ?', followUps: ['Avec qui jouais-tu ?', 'Pourrais-tu m’apprendre les règles du jeu ?'] },
  },
  {
    id: 'food', collection: 'childhood',
    en: { question: 'What food reminds you of home, and who used to make it?', followUps: ['What do you remember about its taste or smell?', 'Is there a story you associate with that meal?'] },
    fr: { question: 'Quel plat te rappelle chez toi, et qui le préparait ?', followUps: ['Que te rappelles-tu de son goût ou de son odeur ?', 'Y a-t-il une histoire que tu associes à ce repas ?'] },
  },
  {
    id: 'smile', collection: 'childhood',
    en: { question: 'What is a childhood moment that still makes you smile?', followUps: ['What happened just before that moment?', 'What would you like someone else to remember about that story?'] },
    fr: { question: 'Quel souvenir d’enfance te fait encore sourire ?', followUps: ['Que s’est-il passé juste avant ce moment ?', 'Qu’aimerais-tu que quelqu’un retienne de cette histoire ?'] },
  },
] as const;
