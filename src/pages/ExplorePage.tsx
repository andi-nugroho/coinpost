import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Zap, TrendingUp, Users } from 'lucide-react';
import CreatorCard from '../components/creator/CreatorCard';
import { CREATORS } from '../data/mockData';
import { useContentActions } from '../hooks/useContentActions';

const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('trending');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Art', 'Music', 'Writing', 'Gaming', 'Photography'];
  const sortOptions = [
    { value: 'trending', label: 'Trending' },
    { value: 'followers', label: 'Most Followers' },
    { value: 'price_high', label: 'Token Price: High to Low' },
    { value: 'price_low', label: 'Token Price: Low to High' },
  ];

  const filteredCreators = CREATORS.filter(creator => {
    if (activeCategory !== 'All' && creator.category !== activeCategory) {
      return false;
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        creator.name.toLowerCase().includes(searchLower) ||
        creator.username.toLowerCase().includes(searchLower) ||
        creator.bio.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'followers':
        return b.followers - a.followers;
      case 'price_high':
        return b.tokenPrice - a.tokenPrice;
      case 'price_low':
        return a.tokenPrice - b.tokenPrice;
      default: // trending
        return b.tokenChange - a.tokenChange;
    }
  });

  // Stats for the explore page
  const stats = [
    {
      label: 'Total Creators',
      value: CREATORS.length,
      icon: <Users size={20} />,
    },
    {
      label: 'Trading Volume',
      value: '$2.5M',
      icon: <TrendingUp size={20} />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Explore Creators</h1>
          <p className="text-lg opacity-70">Discover and support amazing creators</p>
        </div>
        <div className="flex gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-text">
              {stat.icon}
              <div>
                <p className="text-sm opacity-70">{stat.label}</p>
                <p className="font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute top-3 left-3 text-text" size={20} />
          <input
            type="text"
            placeholder="Search creators by name, username, or bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input md:w-48"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-full bg-white border-2 border-text"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <motion.div
        initial={false}
        animate={{ height: showFilters ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="flex flex-wrap gap-2 py-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full border-2 border-text font-bold transition-all ${
                activeCategory === category
                  ? 'bg-primary shadow-[4px_4px_0px_0px_rgba(16,48,69,1)]'
                  : 'bg-white hover:bg-primary-light'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Results */}
      {filteredCreators.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Zap size={48} className="mx-auto mb-4 text-secondary" />
          <h3 className="text-2xl font-bold mb-2">No creators found</h3>
          <p className="text-lg">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};

export default ExplorePage;
