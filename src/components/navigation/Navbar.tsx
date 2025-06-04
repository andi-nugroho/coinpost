import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWallet } from '../../context/WalletContext';
import { Zap, Compass, ShoppingBag, User, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { isConnected, address, connect, disconnect } = useWallet();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b-2 border-text">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Zap size={28} className="text-text" />
            <span className="text-2xl font-display font-bold">KREA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" active={isActive('/')}>Home</NavLink>
            <NavLink to="/explore" active={isActive('/explore')}>
              <Compass size={18} />
              Explore
            </NavLink>
            <NavLink to="/marketplace" active={isActive('/marketplace')}>
              <ShoppingBag size={18} />
              Marketplace
            </NavLink>
            <NavLink to="/profile" active={isActive('/profile')}>
              <User size={18} />
              Profile
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-full bg-primary border-2 border-text font-bold">
                  {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                </div>
                <button
                  onClick={disconnect}
                  className="btn btn-secondary text-text text-sm px-4 py-2"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <motion.button
                onClick={connect}
                className="btn btn-primary text-text"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect Wallet
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 font-bold text-lg px-4 py-2 rounded-full transition-all ${
        active ? 'bg-primary border-2 border-text' : 'hover:bg-primary-light'
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
