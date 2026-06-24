import type { BotResponse } from '../types';

export const botResponses: BotResponse[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'pastor', 'caleb', 'pastor caleb'],
    responses: [
      'Grace and peace, my friend! How can I help you and your family today?',
      'Welcome! May the presence of the Lord be with you today. How can I pray for you right now?',
      'Hello! I am Pastor Caleb. I am here to offer biblical counsel, prayers, and a friendly ear. What is on your heart?'
    ]
  },
  {
    keywords: ['sad', 'sadness', 'depression', 'depressed', 'cry', 'crying', 'anguish', 'grief', 'despair', 'alone', 'lonely', 'loneliness'],
    responses: [
      'Remember that weeping may tarry for the night, but joy comes with the morning. You are not alone; the Lord is right by your side.',
      'In moments of deep pain, God gathers each of our tears. Allow me to share a verse of hope with you.',
      "Depression and sadness try to cloud our vision, but Christ's light is greater than any darkness. The Lord loves you unconditionally."
    ],
    verse: 'The Lord is near to the brokenhearted and saves the crushed in spirit.',
    verseReference: 'Psalms 34:18'
  },
  {
    keywords: ['fear', 'anxiety', 'anxious', 'worried', 'worry', 'panic', 'apprehensive', 'scared', 'afraid'],
    responses: [
      'The Word tells us not to be anxious about anything. Hand over your worries to God in prayer; He cares for you.',
      "Fear is real, but God's perfect love casts out all fear. Take a deep breath, tune in to a frequency of peace, and trust.",
      'When anxiety knocks at your door, remember: God is in control of all things. Tomorrow belongs to Him.'
    ],
    verse: 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.',
    verseReference: 'Philippians 4:6-7'
  },
  {
    keywords: ['money', 'financial', 'debt', 'debts', 'scarcity', 'crisis', 'lack', 'unemployment', 'job', 'work', 'broke'],
    responses: [
      'God is our provider. Even in the midst of scarcity, He has plans of prosperity and abundance for your life. Believe!',
      'Financial difficulties can test our faith, but the Lord will supply all your needs according to His riches.',
      'Do not worry about what you will eat or wear, for your Heavenly Father knows you need all of this. Seek first the Kingdom of God.'
    ],
    verse: 'And my God will supply every need of yours according to his riches in glory in Christ Jesus.',
    verseReference: 'Philippians 4:19'
  },
  {
    keywords: ['healing', 'cure', 'sick', 'sickness', 'illness', 'disease', 'pain', 'pains', 'health', 'hospital', 'cancer', 'ill'],
    responses: [
      "By Christ's wounds we were healed. Cry out to the Lord for your health now; He is the God who heals.",
      'May the healing hand of God rest upon your body at this very moment. Faith moves mountains and brings physical and spiritual healing.',
      'Do not lose hope. Jesus healed many who sought Him, and His restoring power remains the same today.'
    ],
    verse: 'Who forgives all your iniquity, who heals all your diseases.',
    verseReference: 'Psalms 103:3'
  },
  {
    keywords: ['help', 'pray', 'prayer', 'praying', 'intercede', 'support', 'help me'],
    responses: [
      'I am here to pray for you. Lord, I ask that You pour out Your blessing and Your peace upon this life now.',
      "Call to God and He will answer. Let us lift our thoughts to the Lord in prayer. What would you like to place on God's altar?",
      'The prayer of a righteous person is powerful and effective. Count on me to intercede for you before the Father.'
    ],
    verse: 'Call to me and I will answer you, and will tell you great and hidden things that you have not known.',
    verseReference: 'Jeremiah 33:3'
  }
];

export const fallbackResponses: string[] = [
  'I understand your heart. Know that God has a wonderful plan for you. Would you like to pray for this?',
  'Your words are important. Cast your burdens upon the Lord and He will sustain you. Is there something specific you wish to pray for?',
  "May the peace of Christ fill your mind at this moment. Remain firm in faith and tune in to our frequencies to meditate in God's presence.",
  'The Lord knows your ways and your struggles. Keep your eyes fixed on Him. Would you like to talk more about this, or would you prefer to read an encouraging verse?'
];
