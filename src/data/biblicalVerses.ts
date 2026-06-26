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
    verse: 'For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.',
    reference: 'Jeremiah 29:11',
    interpretation: "This passage guarantees us that God's will for our lives is goodness and abundance. Even if today's circumstances seem uncertain, the divine tomorrow is safe and prosperous.",
    imageUrl: 'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dv-2',
    verse: 'The Lord is my shepherd; I shall not want.',
    reference: 'Psalms 23:1',
    interpretation: 'A reminder of full confidence that our Creator supplies all our fronts: health, material support, and mental protection.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dv-3',
    verse: 'I can do all things through him who strengthens me.',
    reference: 'Philippians 4:13',
    interpretation: 'Our strength does not come from our own limited capacity, but from the unshakeable spiritual union with the Lord who dwells in us.',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80'
  }
];

export const biblicalWisdom: VerseData[] = [
  {
    id: 'bw-1',
    verse: 'Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.',
    reference: 'Proverbs 3:5-6',
    interpretation: "Human wisdom is flawed and based on appearances. True intelligence consists of trusting God's ways, silencing logical fear.",
    book: 'Proverbs',
    tags: ['Wisdom', 'Trust', 'Guidance'],
    imageUrl: 'https://images.unsplash.com/photo-1438210159938-e2794098ea86?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bw-2',
    verse: 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God.',
    reference: 'Philippians 4:6',
    interpretation: 'Anxiety blocks our spiritual sensitivity. Replace worry with sincere prayer and thoughts of gratitude.',
    book: 'Philippians',
    tags: ['Anxiety', 'Peace', 'Prayer'],
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bw-3',
    verse: 'Love is patient and kind; love does not envy or boast; it is not arrogant. It is not rude. It does not insist on its own way; it is not irritable or resentful.',
    reference: '1 Corinthians 13:4-5',
    interpretation: 'The greatest healing force in the universe is divine love. Practicing love rebuilds our biological immunity and attracts abundance and harmony in our homes.',
    book: '1 Corinthians',
    tags: ['Love', 'Relationships', 'Family'],
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80'
  }
];
