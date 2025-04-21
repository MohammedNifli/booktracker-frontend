import React, {useState } from 'react';
import { User,Search,Book } from 'lucide-react';
import  Modal from '../components/bookModal'
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate=useNavigate()

    const [open,setOpen]=useState(false)

    
    const handleButton=()=>{
        setOpen(true)
    }

    const handleDiv=()=>{

        navigate('/')


    }





    return (
    <>
         
      
      <header className="bg-white w-full text-gray-900 h-16 flex justify-between items-center px-6 shadow-md border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <Modal isOpen={open} onClose={() => setOpen(false)} />
        
        <div className="flex items-center cursor-pointer"
        onClick={handleDiv}
        >
          <img src="/booktracker.png" alt="BookTracker Logo" className="h-8 md:h-10" />
          <span className="ml-2 font-semibold text-lg text-blue-600 hidden sm:block">BookTracker</span>
        </div>
        
        {/* Search Bar - Hidden on mobile */}
        
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Navigation Link */}
          <a href="/explore" className="hidden sm:flex items-center text-gray-700 hover:text-blue-600 transition">
            <Book size={18} className="mr-1" />
            <span className="text-sm">Explore</span>
          </a>
          
          {/* Add New Book Button */}
          <button
          onClick={handleButton}
           className="bg-blue-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300 text-sm flex items-center">
            <span>Add Book</span>
          </button>
          
          {/* User Profile */}
          <div className="relative group">
            <button className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none transition duration-300 border border-gray-200">
              <User size={20} />
            </button>
            
            {/* Dropdown Menu (hidden by default) */}
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-10 border border-gray-100">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Nifli</p>
                <p className="text-xs text-gray-500">xyz@example.com</p>
              </div>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Books</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</a>
              <div className="border-t border-gray-100 mt-1"></div>
              <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Logout</a>
            </div>
          </div>
        </div>
      </header>

      </>
    );
  };
  

export default Header;