import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, CreditCard, Clock, Settings, User, ShoppingBag, Heart, TrendingUp, TrendingDown, Plus, X, Loader, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { useAlert } from '../context/AlertContext';
import MarketCard from '../components/marketplace/MarketCard';
import { CONTENT } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { isConnected, address, balance, connect } = useWallet();
  const { showAlert } = useAlert();
  const [activeTab, setActiveTab] = useState('collected');
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [fundAmount, setFundAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const tabs = [
    { id: 'collected', label: 'Collected', icon: <ShoppingBag size={18} /> },
    { id: 'created', label: 'Created', icon: <User size={18} /> },
    { id: 'favorite', label: 'Favorite', icon: <Heart size={18} /> },
    { id: 'activity', label: 'Activity', icon: <Clock size={18} /> },
  ];

  const collectibles = CONTENT.slice(0, 4);
  const created = CONTENT.slice(4, 6);
  const favorites = CONTENT.slice(6, 10);

  const stats = [
    { label: 'Total Value', value: '12.5 ETH', change: '+15.2%' },
    { label: 'Items Owned', value: '28', change: '+3' },
    { label: 'Creators Backed', value: '12', change: '+2' },
  ];

  const handleAddFunds = async () => {
    if (!fundAmount || parseFloat(fundAmount) <= 0) {
      showAlert('error', 'Please enter a valid amount');
      return;
    }

    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      showAlert('success', `Successfully added ${fundAmount} ETH to your wallet`);
      setShowAddFundsModal(false);
      setFundAmount('');
    } catch (error) {
      showAlert('error', 'Failed to add funds. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      showAlert('success', 'Settings saved successfully');
      setShowSettingsModal(false);
    } catch (error) {
      showAlert('error', 'Failed to save settings. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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
        <h1 className="text-3xl font-bold text-center">Connect Your Wallet</h1>
        <p className="text-center max-w-md">
          Connect your wallet to view your profile, collections, and activities.
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
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-32 md:h-48 bg-gradient-to-r from-primary via-secondary to-accent rounded-3xl border-2 border-text"></div>
        <div className="absolute -bottom-16 left-8 w-32 h-32 rounded-full border-4 border-text bg-white shadow-[4px_4px_0px_0px_rgba(16,48,69,1)]">
          <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
            <User size={48} className="text-text" />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-20 md:pt-8 md:pl-44 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{address?.substring(0, 6)}...{address?.substring(address.length - 4)}</h1>
          <p className="text-sm opacity-70">Joined March 2025</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAddFundsModal(true)}
            className="btn btn-primary text-text flex items-center gap-2"
          >
            <CreditCard size={18} />
            Add Funds
          </button>
          <button 
            onClick={() => setShowSettingsModal(true)}
            className="p-2 rounded-full bg-white border-2 border-text"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-70">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className="flex items-center gap-1 text-success">
                <TrendingUp size={16} />
                <span className="text-sm font-bold">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b-2 border-text">
        <div className="flex overflow-x-auto space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-bold border-b-4 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-text'
                  : 'border-transparent text-text/70 hover:text-text'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[50vh]">
        {activeTab === 'collected' && (
          <>
            {collectibles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {collectibles.map((item) => (
                  <MarketCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<ShoppingBag size={48} />}
                title="No collectibles yet"
                description="Start collecting from your favorite creators"
                action={{ label: 'Explore Marketplace', href: '/marketplace' }}
              />
            )}
          </>
        )}

        {activeTab === 'created' && (
          <>
            {created.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Your Content</h2>
                  <button 
                    onClick={() => navigate('/create')}
                    className="btn btn-primary text-text flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Create New
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {created.map((item) => (
                    <MarketCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState
                icon={<User size={48} />}
                title="No creations yet"
                description="Start creating and tokenizing your content"
                action={{ label: 'Create Content', href: '/create' }}
              />
            )}
          </>
        )}

        {activeTab === 'favorite' && (
          <>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.map((item) => (
                  <MarketCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<Heart size={48} />}
                title="No favorites yet"
                description="Like content to add it to your favorites"
              />
            )}
          </>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                <div className="space-y-4">
                  <ActivityItem
                    title="Purchased NFT"
                    description="You purchased 'Digital Dreamscape' for 0.5 ETH"
                    time="2 hours ago"
                    type="purchase"
                  />
                  <ActivityItem
                    title="Sold Token"
                    description="You sold 50 $ARTIST tokens"
                    time="1 day ago"
                    type="sale"
                  />
                  <ActivityItem
                    title="Token Trade"
                    description="You bought 100 $CREATOR tokens"
                    time="3 days ago"
                    type="purchase"
                  />
                </div>
              </div>

              <div className="card">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <ActivityItem
                    title="New Follower"
                    description="@creator123 started following you"
                    time="5 hours ago"
                    type="social"
                  />
                  <ActivityItem
                    title="Content Liked"
                    description="Your NFT was liked by @collector456"
                    time="1 day ago"
                    type="social"
                  />
                  <ActivityItem
                    title="Comment Received"
                    description="New comment on your latest creation"
                    time="2 days ago"
                    type="social"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Funds Modal */}
      {showAddFundsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-text/20 backdrop-blur-sm" onClick={() => !isProcessing && setShowAddFundsModal(false)} />
          <div className="relative bg-white rounded-3xl border-2 border-text p-6 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(16,48,69,1)]">
            <button
              onClick={() => !isProcessing && setShowAddFundsModal(false)}
              className="absolute top-4 right-4"
              disabled={isProcessing}
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-6">Add Funds</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block font-bold mb-2">Amount (ETH)</label>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  className="input"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  disabled={isProcessing}
                />
              </div>

              <div className="flex gap-2">
                {[0.1, 0.5, 1, 5].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setFundAmount(amount.toString())}
                    className="flex-1 p-2 rounded-xl border-2 border-text font-bold hover:bg-primary-light"
                    disabled={isProcessing}
                  >
                    {amount} ETH
                  </button>
                ))}
              </div>

              <button
                onClick={handleAddFunds}
                className="w-full btn btn-primary text-text relative"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader size={20} />
                    </motion.div>
                    Processing...
                  </span>
                ) : (
                  'Add Funds'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-text/20 backdrop-blur-sm" onClick={() => !isProcessing && setShowSettingsModal(false)} />
          <div className="relative bg-white rounded-3xl border-2 border-text p-6 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(16,48,69,1)]">
            <button
              onClick={() => !isProcessing && setShowSettingsModal(false)}
              className="absolute top-4 right-4"
              disabled={isProcessing}
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-6">Settings</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block font-bold mb-2">Display Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter display name"
                  disabled={isProcessing}
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Bio</label>
                <textarea
                  className="input min-h-[100px]"
                  placeholder="Tell others about yourself"
                  disabled={isProcessing}
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Email Notifications</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-2 border-text"
                      disabled={isProcessing}
                    />
                    <span>Trading activity</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-2 border-text"
                      disabled={isProcessing}
                    />
                    <span>New followers</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-2 border-text"
                      disabled={isProcessing}
                    />
                    <span>Price alerts</span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                className="w-full btn btn-primary text-text"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader size={20} />
                    </motion.div>
                    Saving...
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
  return (
    <div className="text-center py-16">
      <div className="inline-block p-4 rounded-full bg-primary-light border-2 border-text mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-lg mb-6">{description}</p>
      {action && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary text-text"
          onClick={() => window.location.href = action.href}
        >
          {action.label}
        </motion.button>
      )}
    </div>
  );
};

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  type: 'purchase' | 'sale' | 'social';
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, time, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'purchase':
        return <TrendingUp size={16} className="text-success" />;
      case 'sale':
        return <TrendingDown size={16} className="text-error" />;
      case 'social':
        return <User size={16} className="text-primary" />;
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-text bg-white hover:bg-primary-light transition-colors">
      <div className="p-2 rounded-full bg-white border-2 border-text">
        {getIcon()}
      </div>
      <div className="flex-grow">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      <div className="text-sm opacity-70">{time}</div>
    </div>
  );
};

export default ProfilePage;
