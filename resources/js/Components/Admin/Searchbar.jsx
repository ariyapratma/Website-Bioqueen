import { useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";

const Searchbar = ({ onResults }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fungsi untuk menangani pencarian
  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      // Hanya mulai pencarian setelah input > 2 karakter
      try {
        const response = await axios.get(`/search`, {
          params: {
            searchTerm: value,
          },
        });

        // Mengirim hasil pencarian ke parent component
        if (onResults) {
          onResults(response.data);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <div className="relative mx-4 flex w-1/3 items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="flex-1 rounded-lg border border-gray-300 p-2 pl-10 font-lexend"
      />
      <CiSearch className="pointer-events-none absolute ml-2 text-gray-500" />
    </div>
  );
};

export default Searchbar;
