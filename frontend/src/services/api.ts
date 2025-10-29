import axios from 'axios';

// Base API instance
const API = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // set to true only if backend uses cookies/sessions
});

// Response Interceptor for cleaner error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ✅ Experiences
export const getExperiences = (searchQuery = "") =>
  API.get('/experiences', { params: { search: searchQuery } });
export const getExperienceById = (id: number) => API.get(`/experiences/${id}`);

// ✅ Booking
export const createBooking = (data: any) => API.post('/bookings', data);

// ✅ Promo Validation
export const validatePromo = (code: string) => API.post('/promo/validate', { code });

export default API;
