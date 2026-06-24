import type { Product } from '../types';

export const products: Product[] = [
  // --- MAIN CONTENT (5 Products) ---
  {
    id: 'healing-vault',
    name: 'Healing Frequencies Vault',
    section: 'main',
    description: 'Complete access to therapeutic sound frequencies focused on biological regeneration and health restoration.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    category: 'Healing Frequencies',
    tags: ['Physical Healing', 'Regeneration', 'Solfeggio'],
    benefits: [
      'Chronic pain relief',
      'Assistance in blood detox and diabetes management',
      'Support for intestinal and circulatory regeneration'
    ],
    isPremium: false
  },
  {
    id: 'daily-verses',
    name: 'Daily Verses',
    section: 'main',
    description: 'Daily spiritual nourishment. A biblical verse selected each day with deep pastoral interpretations to guide your steps.',
    imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad58565b90?auto=format&fit=crop&w=600&q=80',
    category: 'Daily Wisdom',
    tags: ['Bible', 'Spirituality', 'Devotional'],
    benefits: [
      'Daily peace of mind',
      'Clear understanding of scriptures',
      'Easy sharing with loved ones'
    ],
    isPremium: false
  },
  {
    id: 'archangel-frequencies',
    name: '7 Sacred Archangel Frequencies',
    section: 'main',
    description: 'Tune in to the frequencies associated with the 7 Great Archangels of God for protection, healing, and divine guidance.',
    imageUrl: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&w=600&q=80',
    category: 'Celestial Frequencies',
    tags: ['Archangels', 'Protection', 'Meditation'],
    benefits: [
      "Michael's frequency for protection against evil",
      "Raphael's frequency for spiritual and physical healing",
      "Gabriel's frequency for clarity and revelation"
    ],
    isPremium: false
  },
  {
    id: 'prosperity-frequencies',
    name: 'Prosperity Frequencies',
    section: 'main',
    description: 'Sound waves of abundance designed to tune your mind to the flow of prosperity and divine wealth.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    category: 'Abundance',
    tags: ['Prosperity', 'Manifestation', 'Wealth'],
    benefits: [
      'Breaking blocks of scarcity',
      'Mental stimulation for new ideas of success',
      'Active affirmations of divine worthiness'
    ],
    isPremium: false
  },
  {
    id: 'mental-frequencies',
    name: 'Mental Frequencies',
    section: 'main',
    description: 'Stimulation of alpha and theta waves for extreme mental clarity, sharp focus, and immediate anxiety control.',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80',
    category: 'Focus & Mind',
    tags: ['Focus', 'Stress Relief', 'Mind'],
    benefits: [
      'More focused and productive studies',
      'Rapid reduction of stress and insomnia',
      'Simple instructions for associated breathing'
    ],
    isPremium: false
  },

  // --- PREMIUM (5 Products) ---
  {
    id: 'chat-pastor',
    name: 'Chat with Pastor Caleb',
    section: 'premium',
    description: 'Converse with Pastor Caleb, a simulated real-time spiritual counselor for prayers, crisis support, and biblical discernment.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    category: 'Counseling',
    tags: ['Counseling', 'Caleb', 'Support'],
    benefits: [
      'Real-time answers for moments of distress',
      'Indication of specific verses for your pain',
      '100% private conversations saved locally'
    ],
    isPremium: true
  },
  {
    id: 'divine-accelerator',
    name: 'Divine Frequencies Accelerator',
    section: 'premium',
    description: 'Accelerate your healing and spiritual elevation process with this intensive program of high-power frequencies at 999Hz.',
    imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
    category: 'Advanced Healing',
    tags: ['Accelerator', 'High Power', '999Hz'],
    benefits: [
      'Metabolic and energetic acceleration',
      'Ultra-deep meditations',
      'Dynamic sessions with intensity indicator'
    ],
    isPremium: true
  },
  {
    id: 'turbo-session',
    name: 'Turbo Session (7 Powerful Audios)',
    section: 'premium',
    description: 'A continuous and sequential session combining 7 healing frequencies that acts comprehensively across the body and mind.',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=600&q=80',
    category: 'Quick Alignment',
    tags: ['Playlist', 'Turbo', 'Complete'],
    benefits: [
      '45 minutes of continuous alignment',
      'Automated switching of sound frequencies',
      'Ideal for nighttime meditation'
    ],
    isPremium: true
  },
  {
    id: 'sanctuary-healing',
    name: 'Sanctuary of Healing and Prosperity',
    section: 'premium',
    description: 'A virtual mystical refuge that combines visual meditation in text with 3D audio and Hz sintonizations of prosperity.',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    category: 'Virtual Experience',
    tags: ['Sanctuary', 'Visualization', 'Abundance'],
    benefits: [
      'Premium relaxing audiovisual environment',
      'Breathing and golden visualization guides',
      'Active affirmations of systemic healing'
    ],
    isPremium: true
  },
  {
    id: 'divine-code',
    name: 'The Divine Energy Code',
    section: 'premium',
    description: 'The biggest launch of the year. An advanced vibrational sintonization code focused on direct spiritual connection with creation.',
    imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=600&q=80',
    category: 'Exclusive',
    tags: ['Launch', 'Secret', 'Energy'],
    benefits: [
      'Exclusive revelations about universal frequencies',
      'Launch date set for 07/07',
      'Join the exclusive waitlist'
    ],
    isComingSoon: true,
    releaseDate: '2026-07-07',
    isPremium: true
  },

  // --- BONUS (6 Products) ---
  {
    id: 'testimonials',
    name: 'Testimonials',
    section: 'bonus',
    description: 'Read touching and proven accounts of healing, deliverance, and financial prosperity achieved by members of our faith.',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    category: 'Community',
    tags: ['Testimonials', 'Faith', 'Miracles'],
    benefits: [
      "Daily inspiration through others' victory",
      'Filter by themes: health, finance, family',
      'Send your own victory account'
    ],
    isPremium: false
  },
  {
    id: 'biblical-wisdom',
    name: 'Biblical Wisdom',
    section: 'bonus',
    description: 'Deep biblical teachings and thematic studies for personal edification and daily strengthening of faith.',
    imageUrl: 'https://images.unsplash.com/photo-1438210159938-e2794098ea86?auto=format&fit=crop&w=600&q=80',
    category: 'Bible Studies',
    tags: ['Study', 'Wisdom', 'Theology'],
    benefits: [
      'Detailed studies organized by biblical book',
      'Historical and contextual interpretation of texts',
      'Option to favorite and mark lessons completed'
    ],
    isPremium: false
  },
  {
    id: 'anointed-prayer-1',
    name: 'Anointed Prayer (2023 Edition)',
    section: 'bonus',
    description: 'A powerful prayer of deliverance recorded in anointed audio and text for home protection and keeping away opposing forces.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    category: 'Anointed Prayers',
    tags: ['Prayer', 'Deliverance', 'Protection'],
    edition: '2023 - 1st Edition',
    benefits: [
      'Audio with background music in frequency of peace',
      'Prayer instructions (best time and posture)',
      'Full text for follow-along'
    ],
    isPremium: false
  },
  {
    id: 'anointed-prayer-2',
    name: 'Anointed Prayer (Second Edition 2023)',
    section: 'bonus',
    description: 'The second collection of prayers focused on restoring family peace, healing relationships, and blessing financial life.',
    imageUrl: 'https://images.unsplash.com/photo-1445445290250-18a34724e554?auto=format&fit=crop&w=600&q=80',
    category: 'Anointed Prayers',
    tags: ['Prayer', 'Family', 'Blessing'],
    edition: '2023 - Second Edition',
    benefits: [
      'Focus on family spiritual healing',
      'Prayers geared toward business stability',
      '7-day consecration program contained in the prayer'
    ],
    isPremium: false
  },
  {
    id: 'sacred-challenge',
    name: 'Sacred Challenge',
    section: 'bonus',
    description: 'Participate in our interactive spiritual challenge. Build the habit of daily prayer, listening, and reading to transform your life.',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=80',
    category: 'Challenges',
    tags: ['Challenge', 'Habits', 'Goals'],
    benefits: [
      'Structured challenges of 7, 21, or 30 days',
      'Daily checklist and streak counter (consecutive days)',
      'Interactive visual progress and history'
    ],
    isPremium: false
  },
  {
    id: 'premium-resources',
    name: 'Premium Resources',
    section: 'bonus',
    description: 'Access to additional resources for download, including PDF eBooks, practical guides on fasting, and biblical meditation.',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80',
    category: 'Downloads',
    tags: ['PDF', 'Guides', 'Study'],
    benefits: [
      'Complete spiritual study eBooks',
      'Printable prayer planner templates in PDF',
      'Access to video support materials'
    ],
    isPremium: false
  }
];

