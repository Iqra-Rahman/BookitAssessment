import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { experience, selectedDate, selectedTime, subtotal, tax, total } = state || {};

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    console.log("🧾 Checkout received state:", state);
  }, [state]);

  if (!experience) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg">No experience selected.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-yellow-600 text-black px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleBookingSubmit = async () => {
    if (!fullName || !email || !selectedDate || !selectedTime) {
      alert("Please fill all fields before booking.");
      return;
    }
    if (!agree) {
      alert("Please agree to the terms before proceeding.");
      return;
    }

    try {
      setSubmitting(true);
      await axios.post("http://localhost:5000/bookings", {
        experience_id: experience.id,
        user_name: fullName,
        email,
        booking_date: selectedDate,
        booking_time: selectedTime,
        price_charged: total,
      });

      navigate("/booking-confirmation");
    } catch (err) {
      console.error("Error creating booking:", err);
      alert("Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      {/* Back & Title */}
      <h1
        onClick={() => navigate(-1)}
        className=" font-normal mb-8 text-gray-700 cursor-pointer hover:underline"
      >
        ← Checkout
      </h1>

      {/* Main Content*/}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-1 rounded-lg p-4 bg-[#EFEFEF] max-h-[230px] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <h3 className="text-gray-800 pb-1 text-sm">Full Name</h3>
              <input
                type="text"
                placeholder="Your name"
                className="bg-[#DDDDDD] rounded-md p-2 w-full text-sm"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <h3 className="text-gray-800 pb-1 text-sm">Email</h3>
              <input
                type="email"
                placeholder="Your Email"
                className="bg-[#DDDDDD] rounded-md p-2 w-full text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Promo code"
              className="bg-[#DDDDDD] rounded-md p-2 flex-1 text-sm"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 text-sm">
              Apply
            </button>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span className="text-gray-600 text-xs">
              I agree to the terms and safety policy
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className=" rounded-lg p-5 bg-[#EFEFEF] space-y-1">

          <div className="flex justify-between text-gray-700">
            <span>Experience</span>
            <span className="font-semibold">{experience.title}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Date</span>
            <span>{selectedDate}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Time</span>
            <span>{selectedTime}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Qty</span>
            <span>1</span>
          </div>

          <hr className="my-2" />

          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>₹{subtotal || 0}</span>
          </div>

          <div className="flex justify-between text-gray-700">
            <span>Taxes</span>
            <span>₹{tax || 0}</span>
          </div>

          <div className="flex justify-between font-semibold text-gray-900 mt-3">
            <span>Total</span>
            <span>₹{total || 0}</span>
          </div>

          <button
            disabled={submitting}
            onClick={handleBookingSubmit}
            className={`w-full mt-4 py-3 rounded-md text-black font-medium ${
              submitting
                ? "bg-gray-400"
                : "bg-yellow-400 hover:bg-yellow-500 text-black"
            }`}
          >
            {submitting ? "Processing..." : "Pay and Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
