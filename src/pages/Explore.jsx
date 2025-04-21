import React, { useEffect, useState } from 'react';
import { getBooks } from '../api/bookService';
import { Link } from 'react-router-dom';


const Explore = () => {
  const [bookData, setBookData] = useState([]);

  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        console.log("Fetched books:", response.data.data);
        setBookData(response?.data?.data); 
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);  


  const BookCard = ({ book }) => {

    return (
        <Link to={`/book/${book.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105">
        <img 
          src={book.image} 
          alt={`${book.title} cover`} 
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">{book.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{book.author}</p>
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
      </Link>
    );
  };
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore Books</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bookData.length > 0 ? (
          bookData.map(book => (
            <BookCard key={book.id} book={book} />
          ))
        ) : (
          <p>Loading books...</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
