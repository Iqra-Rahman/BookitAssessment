import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getExperiences = () => axios.get(`${API_URL}/experiences`);
export const getExperienceById = (id: number) => axios.get(`${API_URL}/experiences/${id}`);
export const createBooking = (data: any) => axios.post(`${API_URL}/bookings`, data);
export const validatePromo = (code: string) =>
  axios.post(`${API_URL}/promo/validate`, { code });
