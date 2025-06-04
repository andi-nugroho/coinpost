// Mock data for creators
export const CREATORS = [
  {
    id: '1',
    name: 'Alex Rivers',
    username: 'alexrivers',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
    bannerImage: 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Digital artist and NFT creator exploring the intersection of art and technology.',
    followers: 12500,
    tokenPrice: 5.75,
    tokenChange: 12.5,
    marketCap: 575000,
    verified: true,
    category: 'Art',
    links: [
      { platform: 'Twitter', url: '#' },
      { platform: 'Instagram', url: '#' },
      { platform: 'Website', url: '#' }
    ]
  },
  {
    id: '2',
    name: 'Mia Chen',
    username: 'miachen',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=200',
    bannerImage: 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Music producer and songwriter creating immersive audio experiences.',
    followers: 8300,
    tokenPrice: 3.20,
    tokenChange: -2.1,
    marketCap: 320000,
    verified: true,
    category: 'Music',
    links: [
      { platform: 'Spotify', url: '#' },
      { platform: 'Twitter', url: '#' }
    ]
  },
  {
    id: '3',
    name: 'Jay Williams',
    username: 'jaywilliams',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200',
    bannerImage: 'https://images.pexels.com/photos/7130554/pexels-photo-7130554.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Writer and storyteller exploring new frontiers in web3 publishing.',
    followers: 5100,
    tokenPrice: 1.85,
    tokenChange: 5.3,
    marketCap: 185000,
    verified: false,
    category: 'Writing',
    links: [
      { platform: 'Mirror', url: '#' },
      { platform: 'Twitter', url: '#' }
    ]
  },
  {
    id: '4',
    name: 'Elena Rodriguez',
    username: 'elenaart',
    avatar: 'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&w=200',
    bannerImage: 'https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Contemporary artist blending traditional techniques with digital innovation.',
    followers: 7800,
    tokenPrice: 2.95,
    tokenChange: 8.7,
    marketCap: 295000,
    verified: true,
    category: 'Art',
    links: [
      { platform: 'Instagram', url: '#' },
      { platform: 'Website', url: '#' }
    ]
  },
  {
    id: '5',
    name: 'Marcus Johnson',
    username: 'djmarcus',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200',
    bannerImage: 'https://images.pexels.com/photos/7130539/pexels-photo-7130539.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'DJ and electronic music producer pushing boundaries in sound design.',
    followers: 9200,
    tokenPrice: 4.10,
    tokenChange: -1.2,
    marketCap: 410000,
    verified: false,
    category: 'Music',
    links: [
      { platform: 'SoundCloud', url: '#' },
      { platform: 'Twitter', url: '#' }
    ]
  },
  {
    id: '6',
    name: 'Sophie Kim',
    username: 'sophiegames',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=200',
    bannerImage: 'https://images.pexels.com/photos/7130538/pexels-photo-7130538.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Game designer and streamer creating interactive experiences for Web3.',
    followers: 6500,
    tokenPrice: 2.40,
    tokenChange: 15.2,
    marketCap: 240000,
    verified: true,
    category: 'Gaming',
    links: [
      { platform: 'Twitch', url: '#' },
      { platform: 'Twitter', url: '#' }
    ]
  },
  {
    id: '7',
    name: 'David Lee',
    username: 'davidphotos',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    bannerImage: 'https://images.pexels.com/photos/7130537/pexels-photo-7130537.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Photographer capturing breathtaking landscapes and urban environments.',
    followers: 4800,
    tokenPrice: 1.65,
    tokenChange: 3.8,
    marketCap: 165000,
    verified: false,
    category: 'Photography',
    links: [
      { platform: 'Instagram', url: '#' },
      { platform: 'Website', url: '#' }
    ]
  },
  {
    id: '8',
    name: 'Olivia Taylor',
    username: 'oliviawriting',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    bannerImage: 'https://images.pexels.com/photos/7130550/pexels-photo-7130550.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Author and poet exploring new forms of storytelling in the digital age.',
    followers: 5700,
    tokenPrice: 2.10,
    tokenChange: 6.5,
    marketCap: 210000,
    verified: true,
    category: 'Writing',
    links: [
      { platform: 'Mirror', url: '#' },
      { platform: 'Twitter', url: '#' }
    ]
  }
];

