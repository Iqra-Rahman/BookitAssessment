import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExperiences } from "./services/api";
import type { Experience } from "./types/types";
import { BookingProvider } from "./context/BookingContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";

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
        {/* ✅ Global Header stays visible on every route */}
        <Header onSearch={fetchData} />

        {/* ✅ Page Routing */}
        <Routes>
          <Route path="/" element={<Home experiences={experiences} />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}
