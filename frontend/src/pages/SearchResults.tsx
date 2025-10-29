import { useNavigate } from "react-router-dom";
import type { Experience } from "../types/types";
import ExperienceCard from "../components/ExperienceCard";

interface SearchResultsProps {
  experiences: Experience[];
}

export default function SearchResults({ experiences }: SearchResultsProps) {
  const navigate = useNavigate();

  return (
    <div className="px-8 py-6">
      <h2 className="text-2xl font-semibold mb-4">Search Results</h2>

      {experiences.length === 0 ? (
        <p className="text-gray-500">No experiences found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-md shadow"
      >
        Back to Home
      </button>
    </div>
  );
}
