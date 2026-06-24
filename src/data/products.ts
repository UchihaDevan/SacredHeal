import type { Product } from '../types';

export const products: Product[] = [
  // --- MAIN CONTENT (5 Produtos) ---
  {
    id: 'healing-vault',
    name: 'Healing Frequencies Vault',
    section: 'main',
    description: 'Acesso completo a frequências sonoras terapêuticas voltadas à regeneração biológica e restauração da saúde.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
    category: 'Frequências de Cura',
    tags: ['Cura Física', 'Regeneração', 'Solfeggio'],
    benefits: [
      'Alívio de dores crônicas',
      'Auxílio no controle do diabetes e detox sanguíneo',
      'Apoio à regeneração intestinal e circulatória'
    ],
    isPremium: false
  },
  {
    id: 'daily-verses',
    name: 'Daily Verses',
    section: 'main',
    description: 'Alimento espiritual diário. Um versículo bíblico selecionado a cada dia com interpretações pastorais profundas para guiar seus passos.',
    imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad58565b90?auto=format&fit=crop&w=600&q=80',
    category: 'Sabedoria Diária',
    tags: ['Bíblia', 'Espiritualidade', 'Devocional'],
    benefits: [
      'Paz de espírito diária',
      'Compreensão clara das escrituras',
      'Fácil compartilhamento com pessoas queridas'
    ],
    isPremium: false
  },
  {
    id: 'archangel-frequencies',
    name: '7 Sacred Archangel Frequencies',
    section: 'main',
    description: 'Sintonize-se com as frequências associadas aos 7 Grandes Arcanjos de Deus para proteção, cura e orientação divina.',
    imageUrl: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&w=600&q=80',
    category: 'Frequências Celestiais',
    tags: ['Arcanjos', 'Proteção', 'Meditação'],
    benefits: [
      'Frequência de Miguel para proteção contra males',
      'Frequência de Rafael para cura espiritual e física',
      'Frequência de Gabriel para clareza e revelação'
    ],
    isPremium: false
  },
  {
    id: 'prosperity-frequencies',
    name: 'Prosperity Frequencies',
    section: 'main',
    description: 'Ondas sonoras de abundância projetadas para sintonizar sua mente com o fluxo da prosperidade e riqueza divina.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    category: 'Abundância',
    tags: ['Prosperidade', 'Manifestação', 'Riqueza'],
    benefits: [
      'Quebra de bloqueios de escassez',
      'Estímulo mental para novas ideias de sucesso',
      'Afirmações ativas de merecimento divino'
    ],
    isPremium: false
  },
  {
    id: 'mental-frequencies',
    name: 'Mental Frequencies',
    section: 'main',
    description: 'Estimulação de ondas alfa e teta para clareza mental extrema, foco apurado e controle imediato da ansiedade.',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80',
    category: 'Foco & Mente',
    tags: ['Foco', 'Alívio de Estresse', 'Mente'],
    benefits: [
      'Estudos mais focados e produtivos',
      'Redução rápida do estresse e insônia',
      'Instruções simples de respiração associada'
    ],
    isPremium: false
  },

  // --- PREMIUM (5 Produtos) ---
  {
    id: 'chat-pastor',
    name: 'Chat com Pastor Caleb',
    section: 'premium',
    description: 'Converse com o Pastor Caleb, um conselheiro espiritual simulado em tempo real para orações, suporte em crises e discernimento bíblico.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    category: 'Aconselhamento',
    tags: ['Aconselhamento', 'Caleb', 'Suporte'],
    benefits: [
      'Respostas em tempo real para momentos de aflição',
      'Indicação de versículos específicos para sua dor',
      'Conversas 100% privadas e salvas localmente'
    ],
    isPremium: true
  },
  {
    id: 'divine-accelerator',
    name: 'Divine Frequencies Accelerator',
    section: 'premium',
    description: 'Acelere seu processo de cura e elevação espiritual com este programa intensivo de frequências de alta potência a 999Hz.',
    imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
    category: 'Cura Avançada',
    tags: ['Acelerador', 'Alta Potência', '999Hz'],
    benefits: [
      'Aceleração metabólica e energética',
      'Meditações ultra profundas',
      'Sessões dinâmicas com indicador de intensidade'
    ],
    isPremium: true
  },
  {
    id: 'turbo-session',
    name: 'Turbo Session (7 Powerful Audios)',
    section: 'premium',
    description: 'Uma sessão contínua e sequencial combinando 7 frequências de cura que atua de forma abrangente em todo o corpo e mente.',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=600&q=80',
    category: 'Alinhamento Rápido',
    tags: ['Playlist', 'Turbo', 'Completo'],
    benefits: [
      '45 minutos de alinhamento contínuo',
      'Mudança automatizada de frequências sonoras',
      'Ideal para meditação noturna'
    ],
    isPremium: true
  },
  {
    id: 'sanctuary-healing',
    name: 'Sanctuary of Healing and Prosperity',
    section: 'premium',
    description: 'Um refúgio místico virtual que combina meditação visual em texto com áudio 3D e sintonizações Hz de prosperidade.',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    category: 'Experiência Virtual',
    tags: ['Santuário', 'Visualização', 'Abundância'],
    benefits: [
      'Ambiente audiovisual premium relaxante',
      'Guias de respiração e visualização dourada',
      'Afirmações ativas de cura sistêmica'
    ],
    isPremium: true
  },
  {
    id: 'divine-code',
    name: 'The Divine Energy Code',
    section: 'premium',
    description: 'O maior lançamento do ano. Um código de sintonização vibracional avançada focado na conexão espiritual direta com a criação.',
    imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=600&q=80',
    category: 'Exclusivo',
    tags: ['Lançamento', 'Segredo', 'Energia'],
    benefits: [
      'Revelações exclusivas sobre frequências universais',
      'Data de lançamento fixada para 07/07',
      'Participe da lista de espera exclusiva'
    ],
    isComingSoon: true,
    releaseDate: '2026-07-07',
    isPremium: true
  },

  // --- BONUS (6 Produtos) ---
  {
    id: 'testimonials',
    name: 'Testimonials',
    section: 'bonus',
    description: 'Leia relatos emocionantes e comprovados de cura, libertação e prosperidade financeira alcançados por membros da nossa fé.',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
    category: 'Comunidade',
    tags: ['Depoimentos', 'Fé', 'Milagres'],
    benefits: [
      'Inspiração diária através da vitória alheia',
      'Filtro por temas: saúde, finanças, família',
      'Envie o seu próprio relato de vitória'
    ],
    isPremium: false
  },
  {
    id: 'biblical-wisdom',
    name: 'Biblical Wisdom',
    section: 'bonus',
    description: 'Ensinamentos bíblicos profundos e estudos temáticos para edificação pessoal e fortalecimento da fé no cotidiano.',
    imageUrl: 'https://images.unsplash.com/photo-1438210159938-e2794098ea86?auto=format&fit=crop&w=600&q=80',
    category: 'Estudos Bíblicos',
    tags: ['Estudo', 'Sabedoria', 'Teologia'],
    benefits: [
      'Estudos detalhados organizados por livro bíblico',
      'Interpretação histórica e contextual dos textos',
      'Opção para favoritar e marcar lições concluídas'
    ],
    isPremium: false
  },
  {
    id: 'anointed-prayer-1',
    name: 'Anointed Prayer (2023 Edition)',
    section: 'bonus',
    description: 'Uma poderosa oração de libertação gravada em áudio e texto ungidos para proteção do lar e afastamento de forças contrárias.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    category: 'Orações Ungidas',
    tags: ['Oração', 'Libertação', 'Proteção'],
    edition: '2023 - 1ª Edição',
    benefits: [
      'Áudio com fundo musical em frequência de paz',
      'Instruções de oração (melhor horário e postura)',
      'Texto completo para acompanhamento'
    ],
    isPremium: false
  },
  {
    id: 'anointed-prayer-2',
    name: 'Anointed Prayer (Segunda Edição 2023)',
    section: 'bonus',
    description: 'A segunda coletânea de preces focadas em restaurar a paz familiar, curar relacionamentos e abençoar a vida financeira.',
    imageUrl: 'https://images.unsplash.com/photo-1445445290250-18a34724e554?auto=format&fit=crop&w=600&q=80',
    category: 'Orações Ungidas',
    tags: ['Oração', 'Família', 'Bênção'],
    edition: '2023 - Segunda Edição',
    benefits: [
      'Foco em cura espiritual familiar',
      'Preces voltadas para estabilidade nos negócios',
      'Roteiro de 7 dias de consagração contidos na prece'
    ],
    isPremium: false
  },
  {
    id: 'sacred-challenge',
    name: 'Sacred Challenge',
    section: 'bonus',
    description: 'Participe do nosso desafio espiritual interativo. Crie o hábito de oração, escuta e leitura diárias para transformar sua vida.',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=600&q=80',
    category: 'Desafios',
    tags: ['Desafio', 'Hábitos', 'Metas'],
    benefits: [
      'Desafios estruturados de 7, 21 ou 30 dias',
      'Checklist diário e contador de streak (dias seguidos)',
      'Progresso visual interativo e histórico'
    ],
    isPremium: false
  },
  {
    id: 'premium-resources',
    name: 'Premium Resources',
    section: 'bonus',
    description: 'Acesso a recursos adicionais para download, incluindo eBooks em PDF, guias práticos de jejum e meditação bíblica.',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=600&q=80',
    category: 'Downloads',
    tags: ['PDF', 'Guias', 'Estudo'],
    benefits: [
      'eBooks completos de estudos espirituais',
      'Modelos de agendas de orações em PDF para impressão',
      'Acesso a materiais de suporte em vídeo'
    ],
    isPremium: false
  }
];

