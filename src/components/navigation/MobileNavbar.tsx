import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '../../context/WalletContext';
import { Zap, Compass, ShoppingBag, User, Home, Plus } from 'lucide-react';

const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const { isConnected, connect } = useWallet();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-text">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Zap size={20} className="text-text" />
              <span className="text-lg font-display font-bold">KREA</span>
            </Link>

            {isConnected ? (
              <div className="px-3 py-1 rounded-full bg-primary border border-text text-sm">
                Connected
              </div>
            ) : (
              <motion.button
                onClick={connect}
                className="text-sm btn btn-primary text-text px-3 py-1"
                whileTap={{ scale: 0.95 }}
              >
                Connect
              </motion.button>
            )}
          </div>
        </div>
      </header>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-4 left-4 right-4 z-40">
        <div className="bg-white/95 backdrop-blur-sm border-2 border-text rounded-2xl shadow-[4px_4px_0px_0px_rgba(16,48,69,1)] overflow-hidden">
          <div className="flex items-center justify-around relative py-2">
            <NavLink to="/" active={isActive('/')} icon={<Home size={24} />} label="Home" />
            <NavLink to="/explore" active={isActive('/explore')} icon={<Compass size={24} />} label="Explore" />
            
            {/* Create Button */}
            <div className="relative -mt-8">
              <Link 
                to="/create"
                className="flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-secondary p-4 rounded-xl border-2 border-text shadow-[4px_4px_0px_0px_rgba(16,48,69,1)]"
                >
                  <Plus size={24} className="text-text" />
                </motion.div>
                <span className="text-[10px] font-medium mt-1">Create</span>
              </Link>
            </div>
            
            <NavLink to="/marketplace" active={isActive('/marketplace')} icon={<ShoppingBag size={24} />} label="Market" />
            <NavLink to="/profile" active={isActive('/profile')} icon={<User size={24} />} label="Profile" />
          </div>
        </div>
      </nav>

      {/* Content Padding */}
      <div className="h-[48px]" /> {/* Top spacing */}
      <div className="h-[80px]" /> {/* Bottom spacing */}
    </>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, icon, label }) => {
  return (
    <Link
      to={to}
      className="relative flex flex-col items-center py-1 px-4"
    >
      <motion.div
        whileTap={{ scale: 0.95 }}
        className={`p-2 rounded-xl transition-colors relative ${
          active ? 'text-text' : 'text-text/60'
        }`}
      >
        {active && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-primary rounded-xl border border-text"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">{icon}</span>
      </motion.div>
      <span className={`text-[10px] font-medium mt-1 transition-colors ${
        active ? 'text-text' : 'text-text/60'
      }`}>
        {label}
      </span>
    </Link>
  );
};

export default MobileNavbar;
