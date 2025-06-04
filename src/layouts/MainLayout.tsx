import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import MobileNavbar from '../components/navigation/MobileNavbar';
import Footer from '../components/navigation/Footer';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col min-h-screen bg-background">
        {isMobile ? <MobileNavbar /> : <Navbar />}
        
        <main className="flex-grow main-content">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="container mx-auto px-3 md:px-4 py-4 md:py-8 content-safe-area"
          >
            <Outlet />
          </motion.div>
        </main>

        {!isMobile && <Footer />}
      </div>
    </LazyMotion>
  );
};

export default MainLayout
