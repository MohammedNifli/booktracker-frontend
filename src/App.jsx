import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './Layouts/mainLayout';
import Explore from './pages/Explore';

import BookDetails from './pages/BookDetails';
import { Book } from 'lucide-react';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        {/* Add more routes as needed, all wrapped in MainLayout */}
        
        <Route
          path="/books"
          element={
            <MainLayout>
              <Explore />
            </MainLayout>
          }
        />
        <Route
          path="/book/:id"
          element={
            <MainLayout>
              <BookDetails />
            </MainLayout>
          }
        />
        
        
      </Routes>

    </BrowserRouter>
  );
}

export default App;