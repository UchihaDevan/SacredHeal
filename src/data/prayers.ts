export interface PrayerData {
  id: string;
  name: string;
  text: string;
  instructions: string;
  recommendedTime?: string;
  edition: string;
}

export const prayers: PrayerData[] = [
  {
    id: 'oracao-libertacao-1',
    name: 'Oração de Libertação e Escudo Protetor',
    text: `Senhor Deus, Pai Todo-Poderoso, Criador dos Céus e da Terra.
Entro em Tua presença neste momento para rogar Teu escudo protetor sobre a minha vida, minha casa e todos os meus familiares.
Pelo poder do nome de Jesus Cristo, eu repreendo toda força contrária, todo dardo inflamado do inimigo e toda palavra de maldição lançada contra meu lar.
Que Teus santos anjos acampem ao meu redor. Cobre-me com Teu sangue precioso e concede-me a libertação de toda amarra mental, física e espiritual.
Decreto que a paz do Senhor Jesus habita neste recinto hoje e para sempre.
Amém.`,
    instructions: 'Recomenda-se recitar esta prece ao amanhecer, em uma postura de pé, com as mãos voltadas para cima, visualizando a armadura de Deus cobrindo seu ser.',
    recommendedTime: 'Manhã (ao acordar)',
    edition: '2023 - 1ª Edição'
  },
  {
    id: 'oracao-prosperidade-2',
    name: 'Oração de Provisão e Bênção Familiar',
    text: `Pai Celestial, Tu que multiplicas os pães e peixes e não deixas faltar o sustento ao Teu povo.
Olha para as nossas necessidades financeiras e profissionais. Abre as portas que estão fechadas, derrama ideias criativas de sucesso e atrai oportunidades de prosperidade legítima.
Repreendo todo espírito de escassez e miséria da minha linhagem familiar.
Declaro que a minha casa é um celeiro cheio de bênçãos e que teremos o suficiente para viver com dignidade e transbordar na vida dos necessitados.
Abençoa o trabalho das nossas mãos e purifica as nossas intenções.
Em nome de Jesus Cristo. Amém.`,
    instructions: 'Recomenda-se recitar esta prece à noite, antes de dormir, mantendo a mente calma e focada no sentimento de gratidão e abundância divina.',
    recommendedTime: 'Noite (antes de dormir)',
    edition: '2023 - Segunda Edição'
  }
];
