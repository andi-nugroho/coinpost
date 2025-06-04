export const SUPPORTED_FILE_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif'],
  video: ['video/mp4', 'video/webm'],
  audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
};

export const MAX_FILE_SIZE = 50; // MB

export const CONTENT_TYPES = [
  { id: 'image', label: 'Image', allowedTypes: SUPPORTED_FILE_TYPES.image },
  { id: 'video', label: 'Video', allowedTypes: SUPPORTED_FILE_TYPES.video },
  { id: 'audio', label: 'Audio', allowedTypes: SUPPORTED_FILE_TYPES.audio },
  { id: 'text', label: 'Article' },
];

export const MARKETPLACE_FILTERS = {
  categories: ['All', 'NFTs', 'Content Tokens', 'Creator Tokens'],
  sortOptions: [
    { value: 'trending', label: 'Trending' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'newest', label: 'Newest' },
  ],
};

export const ERROR_MESSAGES = {
  walletNotConnected: 'Please connect your wallet first',
  invalidFileType: 'Unsupported file type',
  fileTooLarge: 'File size exceeds maximum limit',
  transactionFailed: 'Transaction failed. Please try again.',
  networkError: 'Network error. Please check your connection.',
};
