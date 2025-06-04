import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, ShoppingCart, Play, Pause, Volume2, VolumeX, X, ChevronLeft, Users } from 'lucide-react';
import { CONTENT, CREATORS } from '../data/mockData';
import PriceChart from '../components/charts/PriceChart';
import { useAlert } from '../context/AlertContext';
import { useWallet } from '../context/WalletContext';

const ContentDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showAlert } = useAlert();
  const { isConnected, connect } = useWallet();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const content = CONTENT.find(c => c.id === id);
  const creator = content ? CREATORS.find(c => c.id === content.creatorId) : null;

  if (!content || !creator) {
    return <div>Content not found</div>;
  }

  // Mock price history data
  const priceHistory = Array.from({ length: 30 }, (_, i) => ({
    time: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: content.price * (1 + Math.sin(i / 5) * 0.2),
  }));

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    showAlert('success', isPlaying ? 'Paused' : 'Playing');
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    showAlert('success', isMuted ? 'Unmuted' : 'Muted');
  };

  const handleTransaction = async (type: 'buy' | 'sell') => {
    if (!isConnected) {
      showAlert('error', 'Please connect your wallet first');
      connect();
      return;
    }
    
    setIsProcessing(true);
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      showAlert('success', `Successfully ${type === 'buy' ? 'purchased' : 'sold'} ${quantity} ${content.type.toUpperCase()}(s)`);
      type === 'buy' ? setShowBuyModal(false) : setShowSellModal(false);
    } catch (error) {
      showAlert('error', 'Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const TransactionModal = ({ type }: { type: 'buy' | 'sell' }) => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-primary-light rounded-xl border-2 border-text">
        <img
          src={content.image}
          alt={content.title}
          className="w-16 h-16 rounded-lg border-2 border-text"
        />
        <div>
          <p className="font-bold">{content.type.toUpperCase()}</p>
          <p className="text-sm">by @{creator.username}</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block font-bold">Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          className="input"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between font-bold">
          <span>Price per unit</span>
          <span>{content.price.toFixed(3)} ETH</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>{(content.price * quantity).toFixed(3)} ETH</span>
        </div>
      </div>

      <button
        onClick={() => handleTransaction(type)}
        disabled={isProcessing}
        className={`w-full btn ${type === 'buy' ? 'btn-primary' : 'btn-secondary'} text-text relative`}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center">
            <motion.div
              className="w-5 h-5 border-2 border-text border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span className="ml-2">Processing...</span>
          </span>
        ) : (
          `Confirm ${type === 'buy' ? 'Purchase' : 'Sale'}`
        )}
      </button>
    </div>
  );

  const renderContent = () => {
    if (!content || !content.type) return null;

    switch (content.type) {
      case 'video':
        return (
          <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-text">
            <video
              src={content.image}
              poster={content.image}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4">
              <button
                onClick={handlePlay}
                className="p-3 rounded-full bg-white/90 border-2 border-text"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <div className="flex-grow h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-white" />
              </div>
              <button
                onClick={handleMute}
                className="p-3 rounded-full bg-white/90 border-2 border-text"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="relative rounded-xl overflow-hidden border-2 border-text bg-primary/20 p-6">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePlay}
                className="p-4 rounded-full bg-white border-2 border-text"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <div className="flex-grow space-y-2">
                <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-primary" />
                </div>
                <div className="flex justify-between text-sm">
                  <span>1:23</span>
                  <span>3:45</span>
                </div>
              </div>
              <button
                onClick={handleMute}
                className="p-4 rounded-full bg-white border-2 border-text"
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            </div>
          </div>
        );
      default:
        return (
          <img
            src={content.image}
            alt={content.title}
            className="w-full rounded-xl border-2 border-text"
          />
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-text hover:bg-primary-light transition-colors"
      >
        <ChevronLeft size={20} />
        <span>Back</span>
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {renderContent()}
          
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">{content.title}</h1>
            <p className="text-lg">{content.description}</p>
            
            <div className="flex items-center gap-4">
              <Link to={`/creator/${creator.id}`} className="flex items-center gap-2">
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-10 h-10 rounded-full border-2 border-text"
                />
                <div>
                  <p className="font-bold">{creator.name}</p>
                  <p className="text-sm">@{creator.username}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="md:w-80 space-y-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Price History</h2>
            <PriceChart data={priceHistory} height={200} />
            <div className="mt-4 space-y-4">
              <div className="flex justify-between">
                <span>Current Price</span>
                <span className="font-bold">{content.price} ETH</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowBuyModal(true)}
                  className="flex-1 btn btn-primary text-text"
                >
                  <ShoppingCart className="inline-block mr-2" size={20} />
                  Buy
                </button>
                <button
                  onClick={() => setShowSellModal(true)}
                  className="flex-1 btn btn-secondary text-text"
                >
                  Sell
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Likes</span>
                <span className="font-bold">{content.likes}</span>
              </div>
              <div className="flex justify-between">
                <span>Comments</span>
                <span className="font-bold">{content.comments}</span>
              </div>
              <div className="flex justify-between">
                <span>Created</span>
                <span className="font-bold">
                  {new Date(content.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Token Holders</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((holder) => (
            <div key={holder} className="flex items-center justify-between p-4 rounded-xl border-2 border-text bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-light border-2 border-text flex items-center justify-center">
                  <Users size={20} />
                </div>
                <div>
                  <p className="font-bold">Holder #{holder}</p>
                  <p className="text-sm opacity-70">0x1234...5678</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">1,000 Tokens</p>
                <p className="text-sm opacity-70">10% of supply</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {(showBuyModal || showSellModal) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-text/20 backdrop-blur-sm"
              onClick={() => {
                setShowBuyModal(false);
                setShowSellModal(false);
              }}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-3xl border-2 border-text p-6 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(16,48,69,1)]"
            >
              <button
                onClick={() => {
                  setShowBuyModal(false);
                  setShowSellModal(false);
                }}
                className="absolute top-4 right-4"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-bold mb-6">
                {showBuyModal ? 'Buy' : 'Sell'} {content.title}
              </h3>
              
              <TransactionModal type={showBuyModal ? 'buy' : 'sell'} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentDetailsPage;