export const frequenciesData = [
  {
    id: 'freq-396',
    name: 'Frequência de Cura 396 Hz',
    hz: 396,
    category: 'healing',
    description: 'Frequência de libertação de culpas e medos. Abre caminho para a regeneração e paz profunda.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 300,
    benefits: ['Libertação do medo', 'Quebra de amarras mentais', 'Equilíbrio emocional'],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'freq-417',
    name: 'Frequência de Cura 417 Hz',
    hz: 417,
    category: 'healing',
    description: 'Frequência facilitadora de mudanças. Limpa traumas do passado e influências negativas externas.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 300,
    benefits: ['Renovação celular', 'Limpeza energética', 'Superação de traumas'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'freq-528',
    name: 'Frequência da Transformação 528 Hz',
    hz: 528,
    category: 'healing',
    description: 'A frequência dos milagres e reparação do DNA. Conhecida mundialmente por trazer paz e cura física intensa.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 420,
    benefits: ['Reparação celular profunda', 'Atração de milagres', 'Aumento de energia vital'],
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'freq-639',
    name: 'Frequência de Conexão 639 Hz',
    hz: 639,
    category: 'healing',
    description: 'Promove a harmonia nos relacionamentos interpessoais e familiares. Fortalece a empatia e o amor divino.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    duration: 360,
    benefits: ['Harmonia familiar', 'Cura de mágoas sociais', 'Abertura do coração para o amor'],
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'freq-741',
    name: 'Frequência da Intuição 741 Hz',
    hz: 741,
    category: 'healing',
    description: 'Frequência voltada à limpeza de toxinas físicas e ondas eletromagnéticas prejudiciais. Estimula a clareza e verdade.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    duration: 300,
    benefits: ['Desintoxicação corporal', 'Clareza mental imediata', 'Estímulo à intuição e expressão'],
    imageUrl: 'https://images.unsplash.com/photo-1438210159938-e2794098ea86?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'freq-852',
    name: 'Frequência Espiritual 852 Hz',
    hz: 852,
    category: 'healing',
    description: 'Frequência de retorno à ordem espiritual superior. Desperta a intuição espiritual e a conexão direta com o sagrado.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    duration: 480,
    benefits: ['Despertar espiritual', 'Clareza em orações', 'Redução do ego e medos metafísicos'],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'freq-963',
    name: 'Frequência Cósmica 963 Hz',
    hz: 963,
    category: 'healing',
    description: 'A "Frequência dos Deuses". Ativa a glândula pineal e conecta o eu espiritual ao Universo e ao Criador.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    duration: 600,
    benefits: ['Conexão divina superior', 'Ativação da pineal', 'Paz universal indescritível'],
    imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=200&q=80'
  }
];

export const archangelsData = [
  {
    id: 'arch-miguel',
    name: 'Arcanjo Miguel - Proteção Divina',
    hz: 111,
    role: 'Defensor da Fé e Protetor contra o mal',
    properties: ['Escudo de proteção azul', 'Corte de laços negativos', 'Coragem divina'],
    description: 'A frequência de 111Hz do Arcanjo Miguel fortalece o espírito, fornecendo um escudo invisível contra toda inveja, maldade e medo.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'arch-gabriel',
    name: 'Arcanjo Gabriel - Revelação e Clareza',
    hz: 222,
    role: 'Mensageiro Divino e Guia da Comunicação',
    properties: ['Luz branca de pureza', 'Mensagens em sonhos', 'Criatividade espiritual'],
    description: 'A frequência de 222Hz ressoa com o Arcanjo Gabriel, facilitando a recepção de orientação espiritual clara e fortalecendo a oratória e clareza mental.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad58565b90?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'arch-rafael',
    name: 'Arcanjo Rafael - Cura do Corpo e Alma',
    hz: 333,
    role: 'Médico Celestial e Guia dos Viajantes',
    properties: ['Luz verde curativa', 'Cura de enfermidades físicas', 'Alívio do estresse'],
    description: 'Ressoe com os 333Hz de Rafael para canalizar energias curativas celestiais sobre dores físicas e feridas na alma.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=200&q=80'
  }
];
