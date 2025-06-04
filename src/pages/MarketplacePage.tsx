import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ArrowUp, ArrowDown, Wallet, X } from 'lucide-react';
import { CONTENT, CREATORS } from '../data/mockData';
import MarketCard from '../components/marketplace/MarketCard';
import { useWallet } from '../context/WalletContext';

const MarketplacePage: React.FC = () => {
  const { isConnected, connect } = useWallet();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('trending');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1 });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const categories = ['All', 'Creator Tokens', 'NFTs', 'Content Tokens'];
  const types = ['nft', 'token', 'creator_token'];

  // Create merged content with creator info
  const marketItems = CONTENT.map(content => {
    const creator = CREATORS.find(c => c.id === content.creatorId);
    return {
      ...content,
      creatorName: creator?.name || '',
      creatorAvatar: creator?.avatar || '',
      creatorUsername: creator?.username || ''
    };
  });

  // Filter and sort
  const filteredItems = marketItems.filter(item => {
    if (activeCategory !== 'All') {
      if (activeCategory === 'NFTs' && item.type !== 'nft') return false;
      if (activeCategory === 'Content Tokens' && item.type !== 'token') return false;
      if (activeCategory === 'Creator Tokens' && item.type !== 'creator_token') return false;
    }
    
    if (selectedTypes.length > 0 && !selectedTypes.includes(item.type)) {
      return false;
    }

    if (item.price < priceRange.min || item.price > priceRange.max) {
      return false;
    }
    
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    if (sortBy === 'trending') return b.likes - a.likes;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0;
  });

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-24 h-24 rounded-full bg-primary flex items-center justify-center border-2 border-text shadow-[4px_4px_0px_0px_rgba(16,48,69,1)]"
        >
          <Wallet size={32} className="text-text" />
        </motion.div>
        <h1 className="text-3xl font-bold text-center">Connect to Trade</h1>
        <p className="text-center max-w-md">
          Connect your wallet to start trading tokens and collecting NFTs.
        </p>
        <motion.button
          onClick={connect}
          className="btn btn-primary text-text"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Connect Wallet
        </motion.button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Marketplace</h1>
        <button
          onClick={() => setShowFilters(true)}
          className="md:hidden btn btn-primary text-text px-3 py-2"
        >
          <Filter size={20} />
        </button>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b border-text">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-bold">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full border-2 border-text font-bold ${
                          activeCategory === category
                            ? 'bg-primary'
                            : 'bg-white'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold">Price Range (ETH)</h3>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseFloat(e.target.value) }))}
                      className="input"
                      placeholder="Min"
                      step="0.01"
                    />
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseFloat(e.target.value) }))}
                      className="input"
                      placeholder="Max"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold">Type</h3>
                  <div className="space-y-2">
                    {types.map((type) => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => handleTypeToggle(type)}
                          className="w-5 h-5 rounded border-2 border-text"
                        />
                        <span className="capitalize">{type.replace('_', ' ')}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-text">
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full btn btn-primary text-text"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Filters */}
        <div className="hidden md:block w-64 space-y-6">
          <div className="card space-y-4">
            <h3 className="font-bold">Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full border-2 border-text font-bold text-left ${
                    activeCategory === category
                      ? 'bg-primary'
                      : 'bg-white hover:bg-primary-light'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="card space-y-4">
            <h3 className="font-bold">Price Range (ETH)</h3>
            <div className="space-y-2">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseFloat(e.target.value) }))}
                className="input"
                placeholder="Min"
                step="0.01"
              />
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseFloat(e.target.value) }))}
                className="input"
                placeholder="Max"
                step="0.01"
              />
            </div>
          </div>

          <div className="card space-y-4">
            <h3 className="font-bold">Type</h3>
            <div className="space-y-2">
              {types.map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                    className="w-5 h-5 rounded border-2 border-text"
                  />
                  <span className="capitalize">{type.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute top-3 left-3 text-text" size={20} />
              <input
                type="text"
                placeholder="Search marketplace..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input md:w-48"
            >
              <option value="trending">Trending</option>
              <option value="price_high">Price: High to Low</option>
              <option value="price_low">Price: Low to High</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredItems.map((item) => (
                <MarketCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Wallet size={48} className="mx-auto mb-4 text-secondary" />
              <h3 className="text-2xl font-bold mb-2">No items found</h3>
              <p className="text-lg">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
