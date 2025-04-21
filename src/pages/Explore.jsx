import React, { useEffect, useState } from 'react';
import { getBooks } from '../api/bookService';
import { Link } from 'react-router-dom';

const Explore = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await getBooks();
        console.log("Fetched books:", response.data.data);
        setBookData(response?.data?.data); 
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);  

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'borrowed':
        return 'bg-yellow-100 text-yellow-800';
      case 'reserved':
        return 'bg-blue-100 text-blue-800';
      case 'unavailable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const BookCard = ({ book }) => {
    return (
      <Link to={`/book/${book.id}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105 h-full">
          <div className="relative">
            <img 
              src={book.image || "/api/placeholder/300/450"} 
              alt={`${book.title} cover`} 
              className="w-full h-64 object-cover"
            />
            {book.status && (
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(book.status)}`}>
                  {book.status}
                </span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800 truncate">{book.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{book.author}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < 4 ? "★" : "☆"}</span>
                  ))}
                </div>
                <span className="ml-1 text-sm text-gray-600">4.5</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore Books</h1>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookData.length > 0 ? (
            bookData.map(book => (
              <BookCard key={book.id} book={book} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No books found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;