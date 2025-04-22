import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById, deleteBook } from "../api/bookService";
import { addNote, getAllNotes, deleteNote } from "../api/noteService";
import UpdateModal from "../components/updateModal";
import { ToastContainer, toast } from "react-toastify";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [updateModal, setUpdateModdal] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await getBookById(id);
        setBook(data?.data);

        const savedNotes = localStorage.getItem(`bookNotes_${id}`);
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [id]);

  //Add Note
  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    const response = await addNote(id, newNote);
    if (response.status == 201) {
      toast.success("Note added");
    }

    setNewNote("");
    setShowNoteForm(false);
  };

  //Delete Book
  const handleDeleteBook = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const response = await deleteBook(id);
        if (response.status == 200) {
          toast.success("Book deleted succesfully");
        }
        navigate("/books");
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  //Update Book
  const handleUpdateBook = () => {
    setUpdateModdal(true);
  };

  //fetch Note function
  const getNotes = async () => {
    setShowNotes(!showNotes);
    const response = await getAllNotes(id);

    setNotes(response?.data?.data);
  };

  //Delete a Note

  const handleDeleteNote = async (noteId) => {
    const response = await deleteNote(noteId);
    if (response.status == 200) {
      toast.success("deleted succefully");
    }

    setNotes("");

    // window.location.reload()
  };

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600">
          Loading....
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <ToastContainer />
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Books
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
          <div className="md:flex">
            {/* Book Cover */}
            <div className="md:w-1/3 p-6 flex justify-center items-center bg-gray-50">
              <img
                src={book.image || "/api/placeholder/300/450"}
                alt={`${book.title} cover`}
                className="w-64 h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Book Details */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {book.title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4 italic">
                    by {book.author}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center bg-yellow-50 px-4 py-2 rounded-full shadow-sm border border-yellow-100">
                  <div className="flex text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-5 h-5"
                        fill={star <= 4 ? "currentColor" : "none"}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 font-semibold text-gray-700">4.5</span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-500 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Description
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                  <p className="text-gray-700">
                    {book.description ||
                      "No description available for this book."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={handleUpdateBook}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md flex items-center font-medium"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                  Update Book
                </button>
                <button
                  onClick={handleDeleteBook}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md flex items-center font-medium"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                  Delete Book
                </button>
                <button
                  onClick={() => setShowNoteForm(!showNoteForm)}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md flex items-center font-medium"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  Add Note
                </button>
                <button
                  onClick={getNotes}
                  className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow-md flex items-center font-medium"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                  {showNotes ? "Hide Notes" : `Show Notes `}
                </button>
              </div>
            </div>
          </div>

          {/* Note Form */}
          {showNoteForm && (
            <div className="p-8 bg-gray-50 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                <svg
                  className="w-5 h-5 mr-2 text-green-500 inline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                Add New Note
              </h3>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none shadow-sm"
                rows="4"
                placeholder="Write your thoughts about this book..."
              ></textarea>
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowNoteForm(false)}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  className="px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 shadow-md font-medium"
                >
                  Save Note
                </button>
              </div>
            </div>
          )}

          {showNotes && (
            <div className="p-8 bg-gray-50 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">
                <svg
                  className="w-5 h-5 mr-2 text-purple-500 inline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  ></path>
                </svg>
                Your Notes
              </h3>
              {notes.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                  <svg
                    className="w-12 h-12 mx-auto text-gray-400 mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                  <p className="text-gray-500">
                    You haven't added any notes for this book yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
                    >
                      <p className="text-gray-700">{note.content}</p>
                      <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                        <button
                          onClick={() => handleDeleteNote(note.id)} // Make sure to implement handleDeleteNote
                          className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {updateModal && (
        <UpdateModal
          bookId={book.id}
          bookData={book}
          onClose={() => setUpdateModdal(false)}
        />
      )}
    </div>
  );
};

export default BookDetails;
