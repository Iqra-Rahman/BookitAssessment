import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getExperienceById } from '../services/api';
import type{ Experience } from '../types/types';
import { useBooking } from '../context/BookingContext';

const Details = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [slot, setSlot] = useState('');
  const navigate = useNavigate();
  const { setBookingData } = useBooking();

  useEffect(() => {
    if (id) getExperienceById(Number(id)).then((res) => setExperience(res.data));
  }, [id]);

  const handleNext = () => {
    if (!slot) return alert('Please select a slot');
    setBookingData({ experience_id: experience?.id, slot_time: slot });
    navigate('/checkout');
  };

  if (!experience) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold">{experience.title}</h2>
      <p>{experience.description}</p>
      <p className="mt-2 font-medium">₹{experience.price}</p>

      <select
        className="mt-4 border p-2 rounded"
        onChange={(e) => setSlot(e.target.value)}
      >
        <option value="">Select a slot</option>
        <option value="Morning">Morning</option>
        <option value="Afternoon">Afternoon</option>
        <option value="Evening">Evening</option>
      </select>

      <button
        onClick={handleNext}
        className="block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Details;
