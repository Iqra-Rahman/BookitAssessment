import {Link} from 'react-router-dom';
import type { Experience } from "../types/types";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link to={`/details/${experience.id}`}>
    <div className="bg-[#F0F0F0] rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={experience.image_url}
          alt={experience.title}
          className="h-48 w-full object-cover"
        />
        {experience.location && (
          <span className="absolute top-3 right-3 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            {experience.location}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between h-40">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{experience.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {experience.description}
          </p>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <p className="text-gray-800 font-bold">From ₹{experience.price}</p>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold px-3 py-1 rounded-md">
            View Details
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
}
