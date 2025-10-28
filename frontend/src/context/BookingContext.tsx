import { createContext, useContext, useState} from 'react';
import type{ Experience } from '../types/types';
import type { ReactNode } from 'react';

interface BookingContextType {
  selectedExperience: Experience | null;
  setSelectedExperience: (exp: Experience | null) => void;
  bookingData: any;
  setBookingData: (data: any) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [bookingData, setBookingData] = useState<any>({});

  return (
    <BookingContext.Provider value={{ selectedExperience, setSelectedExperience, bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used inside BookingProvider');
  return context;
};
