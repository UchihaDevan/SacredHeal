import type { BotResponse } from '../types';

export const botResponses: BotResponse[] = [
  {
    keywords: ['ola', 'olá', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'pastor', 'caleb', 'pastor caleb'],
    responses: [
      'Graça e paz, meu irmão! Como posso ajudar você e sua família no dia de hoje?',
      'Seja muito bem-vindo! Que a presença do Senhor seja com você hoje. Como posso orar por você agora?',
      'Olá! Sou o Pastor Caleb. Estou aqui para oferecer conselhos bíblicos, orações e um ouvido amigo. O que está em seu coração?'
    ]
  },
  {
    keywords: ['triste', 'tristeza', 'depressao', 'depressão', 'choro', 'chorando', 'angustia', 'angústia', 'desespero', 'sozinho', 'solidao', 'solidão'],
    responses: [
      'Lembre-se de que o choro pode durar uma noite, mas a alegria vem pela manhã. Você não está sozinho; o Senhor está bem ao seu lado.',
      'Em momentos de profunda dor, Deus recolhe cada uma de nossas lágrimas. Permita-me compartilhar um versículo de esperança com você.',
      'A depressão e a tristeza tentam obscurecer nossa visão, mas a luz de Cristo é maior que qualquer escuridão. O Senhor ama você incondicionalmente.'
    ],
    verse: 'O Senhor está perto dos que têm o coração quebrantado e salva os de espírito abatido.',
    verseReference: 'Salmos 34:18'
  },
  {
    keywords: ['medo', 'ansiedade', 'ansioso', 'ansiosa', 'preocupado', 'preocupada', 'panico', 'pânico', 'preocupacao', 'preocupação'],
    responses: [
      'A Palavra nos diz para não andarmos ansiosos por coisa alguma. Entregue suas preocupações a Deus em oração, Ele cuida de você.',
      'O medo é real, mas o amor de Deus lança fora todo o medo. Respire fundo, sintonize uma frequência de paz e confie.',
      'Quando a ansiedade bater à sua porta, lembre-se: Deus está no controle de todas as coisas. O amanhã pertence a Ele.'
    ],
    verse: 'Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus, que excede todo o entendimento, guardará o coração e a mente de vocês em Cristo Jesus.',
    verseReference: 'Filipenses 4:6-7'
  },
  {
    keywords: ['dinheiro', 'financeiro', 'divida', 'dívida', 'dividas', 'dívidas', 'escassez', 'crise', 'falta', 'desemprego', 'emprego'],
    responses: [
      'Deus é o nosso provedor. Mesmo em meio à escassez, Ele tem planos de prosperidade e fartura para sua vida. Creia!',
      'As dificuldades financeiras podem testar nossa fé, mas o Senhor suprirá todas as suas necessidades de acordo com as riquezas Dele.',
      'Não se preocupe com o que comer ou vestir, pois seu Pai Celestial sabe que você precisa de tudo isso. Busque primeiro o Reino de Deus.'
    ],
    verse: 'O meu Deus suprirá todas as necessidades de vocês, de acordo com as suas gloriosas riquezas em Cristo Jesus.',
    verseReference: 'Filipenses 4:19'
  },
  {
    keywords: ['cura', 'doente', 'doenca', 'doença', 'enfermidade', 'dor', 'dores', 'saude', 'saúde', 'hospital', 'cancer', 'câncer'],
    responses: [
      'Pelas feridas de Cristo fomos sarados. Clame ao Senhor pela sua saúde agora; Ele é o Deus que cura.',
      'Que a mão curadora de Deus repouse sobre seu corpo neste exato momento. A fé remove montanhas e traz cura física e espiritual.',
      'Não perca as esperanças. Jesus curou a muitos que O buscaram, e Seu poder restaurador continua o mesmo hoje.'
    ],
    verse: 'Ele é quem perdoa todos os seus pecados e cura todas as suas enfermidades.',
    verseReference: 'Salmos 103:3'
  },
  {
    keywords: ['ajuda', 'ajudar', 'ajude', 'oracao', 'oração', 'ore', 'orar', 'ajuda-me'],
    responses: [
      'Estou aqui para orar por você. Senhor, peço que derrame Tua bênção e Tua paz sobre esta vida agora.',
      'Clame a Deus e Ele responderá. Vamos elevar nossos pensamentos ao Senhor em oração. O que você gostaria de colocar no altar de Deus?',
      'A oração de um justo é poderosa e eficaz. Conte comigo para interceder por você diante do Pai.'
    ],
    verse: 'Clame a mim e eu responderei e direi a você coisas grandiosas e insondáveis que você não conhece.',
    verseReference: 'Jeremias 33:3'
  }
];

export const fallbackResponses: string[] = [
  'Compreendo seu coração. Saiba que Deus tem um plano maravilhoso para você. Gostaria de orar por isso?',
  'Suas palavras são importantes. Coloque suas aflições no Senhor e Ele sustentará você. Há algo específico pelo qual deseja orar?',
  'Que a paz de Cristo encha sua mente neste momento. Continue firme na fé e sintonize nossas frequências para meditar na presença de Deus.',
  'O Senhor conhece seus caminhos e suas lutas. Mantenha os olhos voltados para Ele. Deseja falar mais sobre isso ou prefere ler um versículo de ânimo?'
];
