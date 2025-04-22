import React, { useState } from "react";
import { X, Upload, Book } from "lucide-react";
import { addBook } from "../api/bookService"; 
import {toast} from 'react-toastify'

const AddBookModal = ({ isOpen, onClose }) => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    status: "not_started",
    image: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setBookData((prev) => ({
        ...prev,
        image: file,
      }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", bookData.title);
    formData.append("author", bookData.author);
    formData.append("description", bookData.description);
    formData.append("status", bookData.status);
    if (bookData.image) {
      formData.append("image", bookData.image);
    }

    try {
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const res = await addBook(formData);
      if(res.status==201) toast.success("book added succfully")
      console.log("Book added:", res);
      setBookData({
        title: "",
        author: "",
        description: "",
        status: "not_started",
        image: null,
      });
      onClose();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Book className="text-blue-600 mr-2" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Book
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
        
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Cover
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden relative">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Selected book cover"
                  className="object-cover h-full w-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-1 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG or WEBP (MAX. 2MB)
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Book Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter book title"
              required
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Author Name*
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter author name"
              required
            />
          </div>

         
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={bookData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Short description about the book"
            />
          </div>

          
          <div className="mb-6">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status*
            </label>
            <select
              id="status"
              name="status"
              value={bookData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="not_started">Not Started</option>
              <option value="in_progress">In Progress</option>
              <option value="finished">Finished</option>
            </select>
          </div>

          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
