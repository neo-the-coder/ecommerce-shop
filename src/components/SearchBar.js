import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// import Context
import { ProductContext } from "../contexts/ProductContext";
// import Component
import LiveSearchResult from "./LiveSearchResult";
// import Icon
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

function SearchBar() {
  // Local states
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // import context
  const { searchResult, setSearchResult } = useContext(ProductContext);

  const navigate = useNavigate();
  const searchRef = useRef();

  //// Event handlers
  // Control input field
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Search button handler 
  const onSearchButton = (e) => {
    e.preventDefault();
    // Don't search if the query is empty
    if (!query) return;

    (async () => {
      try {
        // Retrieve cached data
        if (searchResult[query.toLocaleLowerCase()]) {
          return;
        }
        // Fetch data
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=0`
        );

        if (!response.ok) {
          alert(`Status ${response.status}. Error occured! Please try again.`);
        }

        const data = await response.json();
        setSearchResult({ ...searchResult, [query.toLocaleLowerCase()]: data });
      } catch (error) {
        alert(`${error.message}! Please try again.`);
      } finally {
        // Navigate to search page
        navigate(`/search?q=${query}`);
        // Reset query
        setQuery("");
      }
    })();
  };

  // Close Live Search window on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // Live search
  useEffect(() => {
    // Close Live Search window
    setIsOpen(false);

    // Don't search if the query is empty
    if (!query) return;

    // Retrieve cached data and open Live Search window
    if (searchResult[query.toLocaleLowerCase()]) {
      setIsOpen(true);
      return;
    }

    // Fetch data
    const searchProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=0`
        );

        if (!response.ok) {
          alert(`Status ${response.status}. Error occured! Please try again.`);
        }

        const data = await response.json();
        setSearchResult({ ...searchResult, [query.toLocaleLowerCase()]: data });
      } catch (error) {
        alert(`${error.message}! Please try again.`);
      } finally {
        setIsOpen(true);
      }
    };

    // Delay search for 1 sec
    const delayDebounceFn = setTimeout(() => {
      searchProducts();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="w-[600px] relative" ref={searchRef}>
      <form
        onSubmit={onSearchButton}
        className="flex items-center justify-between h-10"
      >
        <input
          className="text-md text-black py-2 px-4 rounded-md bg-gray-100 outline-accent flex-1"
          type="search"
          placeholder="Search Products..."
          onChange={handleChange}
          onFocus={() => setIsOpen(true)}
          value={query}
        />
        <button
          className="text-md text-white py-2 px-4 bg-accent rounded-md"
          type="submit"
        >
          Search
        </button>
      </form>
      <div
        className={`${
          isOpen && query ? "block" : "hidden"
        } absolute z-10 w-full max-h-[250px] top-11 rounded-md px-4 bg-gray-100 overflow-y-auto shadow-md`}
      >
        {query && searchResult[query]?.total ? (
          <div>
            <ul>
              {searchResult[query]?.products.slice(0, 10).map((product) => {
                return <LiveSearchResult product={product} key={product.id} />;
              })}
            </ul>
            {searchResult[query]?.total > 5 && (
              <button
                onClick={onSearchButton}
                className="block text-xl w-full py-2 text-center rounded-md bg-black text-white my-4 uppercase"
              >
                <MdOutlineKeyboardDoubleArrowRight className="inline-block" />{" "}
                {/* view all {searchResult[query]?.total} results */}
                see more results
              </button>
            )}
          </div>
        ) : (
          <p className="text-md text-center text-black py-2 px-4">
            No result was found for '{query}'
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
