import axios from 'axios';

const API = axios.create({
  baseURL: 'https://bookit-assessment.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getExperiences = (searchQuery = "") =>
  API.get('/experiences', { params: { search: searchQuery } });

export const getExperienceById = (id: number) => API.get(`/experiences/${id}`);

export const getAvailability = async (experienceId: number, days: number = 7) => {
  try {
    const { data } = await API.get(`/bookings/availability/${experienceId}/${days}`);
    console.log("Availability data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching availability:", error);
    return { dates: [] };
  }
};

export const createBooking = (data: any) => API.post('/bookings', data);

export default API;
