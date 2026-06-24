export interface VerseData {
  id: string;
  verse: string;
  reference: string;
  interpretation: string;
  imageUrl: string;
  book: string;
  tags: string[];
}

export const dailyVerses: Omit<VerseData, 'book' | 'tags'>[] = [
  {
    id: 'dv-1',
    verse: 'Porque sou eu que conheço os planos que tenho para vocês, diz o Senhor, planos de prosperidade e não de mal, para dar a vocês um futuro e uma esperança.',
    reference: 'Jeremias 29:11',
    interpretation: 'Esta passagem nos garante que a vontade de Deus para nossa vida é de bondade e abundância. Mesmo que as circunstâncias de hoje pareçam incertas, o amanhã divino é seguro e próspero.',
    imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad58565b90?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dv-2',
    verse: 'O Senhor é o meu pastor; de nada terei falta.',
    reference: 'Salmos 23:1',
    interpretation: 'Um lembrete de confiança plena de que nosso Criador supre todas as nossas frentes: saúde, sustento material e proteção mental.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dv-3',
    verse: 'Tudo posso naquele que me fortalece.',
    reference: 'Filipenses 4:13',
    interpretation: 'Nossa força não advém da nossa própria capacidade limitada, mas da união espiritual inabalável com o Senhor que habita em nós.',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80'
  }
];

export const biblicalWisdom: VerseData[] = [
  {
    id: 'bw-1',
    verse: 'Confie no Senhor de todo o seu coração e não se apóie em seu próprio entendimento; reconheça o Senhor em todos os seus caminhos, e ele endireitará as suas veredas.',
    reference: 'Provérbios 3:5-6',
    interpretation: 'A sabedoria humana é falha e baseada nas aparências. A verdadeira inteligência consiste em confiar nos caminhos de Deus, silenciando o medo lógico.',
    book: 'Provérbios',
    tags: ['Sabedoria', 'Confiança', 'Orientação'],
    imageUrl: 'https://images.unsplash.com/photo-1438210159938-e2794098ea86?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bw-2',
    verse: 'Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus.',
    reference: 'Filipenses 4:6',
    interpretation: 'A ansiedade bloqueia nossa sensibilidade espiritual. Substitua a preocupação pela oração sincera e por pensamentos de gratidão.',
    book: 'Filipenses',
    tags: ['Ansiedade', 'Paz', 'Oração'],
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bw-3',
    verse: 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Não maltrata, não procura seus interesses, não se ira facilmente, não guarda rancor.',
    reference: '1 Coríntios 13:4-5',
    interpretation: 'A maior força de cura que existe no universo é o amor divino. Praticar o amor reconstrói nossa imunidade biológica e atrai abundância e harmonia nos lares.',
    book: '1 Coríntios',
    tags: ['Amor', 'Relacionamentos', 'Família'],
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80'
  }
];
