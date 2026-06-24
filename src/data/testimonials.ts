export interface TestimonialData {
  id: string;
  userName: string;
  userPhoto: string;
  text: string;
  rating: number; // 1-5 stars
  category: 'Physical Healing' | 'Prosperity' | 'Family Restoration' | 'Mental Peace';
  date: string; // e.g., "2026-05-15"
}

export const testimonials: TestimonialData[] = [
  {
    id: 't-1',
    userName: 'Maria das Graças Silva',
    userPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    text: 'I suffered from severe intestinal pain and reflux for over 3 years. I started listening to the 528Hz and 741Hz Healing Frequencies daily in the app while praying. After two weeks, the pain decreased significantly, and today I feel completely renewed!',
    rating: 5,
    category: 'Physical Healing',
    date: '2026-05-10'
  },
  {
    id: 't-2',
    userName: 'Carlos Eduardo Santos',
    userPhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    text: 'I was unemployed and accumulated debts. I started practicing the 30-day Prosperity Challenge, listening to the 888Hz frequency and reciting the Blessing Prayer. In the third week, I received an excellent and unexpected job offer. Glory to God!',
    rating: 5,
    category: 'Prosperity',
    date: '2026-06-02'
  },
  {
    id: 't-3',
    userName: 'Ana Paula Mendonça',
    userPhoto: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80',
    text: 'Anxiety wouldn\'t let me sleep. The 432Hz Mental Frequencies combined with the proposed breathing exercises became my refuge every night. Today I sleep like an angel and wake up with mental clarity and peace of mind.',
    rating: 5,
    category: 'Mental Peace',
    date: '2026-06-18'
  }
];
