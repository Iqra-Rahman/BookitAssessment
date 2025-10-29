import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExperiences } from "./services/api";
import type { Experience } from "./types/types";
import { BookingProvider } from "./context/BookingContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Checkout from "./pages/Checkout";
import BookingConfirmation from "./pages/BookingConfirmation";

export default function App() {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  // Fetch experiences (supports search)
  const fetchData = async (searchQuery = "") => {
    const res = await getExperiences(searchQuery);
    setExperiences(res.data);
  };

  useEffect(() => {
    fetchData(); // initial fetch
  }, []);

  return (
    <BookingProvider>
      <Router>
        {/* Header */}
        <Header onSearch={fetchData} />

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Home experiences={experiences} />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}
