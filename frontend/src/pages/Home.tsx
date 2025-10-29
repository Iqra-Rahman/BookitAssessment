import type { Experience } from "../types/types";
import ExperienceCard from "../components/ExperienceCard";

export default function Home({ experiences }: { experiences: Experience[] }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-8 py-12">
        {experiences.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No experiences found</p>
        )}
      </main>
    </div>
  );
}
