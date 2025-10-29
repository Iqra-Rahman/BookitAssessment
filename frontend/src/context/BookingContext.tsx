import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface BookingData {
  experience_id: number;
  title: string;
  booking_date: string;
  booking_time: string;
  guests: number;
  subtotal: number;
  tax: number;
  total: number;
}

interface BookingContextType {
  bookingData: BookingData | null;
  setBookingData: (data: BookingData) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within BookingProvider");
  return context;
};
