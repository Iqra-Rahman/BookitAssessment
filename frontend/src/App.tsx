import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExperiences } from "./services/api";
import type { Experience } from "./types/types";
import { BookingProvider } from "./context/BookingContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import BookingConfirmation from "./pages/BookingConfirmation";
import SearchResults from "./pages/SearchResults";

function AppContent() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [searchResults, setSearchResults] = useState<Experience[]>([]);
  const navigate = useNavigate();

  // experiences
  const fetchData = async (searchQuery = "") => {
    const res = await getExperiences(searchQuery);
    setExperiences(res.data);
  };

  // Handle search 
  const handleSearch = async (searchQuery = "") => {
    const res = await getExperiences(searchQuery);
    setSearchResults(res.data);
    navigate("/search-results"); 
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <>
      <Header onSearch={handleSearch} /> 
      <Routes>
        <Route path="/" element={<Home experiences={experiences} />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/search-results" element={<SearchResults experiences={searchResults} />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <Router>
        <AppContent />
      </Router>
    </BookingProvider>
  );
}
