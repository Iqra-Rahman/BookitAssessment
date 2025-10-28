import { useState } from 'react';
import { createBooking, validatePromo } from '../services/api';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { bookingData } = useBooking();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', promo: '' });
  const [discount, setDiscount] = useState(0);

  const handlePromo = async () => {
    try {
      const res = await validatePromo(form.promo);
      if (res.data.valid) setDiscount(res.data.discount);
      alert('Promo applied!');
    } catch {
      alert('Invalid promo code');
    }
  };

  const handleSubmit = async () => {
    try {
      await createBooking({
        experience_id: bookingData.experience_id,
        user_name: form.name,
        email: form.email,
        slot_time: bookingData.slot_time,
      });
      navigate('/result?status=success');
    } catch {
      navigate('/result?status=failed');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>

      <input
        placeholder="Full Name"
        className="border p-2 rounded w-full mb-2"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        className="border p-2 rounded w-full mb-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Promo Code"
        className="border p-2 rounded w-full mb-2"
        onChange={(e) => setForm({ ...form, promo: e.target.value })}
      />
      <button
        onClick={handlePromo}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Apply
      </button>

      <div className="mt-4">
        <p>Price: ₹{1000 - discount}</p>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default Checkout;
