import React, { useState } from "react";
import { BookOpen, Plus, TrendingUp } from "lucide-react";
import Modal from "../components/bookModal";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleButton = () => {
    setOpen(true);
  };

  const handleClick = () => {
    navigate("/books");
  };
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <ToastContainer />
      <Modal isOpen={open} onClose={() => setOpen(false)} />

      <div className="h-16"></div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-xl overflow-hidden mb-12">
          <div className="w-full md:w-1/2 p-8 md:p-12 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              Your Personal <span className="text-blue-600">Book Journey</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Track your reading progress, discover new books, and connect with
              fellow readers. Never lose track of your literary adventures
              again.
            </p>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-start gap-4">
              <button
                onClick={handleButton}
                className="flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 font-medium transform hover:scale-105"
              >
                <Plus size={18} className="mr-2" />
                Add New Book
              </button>
              <button
                onClick={handleClick}
                className="flex items-center justify-center bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg shadow-lg hover:bg-blue-50 transition duration-300 font-medium transform hover:scale-105"
              >
                <TrendingUp size={18} className="mr-2" />
                Explore Books
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img
              src="/homeImage.jpg"
              alt="Book collection"
              className="object-cover w-full h-64 md:h-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg inline-block mb-4">
              <BookOpen size={22} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Your Reading</h3>
            <p className="text-gray-600">
              Keep track of your reading progress and set goals to improve your
              reading habits.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="bg-green-100 text-green-600 p-3 rounded-lg inline-block mb-4">
              <TrendingUp size={22} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Discover New Books</h3>
            <p className="text-gray-600">
              Explore personalized recommendations based on your reading history
              and preferences.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-lg inline-block mb-4">
              <Plus size={22} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Build Your Library</h3>
            <p className="text-gray-600">
              Create a digital collection of all your books with notes, ratings
              and reviews.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
