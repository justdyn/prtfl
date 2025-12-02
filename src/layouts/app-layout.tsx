import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;

