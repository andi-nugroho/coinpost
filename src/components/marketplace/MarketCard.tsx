import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Share2, X, TrendingUp } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { useAlert } from '../../context/AlertContext';
import { useNavigate } from 'react-router-dom';

interface MarketItem {
  id: string;
  title: string;
  image: string;
  description: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorUsername: string;
  createdAt: string;
  likes: number;
  comments: number;
  price: number;
  type: string;
}

interface MarketCardProps {
  item: MarketItem;
}

const MarketCard: React.FC<MarketCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const { showAlert } = useAlert();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isConnected) {
      showAlert('error', 'Please connect your wallet first');
      return;
    }
    if (liked) {
      setLikes(likes - 1);
      showAlert('success', 'Removed from favorites');
    } else {
      setLikes(likes + 1);
      showAlert('success', 'Added to favorites');
    }
    setLiked(!liked);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      });
      showAlert('success', 'Shared successfully');
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const handlePurchase = async () => {
    if (!isConnected) {
      showAlert('error', 'Please connect your wallet first');
      return;
    }
    
    setIsProcessing(true);
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      showAlert('success', `Successfully purchased ${quantity} ${item.type.toUpperCase()}(s)`);
      setShowBuyModal(false);
    } catch (error) {
      showAlert('error', 'Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/content/${item.id}`);
  };

  return (
    <>
      <motion.div
        className="card hover:translate-y-[-5px] transition-transform duration-300 cursor-pointer"
        whileHover={{ y: -5 }}
        onClick={handleCardClick}
      >
        <div className="relative mb-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-full aspect-square object-cover rounded-xl border-2 border-text"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-bold border-2 border-text">
            {item.type.toUpperCase()}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-lg line-clamp-1">{item.title}</h3>
          
          <div className="flex items-center gap-2">
            <img 
              src={item.creatorAvatar} 
              alt={item.creatorName}
              className="w-6 h-6 rounded-full border border-text"
              loading="lazy"
            />
            <span className="text-sm">@{item.creatorUsername}</span>
          </div>
          
          <div className="flex justify-between items-center pt-3 border-t border-text">
            <div className="font-bold">
              {item.price.toFixed(3)} ETH
              <span className="ml-2 text-sm text-success flex items-center gap-1">
                <TrendingUp size={14} />
                +12.5%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleLike}
                className="p-2 rounded-full bg-white border-2 border-text"
              >
                <Heart 
                  size={16} 
                  className={liked ? 'fill-error text-error' : 'text-text'} 
                />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white border-2 border-text"
              >
                <Share2 size={16} />
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!isConnected) {
                    showAlert('error', 'Please connect your wallet first');
                    return;
                  }
                  setShowBuyModal(true);
                }}
                className="p-2 rounded-full bg-primary border-2 border-text"
              >
                <ShoppingCart size={16} className="text-text" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showBuyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-text/20 backdrop-blur-sm"
              onClick={() => setShowBuyModal(false)}
            />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-3xl border-2 border-text p-6 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(16,48,69,1)]"
            >
              <button
                onClick={() => setShowBuyModal(false)}
                className="absolute top-4 right-4"
              >
                <X size={24} />
              </button>

              <h3 className="text-2xl font-bold mb-4">Buy {item.title}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-primary-light rounded-xl border-2 border-text">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg border-2 border-text"
                  />
                  <div>
                    <p className="font-bold">{item.type.toUpperCase()}</p>
                    <p className="text-sm">by @{item.creatorUsername}</p>
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
                    <span>{item.price.toFixed(3)} ETH</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{(item.price * quantity).toFixed(3)} ETH</span>
                  </div>
                </div>

                <button
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  className="w-full btn btn-primary text-text relative"
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
                    'Confirm Purchase'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MarketCard;