export const frequenciesData = [
  {
    id: 'freq-396',
    name: 'Healing Frequency 396 Hz',
    hz: 396,
    category: 'healing',
    description: 'Frequency for releasing guilt and fear. Paves the way for regeneration and deep peace.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 300,
    benefits: ['Release of fear', 'Breaking mental chains', 'Emotional balance'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'freq-417',
    name: 'Healing Frequency 417 Hz',
    hz: 417,
    category: 'healing',
    description: 'Frequency facilitating change. Clears past traumas and negative external influences.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 300,
    benefits: ['Cellular renewal', 'Energetic cleansing', 'Overcoming traumas'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'freq-528',
    name: 'Transformation Frequency 528 Hz',
    hz: 528,
    category: 'healing',
    description: 'The frequency of miracles and DNA repair. Known worldwide for bringing peace and intense physical healing.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 420,
    benefits: ['Deep cellular repair', 'Attracting miracles', 'Increased vital energy'],
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'freq-639',
    name: 'Connection Frequency 639 Hz',
    hz: 639,
    category: 'healing',
    description: 'Promotes harmony in interpersonal and family relationships. Strengthens empathy and divine love.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 360,
    benefits: ['Family harmony', 'Healing social grievances', 'Opening the heart to love'],
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'freq-741',
    name: 'Intuition Frequency 741 Hz',
    hz: 741,
    category: 'healing',
    description: 'Frequency aimed at cleansing physical toxins and harmful electromagnetic waves. Stimulates clarity and truth.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 300,
    benefits: ['Body detoxification', 'Immediate mental clarity', 'Stimulating intuition and expression'],
    imageUrl: 'https://images.unsplash.com/photo-1438210159938-e2794098ea86?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'freq-852',
    name: 'Spiritual Frequency 852 Hz',
    hz: 852,
    category: 'healing',
    description: 'Frequency of returning to higher spiritual order. Awakens spiritual intuition and direct connection to the sacred.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration: 480,
    benefits: ['Spiritual awakening', 'Clarity in prayers', 'Reduction of ego and metaphysical fears'],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'freq-963',
    name: 'Cosmic Frequency 963 Hz',
    hz: 963,
    category: 'healing',
    description: 'The "Frequency of the Gods". Activates the pineal gland and connects the spiritual self to the Universe and the Creator.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    duration: 600,
    benefits: ['Higher divine connection', 'Pineal activation', 'Indescribable universal peace'],
    imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=200&q=80'
  }
];

export const archangelsData = [
  {
    id: 'arch-miguel',
    name: 'Archangel Michael - Divine Protection',
    hz: 111,
    role: 'Defender of Faith and Protector against evil',
    properties: ['Blue shield of protection', 'Cutting negative cords', 'Divine courage'],
    description: 'The 111Hz frequency of Archangel Michael strengthens the spirit, providing an invisible shield against all envy, evil, and fear.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'arch-gabriel',
    name: 'Archangel Gabriel - Revelation and Clarity',
    hz: 222,
    role: 'Divine Messenger and Guide of Communication',
    properties: ['White light of purity', 'Messages in dreams', 'Spiritual creativity'],
    description: 'The 222Hz frequency resonates with Archangel Gabriel, facilitating the reception of clear spiritual guidance and strengthening speech and mental clarity.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad58565b90?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'arch-rafael',
    name: 'Archangel Raphael - Healing of Body and Soul',
    hz: 333,
    role: 'Heavenly Physician and Guide of Travelers',
    properties: ['Green healing light', 'Healing of physical ailments', 'Stress relief'],
    description: "Resonate with Rafael's 333Hz to channel heavenly healing energies over physical pain and wounds of the soul.",
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80'
  }
];
