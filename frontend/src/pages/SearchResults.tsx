import { useNavigate } from "react-router-dom";
import type { Experience } from "../types/types";
import ExperienceCard from "../components/ExperienceCard";

interface SearchResultsProps {
  experiences: Experience[];
}

export default function SearchResults({ experiences }: SearchResultsProps) {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">

      <h1
        onClick={() => navigate(-2)}
        className=" font-normal mb-8 text-gray-700 cursor-pointer hover:underline"
      >
        ← Home
      </h1>

      {experiences.length === 0 ? (
        <p className="text-gray-500">No experiences found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      )}

    </div>
  );
}
