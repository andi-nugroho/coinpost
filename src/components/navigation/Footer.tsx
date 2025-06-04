import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-dark border-t-2 border-text py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Zap size={24} className="text-text" />
              <span className="text-xl font-display font-bold">KREA</span>
            </Link>
            <p className="text-text mb-4">
              Turn your content into tradeable tokens. A platform for creators to tokenize and monetize their content.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-text hover:text-primary">
                <Github size={20} />
              </a>
              <a href="#" className="text-text hover:text-primary">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-text hover:text-primary">Explore</Link></li>
              <li><Link to="/marketplace" className="text-text hover:text-primary">Marketplace</Link></li>
              <li><Link to="/create" className="text-text hover:text-primary">Create</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-text hover:text-primary">Blog</a></li>
              <li><a href="#" className="text-text hover:text-primary">Documentation</a></li>
              <li><a href="#" className="text-text hover:text-primary">Help Center</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-text hover:text-primary">About</a></li>
              <li><a href="#" className="text-text hover:text-primary">Careers</a></li>
              <li><a href="#" className="text-text hover:text-primary">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-text">
          <p className="text-center text-text">
            &copy; {new Date().getFullYear()} KREA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
