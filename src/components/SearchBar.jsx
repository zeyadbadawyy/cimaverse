import { FaSearch } from "react-icons/fa";

function SearchBar({
  value,
  onChange,
  onSearch
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      <FaSearch />

      <input
        type="text"
        placeholder="Search movies..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBar;