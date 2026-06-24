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
    name: 'Deliverance Prayer and Protective Shield',
    text: `Lord God, Almighty Father, Creator of Heaven and Earth.
I enter Your presence at this moment to pray for Your protective shield over my life, my home, and all my family members.
By the power of the name of Jesus Christ, I rebuke every opposing force, every fiery dart of the enemy, and every word of curse cast against my home.
May Your holy angels encamp around me. Cover me with Your precious blood and grant me deliverance from all mental, physical, and spiritual chains.
I decree that the peace of the Lord Jesus dwells in this place today and forever.
Amen.`,
    instructions: 'It is recommended to recite this prayer at dawn, standing up, with hands turned upward, visualizing the armor of God covering your being.',
    recommendedTime: 'Morning (upon waking)',
    edition: '2023 - 1st Edition'
  },
  {
    id: 'oracao-prosperidade-2',
    name: 'Provision and Family Blessing Prayer',
    text: `Heavenly Father, You who multiply the loaves and fish and do not let Your people lack sustenance.
Look upon our financial and professional needs. Open the doors that are closed, pour out creative ideas for success, and attract opportunities of legitimate prosperity.
I rebuke every spirit of scarcity and misery from my family lineage.
I declare that my house is a storehouse full of blessings and that we will have enough to live with dignity and overflow into the lives of those in need.
Bless the work of our hands and purify our intentions.
In the name of Jesus Christ. Amen.`,
    instructions: 'It is recommended to recite this prayer at night, before sleeping, keeping the mind calm and focused on the feeling of gratitude and divine abundance.',
    recommendedTime: 'Night (before sleeping)',
    edition: '2023 - Second Edition'
  }
];
