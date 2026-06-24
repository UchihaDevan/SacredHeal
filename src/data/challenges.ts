import type { Challenge } from '../types';

export const challengesData: Omit<Challenge, 'startDate' | 'streak'>[] = [
  {
    id: 'desafio-7-dias',
    name: 'Desafio 7 Dias de Consagração e Proteção',
    description: 'Um curto programa diário focado em construir a fortaleza de fé do seu lar com orações e sintonização de frequências angélicas.',
    duration: 7,
    dailyTasks: [
      { id: 'd7-t1', taskName: 'Ouvir a Frequência de Proteção de Miguel (111Hz) por 5 minutos', completed: false },
      { id: 'd7-t2', taskName: 'Recitar a Oração de Libertação da 1ª Edição', completed: false },
      { id: 'd7-t3', taskName: 'Meditar sobre o Versículo do Dia', completed: false }
    ],
    completed: false,
    completedDays: 0
  },
  {
    id: 'desafio-21-dias',
    name: 'Desafio 21 Dias de Restauração de Saúde',
    description: 'Foco na renovação biológica, alívio de dores crônicas e equilíbrio mental por meio de meditações profundas com as frequências do Solfeggio.',
    duration: 21,
    dailyTasks: [
      { id: 'd21-t1', taskName: 'Ouvir a Frequência de Cura Física (333Hz ou 528Hz) por 10 minutos', completed: false },
      { id: 'd21-t2', taskName: 'Praticar o exercício guiado de respiração na seção Mente', completed: false },
      { id: 'd21-t3', taskName: 'Anotar uma bênção do dia no diário ou agradecer em voz alta', completed: false }
    ],
    completed: false,
    completedDays: 0
  },
  {
    id: 'desafio-30-dias',
    name: 'Desafio 30 Dias de Prosperidade Ativa',
    description: 'Transforme sua mente eliminando crenças de escassez e sintonizando a abundância divina por meio de afirmações e frequências Hz de prosperidade.',
    duration: 30,
    dailyTasks: [
      { id: 'd30-t1', taskName: 'Ouvir a Frequência da Prosperidade (888Hz) por 15 minutos', completed: false },
      { id: 'd30-t2', taskName: 'Escrever ou recitar em voz alta 3 afirmações positivas de abundância', completed: false },
      { id: 'd30-t3', taskName: 'Compartilhar um versículo ou mensagem de incentivo com alguém', completed: false }
    ],
    completed: false,
    completedDays: 0
  }
];
