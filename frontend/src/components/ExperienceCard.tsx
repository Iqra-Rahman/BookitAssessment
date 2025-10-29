import { Link } from "react-router-dom";
import type { Experience } from "../types/types";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link to={`/details/${experience.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <img
          src={experience.image_url}
          alt={experience.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{experience.title}</h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {experience.description}
          </p>
          <p className="mt-3 font-medium text-blue-600">₹{experience.price}</p>
        </div>
      </div>
    </Link>
  );
}
