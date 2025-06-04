import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from '../../context/AlertContext';

interface Content {
  id: string;
  title: string;
  image: string;
  description: string;
  creatorId: string;
  createdAt: string;
  likes: number;
  comments: number;
  price: number;
  type: string;
  isSubscriberOnly: boolean;
}

interface ContentCardProps {
  content: Content;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(content.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
        title: content.title,
        text: content.description,
        url: window.location.href,
      });
      showAlert('success', 'Shared successfully');
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const handleCardClick = () => {
    navigate(`/content/${content.id}`);
  };

  return (
    <motion.div
      className="card hover:translate-y-[-5px] transition-transform duration-300 cursor-pointer"
      whileHover={{ y: -5 }}
      onClick={handleCardClick}
    >
      <div className="relative mb-4">
        <img
          src={content.image}
          alt={content.title}
          className="w-full aspect-video object-cover rounded-xl border-2 border-text"
        />
        {content.isSubscriberOnly && (
          <div className="absolute top-2 right-2 bg-secondary rounded-full p-2 border-2 border-text">
            <Lock size={16} className="text-text" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-lg">{content.title}</h3>
        <p className="text-sm line-clamp-2">{content.description}</p>
        
        <div className="flex justify-between items-center pt-3 border-t border-text">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className="flex items-center gap-1"
            >
              <Heart 
                size={16} 
                className={liked ? 'fill-error text-error' : 'text-text'} 
              />
              <span className="text-sm">{likes}</span>
            </button>
            <button className="flex items-center gap-1">
              <MessageCircle size={16} />
              <span className="text-sm">{content.comments}</span>
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center gap-1"
            >
              <Share2 size={16} />
            </button>
          </div>
          <div className="font-bold text-sm">
            ${content.price.toFixed(2)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCard;
