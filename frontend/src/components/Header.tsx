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
