import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Users } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  tokenPrice: number;
  tokenChange: number;
  verified: boolean;
  category: string;
}

interface CreatorCardProps {
  creator: Creator;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator }) => {
  return (
    <motion.div
      className="card hover:translate-y-[-5px] transition-transform duration-300"
      whileHover={{ y: -5 }}
    >
      <Link to={`/creator/${creator.id}`} className="block">
        <div className="relative mb-4">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-full aspect-square object-cover rounded-xl border-2 border-text"
          />
          {creator.verified && (
            <div className="absolute top-2 right-2 bg-accent rounded-full p-1 border-2 border-text">
              <Sparkles size={16} className="text-text" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">{creator.name}</h3>
            <span className="px-2 py-1 rounded-full bg-primary-light text-xs font-bold border border-text">
              {creator.category}
            </span>
          </div>
          
          <p className="text-sm opacity-70">@{creator.username}</p>
          
          <div className="flex justify-between items-center pt-2 border-t border-text">
            <div className="flex items-center gap-1">
              <Users size={14} />
              <span className="text-sm">{creator.followers.toLocaleString()}</span>
            </div>
            <div className="font-bold text-sm">
              ${creator.tokenPrice.toFixed(2)}
              <span className={`ml-1 ${creator.tokenChange >= 0 ? 'text-success' : 'text-error'}`}>
                {creator.tokenChange >= 0 ? '+' : ''}{creator.tokenChange}%
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CreatorCard;