// Featured creators (subset)
export const FEATURED_CREATORS = CREATORS.slice(0, 4);

// Mock content data
export const CONTENT = [
  {
    id: '101',
    title: 'Digital Dreamscape',
    image: 'https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'An exploration of surreal digital landscapes that blur the line between reality and imagination.',
    creatorId: '1',
    createdAt: '2025-04-15T10:30:00Z',
    likes: 145,
    comments: 23,
    price: 0.5,
    type: 'nft',
    isSubscriberOnly: false
  },
  {
    id: '102',
    title: 'Harmonic Fusion',
    image: 'https://images.pexels.com/photos/7130464/pexels-photo-7130464.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A genre-bending audio experience that combines electronic, classical, and ambient elements.',
    creatorId: '2',
    createdAt: '2025-04-14T15:45:00Z',
    likes: 87,
    comments: 12,
    price: 0.2,
    type: 'token',
    isSubscriberOnly: false
  },
  {
    id: '103',
    title: 'Echoes of Tomorrow',
    image: 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A short story set in a near-future society exploring the implications of tokenized creativity.',
    creatorId: '3',
    createdAt: '2025-04-13T09:15:00Z',
    likes: 65,
    comments: 18,
    price: 0.15,
    type: 'token',
    isSubscriberOnly: true
  },
  {
    id: '104',
    title: 'Prismatic Reflections',
    image: 'https://images.pexels.com/photos/2395249/pexels-photo-2395249.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A series of digital paintings exploring the interplay of light, color, and form.',
    creatorId: '4',
    createdAt: '2025-04-12T14:20:00Z',
    likes: 112,
    comments: 31,
    price: 0.35,
    type: 'nft',
    isSubscriberOnly: false
  },
  {
    id: '105',
    title: 'Quantum Beats',
    image: 'https://images.pexels.com/photos/2111015/pexels-photo-2111015.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'An experimental electronic track inspired by quantum physics and cosmic phenomena.',
    creatorId: '5',
    createdAt: '2025-04-11T18:30:00Z',
    likes: 93,
    comments: 15,
    price: 0.18,
    type: 'token',
    isSubscriberOnly: false
  },
  {
    id: '106',
    title: 'Virtual Odyssey',
    image: 'https://images.pexels.com/photos/6985046/pexels-photo-6985046.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A conceptual game design document for an immersive web3 gaming experience.',
    creatorId: '6',
    createdAt: '2025-04-10T11:45:00Z',
    likes: 78,
    comments: 27,
    price: 0.25,
    type: 'nft',
    isSubscriberOnly: true
  },
  {
    id: '107',
    title: 'Urban Perspectives',
    image: 'https://images.pexels.com/photos/6985147/pexels-photo-6985147.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A collection of street photography capturing the essence of city life around the world.',
    creatorId: '7',
    createdAt: '2025-04-09T16:10:00Z',
    likes: 105,
    comments: 19,
    price: 0.3,
    type: 'nft',
    isSubscriberOnly: false
  },
  {
    id: '108',
    title: 'Whispers of the Void',
    image: 'https://images.pexels.com/photos/6985256/pexels-photo-6985256.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A poem sequence exploring themes of existence, connection, and the digital realm.',
    creatorId: '8',
    createdAt: '2025-04-08T13:25:00Z',
    likes: 67,
    comments: 14,
    price: 0.12,
    type: 'token',
    isSubscriberOnly: true
  },
  {
    id: '109',
    title: 'Chromatic Dreams',
    image: 'https://images.pexels.com/photos/7130537/pexels-photo-7130537.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'An interactive digital art piece that responds to viewer engagement and token ownership.',
    creatorId: '1',
    createdAt: '2025-04-07T09:50:00Z',
    likes: 128,
    comments: 32,
    price: 0.45,
    type: 'nft',
    isSubscriberOnly: false
  },
  {
    id: '110',
    title: 'Sonic Tapestry',
    image: 'https://images.pexels.com/photos/7130599/pexels-photo-7130599.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A collaborative music project that evolves based on token holder contributions.',
    creatorId: '2',
    createdAt: '2025-04-06T15:15:00Z',
    likes: 91,
    comments: 25,
    price: 0.22,
    type: 'token',
    isSubscriberOnly: true
  }
];
