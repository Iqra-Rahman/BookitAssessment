// import { useEffect, useState } from 'react';
// import { getExperiences } from '../services/api';
// import type{ Experience } from '../types/types';
// import ExperienceCard from '../components/ExperienceCard.tsx';
// import { useNavigate } from 'react-router-dom';
// import { useBooking } from '../context/BookingContext';

// const Home = () => {
//   const [experiences, setExperiences] = useState<Experience[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { setSelectedExperience } = useBooking();

//   useEffect(() => {
//     getExperiences()
//       .then((res) => setExperiences(res.data))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) return <p className="text-center text-gray-500">Loading...</p>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Available Experiences</h1>
//       <div className="grid md:grid-cols-3 gap-6">
//         {experiences.map((exp) => (
//           <ExperienceCard
//             key={exp.id}
//             experience={exp}
//             onSelect={() => {
//               setSelectedExperience(exp);
//               navigate(`/details/${exp.id}`);
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useEffect, useState } from "react";
import type { Experience } from "../types/types";
import ExperienceCard from "../components/ExperienceCard";
import { getExperiences } from "../services/api";
// import Header from "../components/Header";

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filtered, setFiltered] = useState<Experience[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getExperiences();
      setExperiences(res.data);
      setFiltered(res.data);
    };
    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    const q = query.toLowerCase();
    const res = experiences.filter(
      (exp) =>
        exp.title.toLowerCase().includes(q) ||
        exp.description.toLowerCase().includes(q)
    );
    setFiltered(res);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <Header onSearch={handleSearch} /> */}
      <main className="px-10 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </main>
    </div>
  );
}
