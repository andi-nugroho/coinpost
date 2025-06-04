import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Users, TrendingUp, DollarSign, CircleEllipsis, Heart, MessageCircle, Share2, ChevronDown, ChevronLeft } from 'lucide-react';
import ContentCard from '../components/content/ContentCard';
import PriceChart from '../components/charts/PriceChart';
import { CREATORS, CONTENT } from '../data/mockData';
import { useWallet } from '../context/WalletContext';
import { useAlert } from '../context/AlertContext';
import { useContentActions } from '../hooks/useContentActions';
import { useTransaction } from '../hooks/useTransaction';

const CreatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { isConnected, connect } = useWallet();
  const { showAlert } = useAlert();
  const { executeTransaction, isProcessing } = useTransaction();
  const [activeTab, setActiveTab] = useState('content');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [tokenAmount, setTokenAmount] = useState(1);

  // Find creator by id
  const creator = CREATORS.find(c => c.id === id);
  
  // Get content by creator
  const creatorContent = CONTENT.filter(content => content.creatorId === id);

  // Mock price history data
  const priceHistory = Array.from({ length: 30 }, (_, i) => ({
    time: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: creator ? creator.tokenPrice * (1 + Math.sin(i / 5) * 0.2) : 0,
  }));

  if (!creator) {
    return <div className="text-center py-16">Creator not found</div>;
  }

  const tabs = [
    { id: 'content', label: 'Content' },
    { id: 'tokens', label: 'Tokens' },
    { id: 'about', label: 'About' },
  ];

  const handleSubscribe = async () => {
    if (!isConnected) {
      showAlert('error', 'Please connect your wallet first');
      connect();
      return;
    }

    try {
      setIsSubscribed(!isSubscribed);
      showAlert('success', isSubscribed ? 'Unsubscribed successfully' : 'Subscribed successfully');
    } catch (error) {
      showAlert('error', 'Failed to update subscription');
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${creator.name} on TokenizeMe`,
        text: creator.bio,
        url: window.location.href,
      });
      showAlert('success', 'Shared successfully');
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        showAlert('error', 'Failed to share');
      }
    }
  };

  const handleTokenTransaction = async (type: 'buy' | 'sell') => {
    const success = await executeTransaction(type, {
      quantity: tokenAmount,
      price: creator.tokenPrice,
      title: `${creator.username.toUpperCase()} tokens`,
    });

    if (success) {
      setShowTokenModal(false);
      setTokenAmount(1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-text hover:bg-primary-light transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>

      {/* Creator Banner */}
      <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden border-2 border-text shadow-[8px_8px_0px_0px_rgba(16,48,69,1)]">
        <img
          src={creator.bannerImage}
          alt={`${creator.name}'s banner`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Creator Info */}
      <div className="relative -mt-16 md:-mt-20 px-4 md:px-8 pb-6">
        <div className="flex flex-col md:flex-row gap-6 md:items-end">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-text bg-white object-cover shadow-[4px_4px_0px_0px_rgba(16,48,69,1)]"
          />

          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
                  {creator.name}
                  {creator.verified && (
                    <Sparkles size={24} className="text-accent" />
                  )}
                </h1>
                <p className="text-lg opacity-80">@{creator.username}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubscribe}
                  className={`btn ${isSubscribed ? 'bg-secondary' : 'btn-primary'} text-text px-6 py-2`}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white border-2 border-text"
                >
                  <Share2 size={20} />
                </button>
                <button className="p-2 rounded-full bg-white border-2 border-text">
                  <CircleEllipsis size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span className="font-bold">{creator.followers.toLocaleString()}</span> followers
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={18} />
                <span className="font-bold">${creator.tokenPrice.toFixed(2)}</span> token price
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={18} />
                <span className="font-bold">${creator.marketCap.toLocaleString()}</span> market cap
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b-2 border-text">
        <div className="flex overflow-x-auto space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-bold border-b-4 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-text'
                  : 'border-transparent text-text/70 hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[50vh]">
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorContent.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        )}

        {activeTab === 'tokens' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Creator Token</h2>
              <div className="space-y-4">
                <div className="flex justify-between p-4 border-2 border-text rounded-xl bg-white">
                  <div>
                    <h3 className="font-bold">{creator.name} Creator Token</h3>
                    <p>Total Supply: 1,000,000 ${creator.username.toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${creator.tokenPrice.toFixed(2)}</div>
                    <div className={`text-sm ${creator.tokenChange >= 0 ? 'text-success' : 'text-error'}`}>
                      {creator.tokenChange >= 0 ? '+' : ''}{creator.tokenChange}% today
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    onClick={() => setShowTokenModal(true)}
                    className="btn btn-primary text-text w-[48%]"
                    disabled={isProcessing}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setShowTokenModal(true)}
                    className="btn btn-secondary text-text w-[48%]"
                    disabled={isProcessing}
                  >
                    Sell
                  </button>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Price History</h2>
              <PriceChart data={priceHistory} height={200} />
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">About {creator.name}</h2>
            <p className="mb-6">{creator.bio}</p>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Links</h3>
              <div className="flex flex-wrap gap-3">
                {creator.links?.map((link, index) => (
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-primary-light rounded-full border-2 border-text font-bold hover:bg-primary transition-colors"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Token Transaction Modal */}
      {showTokenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-text/20 backdrop-blur-sm"
            onClick={() => setShowTokenModal(false)}
          />
          <div className="relative bg-white rounded-3xl border-2 border-text p-6 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(16,48,69,1)]">
            <button
              onClick={() => setShowTokenModal(false)}
              className="absolute top-4 right-4"
            >
              <ChevronDown size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-6">
              Trade {creator.username.toUpperCase()} Tokens
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Amount</label>
                <input
                  type="number"
                  min="1"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(Math.max(1, parseInt(e.target.value)))}
                  className="input"
                />
              </div>

              <div className="flex justify-between font-bold">
                <span>Price per token</span>
                <span>${creator.tokenPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(creator.tokenPrice * tokenAmount).toFixed(2)}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleTokenTransaction('buy')}
                  className="flex-1 btn btn-primary text-text"
                  disabled={isProcessing}
                >
                  Buy
                </button>
                <button
                  onClick={() => handleTokenTransaction('sell')}
                  className="flex-1 btn btn-secondary text-text"
                  disabled={isProcessing}
                >
                  Sell
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatorPage;
