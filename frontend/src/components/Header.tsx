import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({
  onSearch,
}:
  HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await onSearch(searchQuery);
      navigate("/search-results"); // redirect to search results page
    }
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <img
        src="/hDeliteLogo.png"
        alt="Highway Delite Logo"
        className="h-11 w-auto pl-10 object-contain cursor-pointer"
      />

      <form onSubmit={handleSearch} className="flex gap-x-1.5 pr-10">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search experiences..."
          className=" bg-[#EDEDED] rounded-md px-4 py-2 w-64 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 rounded-md"
        >
          Search
        </button>
      </form>
    </header>
  );
}