// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
//   const loc = useLocation();
//   const active = loc.pathname === to;
//   return (
//     <Link
//       to={to}
//       className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//         active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
//       }`}
//     >
//       {children}
//     </Link>
//   );
// };

// export default function Header() {
//   return (
//     <header className="bg-white border-b">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         {/* Brand */}
//         <Link to="/" className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow">
//             BE
//           </div>
//           <div>
//             <div className="text-lg font-semibold">BookEasy</div>
//             <div className="text-xs text-gray-500 -mt-0.5">Experiences that excite</div>
//           </div>
//         </Link>

//         {/* Nav + actions */}
//         <nav className="hidden md:flex items-center gap-2">
//           <NavLink to="/">Home</NavLink>
//           <NavLink to="/explore">Explore</NavLink>
//           <NavLink to="/checkout">Checkout</NavLink>
//           <NavLink to="/result">Result</NavLink>
//         </nav>

//         {/* Mobile menu & CTA */}
//         <div className="flex items-center gap-3">
//           <Link
//             to="/checkout"
//             className="hidden sm:inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:bg-blue-700"
//           >
//             Book Now
//           </Link>

//           {/* Mobile menu button (simple) */}
//           <div className="md:hidden">
//             <button
//               aria-label="Open menu"
//               className="p-2 rounded-md hover:bg-gray-100"
//               onClick={() => {
//                 // small convenience: go to home for now on mobile tap
//                 // you can replace with real mobile drawer logic
//                 window.location.href = '/';
//               }}
//             >
//               <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


import { useState } from "react";

export default function Header({
  onSearch,
}: {
  onSearch?: (query: string) => void;
}) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  return (
    <header className="bg-white flex justify-between items-center px-8 py-4 shadow-sm sticky top-0 w-full z-10">
      {/* Left Logo */}
      <div className="flex items-center gap-2">
        {/* <img src="/logo.png" alt="logo" className="h-10 w-10" /> */}
        <h1 className="font-semibold text-lg text-gray-800">highway delite</h1>
      </div>

      {/* Search Box */}
      <div className="flex items-center gap-2 w-1/3">
        <input
          type="text"
          placeholder="Search experiences"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="grow bg-gray-100 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-md shadow "
        >
          Search
        </button>
      </div>
    </header>
  );
}
