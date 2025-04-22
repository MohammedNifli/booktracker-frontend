import React, { useEffect, useState } from 'react';
import { getBookById,updateBook } from '../api/bookService';
import {toast} from 'react-toastify'


const UpdateModal = ({ bookId, onClose }) => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    status: 'not_started',
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      const response = await getBookById(bookId);
      setBookData(response?.data?.data || {});
    };

    if (bookId) fetchBookDetails();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await updateBook(bookId, bookData);
      console.log("Updated book response:", response);
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Book updated successfully!");
        onClose(); 
        window.location.reload()
      } else {
        toast.error("Failed to update the book.");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("An error occurred while updating the book.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-70 backdrop-blur-sm">


      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Update Book</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Author Name</label>
            <input
              type="text"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={bookData.description}
              onChange={handleChange}
              rows="4"
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={bookData.status}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="finished">Finished</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
