import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getExperienceById, getAvailability } from "../services/api";
import type { Experience } from "../types/types";
import Loader from "../components/Loader";

const TAX_RATE = 0.06;

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [availability, setAvailability] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [guests, setGuests] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch experience and availability
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const expRes = await getExperienceById(Number(id));
        setExperience(expRes.data);

        const availRes = await getAvailability(Number(id), 10);
        console.log("Availability data:", availRes);
        const fetchedDates = availRes.dates || availRes.data?.dates || [];
        setAvailability(fetchedDates);

        const firstAvailable = fetchedDates.find((d: any) =>
          d.slots.some((s: any) => s.remaining > 0)
        );
        if (firstAvailable) {
          setSelectedDate(firstAvailable.date);
          const firstSlot = firstAvailable.slots.find((s: any) => s.remaining > 0);
          if (firstSlot) setSelectedTime(firstSlot.time);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Loader text="Loading experience..." />;
  if (!experience) return <p className="p-6">Experience not found.</p>;

  //  price (string to number)
  const price = parseFloat(experience.price as any) || 0;
  const subtotal = Number((price * guests).toFixed(2));
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  // Handle booking
  const handleBook = () => {
    if (!selectedDate || !selectedTime) return alert("Please select date and time");
    if (guests < 1) return alert("Select at least 1 guest");

    navigate("/checkout", {
      state: { experience, selectedDate, selectedTime, guests, subtotal, tax, total },
    });
  };

  const currentDateObj = availability.find((d) => d.date === selectedDate);
  const currentSlots = currentDateObj ? currentDateObj.slots : [];

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3">
        {/* Left section */}
        <div className="lg:col-span-2">
          <button
            onClick={() => navigate(-1)}
            className="font-normal mb-5 text-gray-700 cursor-pointer hover:underline"
          >
            ← Details
          </button>

          <img
            src={experience.image_url}
            alt={experience.title}
            className="h-80 w-xl object-cover rounded-xl mb-4"
          />

          <h1 className="text-3xl font-semibold">{experience.title}</h1>
          <p className="mt-2 text-gray-700">{experience.description}</p>

          {/* Date */}
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Choose date</h3>
            <div className="flex gap-3 flex-wrap">
              {availability.map((d) => (
                <button
                  key={d.date}
                  onClick={() => {
                    setSelectedDate(d.date);
                    setSelectedTime("");
                  }}
                  className={`px-4 py-2 rounded-md text-sm border ${
                    selectedDate === d.date
                      ? "bg-yellow-400 border-yellow-500 text-black"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  {new Date(d.date).toDateString().slice(4, 10)}
                </button>
              ))}
            </div>
          </div>

          {/* Time */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Choose time</h3>
            <div className="flex gap-2 flex-wrap">
              {currentSlots.length === 0 && (
                <p className="text-sm text-gray-500">No slots available</p>
              )}
              {currentSlots.map((s: any) => (
                <button
                  key={s.time}
                  onClick={() => setSelectedTime(s.time)}
                  disabled={s.remaining === 0}
                  className={`px-3 py-2 rounded-md text-sm border ${
                    selectedTime === s.time
                      ? "bg-yellow-400 border-yellow-500 text-black"
                      : "border-gray-200 text-gray-700"
                  } ${s.remaining === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {s.time} {s.remaining === 0 ? " (Sold out)" : ` (${s.remaining} left)`}
                </button>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">About</h3>
            <div className="flex gap-2 flex-wrap text-gray-700 bg-gray-200 rounded-md p-2">
              <p>Scenic routes, trained guides, and safety briefing. Minimum age 10.</p>
            </div>
          </div>
        </div>

        {/* Right section */}
        <aside className="bg-[#EFEFEF] rounded-xl shadow-sm mt-12 p-6 h-fit">
          <div className="flex justify-between mb-2">
            <span>Starts at</span>
            <span>₹{price.toFixed(0)}</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className="">Guests</span>
            <div className="flex items-center rounded-md">
              <button
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
              >
                −
              </button>
              <span className="px-4">{guests}</span>
              <button onClick={() => setGuests((g) => g + 1)} >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(0)}</span>
          </div>
          <div className="flex justify-between  mb-2">
            <span>Taxes</span>
            <span>₹{tax.toFixed(0)}</span>
          </div>

          <div className="border-t border-gray-300 my-4"></div>

          <div className="flex justify-between font-semibold text-lg mt-3">
            <span>Total</span>
            <span>₹{total.toFixed(0)}</span>
          </div>

          <button
            onClick={handleBook}
            disabled={!selectedDate || !selectedTime}
            className={`mt-6 w-full py-3 rounded-md font-semibold ${
              !selectedDate || !selectedTime
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            }`}
          >
            Confirm
          </button>
        </aside>
      </div>
    </div>
  );
}
