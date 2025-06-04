import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Sparkles, TrendingUp, Users, Shield, Coins, Rocket, Gift } from 'lucide-react';
import CreatorCard from '../components/creator/CreatorCard';
import { FEATURED_CREATORS } from '../data/mockData';

const HomePage: React.FC = () => {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-br from-primary-light via-background to-secondary/20 rounded-3xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-8 md:py-16 px-4 md:px-8 rounded-3xl border-2 border-text shadow-[8px_8px_0px_0px_rgba(16,48,69,1)]">
          <div className="space-y-6">
            <motion.h1 
              className="text-4xl md:text-6xl font-display font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Turn Your Content
              <br />
              <span className="text-shadow bg-primary text-text">
                Into Capital
              </span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Tokenize your content, build your community, and monetize your creativity. The web3 platform for creators and their fans.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/explore" className="btn btn-primary text-text">Start Exploring</Link>
              <Link to="/create" className="btn btn-secondary text-text">Become a Creator</Link>
            </motion.div>
          </div>
          
          {!isMobile && (
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="aspect-square rounded-2xl border-2 border-text overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg" 
                    alt="Digital Art"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square rounded-2xl border-2 border-text overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/7130537/pexels-photo-7130537.jpeg" 
                    alt="Music"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 pt-8"
              >
                <div className="aspect-square rounded-2xl border-2 border-text overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg" 
                    alt="Photography"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="aspect-square rounded-2xl border-2 border-text overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/7130498/pexels-photo-7130498.jpeg" 
                    alt="Writing"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          className="card p-4 md:p-6"
          whileHover={{ y: -5 }}
        >
          <div className="flex flex-col items-center text-center">
            <Users className="w-8 h-8 mb-2 text-primary" />
            <div className="text-xl md:text-3xl font-bold">10,000+</div>
            <div className="text-sm">Creators</div>
          </div>
        </motion.div>
        <motion.div 
          className="card p-4 md:p-6"
          whileHover={{ y: -5 }}
        >
          <div className="flex flex-col items-center text-center">
            <Gift className="w-8 h-8 mb-2 text-secondary" />
            <div className="text-xl md:text-3xl font-bold">50,000+</div>
            <div className="text-sm">Content</div>
          </div>
        </motion.div>
        <motion.div 
          className="card p-4 md:p-6"
          whileHover={{ y: -5 }}
        >
          <div className="flex flex-col items-center text-center">
            <Coins className="w-8 h-8 mb-2 text-accent" />
            <div className="text-xl md:text-3xl font-bold">$2M+</div>
            <div className="text-sm">Volume</div>
          </div>
        </motion.div>
        <motion.div 
          className="card p-4 md:p-6"
          whileHover={{ y: -5 }}
        >
          <div className="flex flex-col items-center text-center">
            <Rocket className="w-8 h-8 mb-2 text-success" />
            <div className="text-xl md:text-3xl font-bold">100,000+</div>
            <div className="text-sm">Users</div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg max-w-2xl mx-auto">A new way for creators to connect with fans and monetize content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap size={32} className="text-text" />}
            title="Tokenize Your Content"
            description="Turn your creative works into NFTs and tokens that can be bought, sold, and traded by your fans."
          />
          <FeatureCard 
            icon={<TrendingUp size={32} className="text-text" />}
            title="Grow Your Value"
            description="As your popularity grows, so does the value of your tokens. Early supporters benefit from your success."
          />
          <FeatureCard 
            icon={<Users size={32} className="text-text" />}
            title="Build Community"
            description="Create exclusive content for token holders and foster a community that supports your work."
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Benefits for Creators</h2>
          <div className="space-y-4">
            <BenefitItem
              title="Direct Monetization"
              description="Earn directly from your content without intermediaries"
            />
            <BenefitItem
              title="Community Ownership"
              description="Give your fans a stake in your success"
            />
            <BenefitItem
              title="Creative Freedom"
              description="Focus on creating while we handle the technology"
            />
          </div>
        </div>
        
        <div className="space-y-8">
          <h2 className="text-3xl font-bold">Benefits for Fans</h2>
          <div className="space-y-4">
            <BenefitItem
              title="Early Access"
              description="Get exclusive access to new content and features"
            />
            <BenefitItem
              title="Value Growth"
              description="Benefit from creator's success as token holder"
            />
            <BenefitItem
              title="Direct Support"
              description="Support creators you love in a meaningful way"
            />
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Creators</h2>
          <Link to="/explore" className="text-text font-bold underline">View All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_CREATORS.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </section>

      {/* Security Section */}
      <section className="bg-primary-light rounded-3xl border-2 border-text p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 space-y-6">
            <Shield size={48} className="text-text" />
            <h2 className="text-3xl font-bold">Secure & Transparent</h2>
            <p className="text-lg">
              Your content and tokens are secured by blockchain technology. Every transaction is transparent and verifiable.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Sparkles size={20} className="text-accent" />
                <span>Smart contract audited</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles size={20} className="text-accent" />
                <span>Multi-signature wallets</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles size={20} className="text-accent" />
                <span>Regular security updates</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg"
              alt="Security"
              className="w-full rounded-xl border-2 border-text"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 px-4 bg-secondary rounded-3xl border-2 border-text shadow-[8px_8px_0px_0px_rgba(16,48,69,1)]">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Tokenize Your Content?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of creators who are already turning their content into capital
        </p>
        <Link to="/create" className="btn btn-primary text-text">Get Started</Link>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="card hover:translate-y-[-5px] transition-transform duration-300"
      whileHover={{ y: -5 }}
    >
      <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mb-4 border-2 border-text">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

interface BenefitItemProps {
  title: string;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ title, description }) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl border-2 border-text bg-white">
      <div className="bg-primary-light rounded-full p-2 border-2 border-text">
        <Sparkles size={20} className="text-text" />
      </div>
      <div>
        <h3 className="font-bold mb-1">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default HomePage;
