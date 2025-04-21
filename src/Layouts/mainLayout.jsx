// src/layouts/MainLayout.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddBookModal from '../components/bookModal';
import { useLocation } from 'react-router-dom';
const MainLayout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location=useLocation();
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const showFooter=location.pathname==='/'
  return (
    <div className="flex flex-col min-h-screen">
     
      <AddBookModal isOpen={isModalOpen} onClose={closeModal} />
     
      <Header openModal={openModal} />
      
     
      <main className="flex-grow pt-16">
        {children}
      </main>
      

      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;