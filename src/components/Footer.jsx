import React from 'react';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <div className="flex items-center">
              <img src="/booktracker.png" alt="BookTracker Logo" className="h-6 mr-2" />
              <span className="font-semibold text-blue-600">BookTracker</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">© 2025 BookTracker. All rights reserved.</p>
          </div>
          
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-6 mb-3">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <Mail size={18} />
              </a>
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <div className="flex items-center text-xs text-gray-400 mt-2">
              <span>Made with</span>
              <Heart size={12} className="mx-1 text-red-500" />
              <span>by book lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;