import { Link } from "react-router-dom";
import type { Experience } from "../types/types";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link to={`/details/${experience.id}`}>
      <div className="bg-[#F0F0F0] text-[#6C6C6C] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <img
          src={experience.image_url}
          alt={experience.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between">
            <h3 className="text-lg text-gray-900 font-semibold">{experience.title}</h3>
            <h3 className=" rounded-md text-gray-700 bg-[#D6D6D6] pr-1 pl-1">{experience.location}</h3>
          </div>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {experience.description}
          </p>
          <div className="flex justify-between h-8 items-center mt-4 rounded-md">
            <p className="font-bold text-xl text-black"><span className="font-medium text-[#6C6C6C] text-sm">From </span>₹{experience.price}</p>
            <h3 className="rounded-md text-black font-semibold bg-[#FFD643] pr-1 pl-1">View Details</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
