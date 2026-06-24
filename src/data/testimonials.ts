export interface TestimonialData {
  id: string;
  userName: string;
  userPhoto: string;
  text: string;
  rating: number; // 1-5 estrelas
  category: 'Cura Física' | 'Prosperidade' | 'Restauração Familiar' | 'Paz Mental';
  date: string; // ex: "2026-05-15"
}

export const testimonials: TestimonialData[] = [
  {
    id: 't-1',
    userName: 'Maria das Graças Silva',
    userPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    text: 'Eu sofria de fortes dores intestinais e refluxo há mais de 3 anos. Comecei a escutar diariamente as Frequências de Cura de 528Hz e 741Hz no aplicativo enquanto orava. Após duas semanas, as dores diminuíram significativamente e hoje me sinto completamente renovada!',
    rating: 5,
    category: 'Cura Física',
    date: '2026-05-10'
  },
  {
    id: 't-2',
    userName: 'Carlos Eduardo Santos',
    userPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    text: 'Estava desempregado e com dívidas acumuladas. Comecei a praticar o Desafio da Prosperidade de 30 dias ouvindo a frequência de 888Hz e recitando a Oração de Bênção. Na terceira semana, recebi uma proposta de trabalho excelente e inesperada. Glória a Deus!',
    rating: 5,
    category: 'Prosperidade',
    date: '2026-06-02'
  },
  {
    id: 't-3',
    userName: 'Ana Paula Mendonça',
    userPhoto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80',
    text: 'A ansiedade não me deixava dormir. As Frequências Mentais de 432Hz combinadas com os exercícios de respiração propostos se tornaram meu refúgio todas as noites. Hoje durmo como um anjo e acordo com clareza mental e paz de espírito.',
    rating: 5,
    category: 'Paz Mental',
    date: '2026-06-18'
  }
];
