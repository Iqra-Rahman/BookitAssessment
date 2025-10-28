import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Details from './pages/Details.tsx';
import Checkout from './pages/Checkout.tsx';
import Result from './pages/Result.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import { BookingProvider } from './context/BookingContext';

const App = () => (
  <BookingProvider>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </BookingProvider>
);

export default App;
