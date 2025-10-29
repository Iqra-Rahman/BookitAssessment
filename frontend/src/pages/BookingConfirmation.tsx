import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BookingConfirmation() {
  const [refId, setRefId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Generate random reference ID
    const randomRef = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRefId(`HUF${randomRef}`);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Success Icon */}
      <div className="bg-green-500 rounded-full p-4 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Text Content */}
      <h1 className="text-2xl font-semibold mb-2">Booking Confirmed</h1>
      <p className="text-gray-600 mb-6">Ref ID: {refId}</p>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
      >
        Back to Home
      </button>
    </div>
  );
}
