import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci"
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi"
import { useLocation, useNavigate } from "react-router";
import { useDebounce } from "../hooks/useDebounce";


export const Header = () => {
  const [searchTextInput, setSearchTextInput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const inProductDetailPage = location.pathname.includes("/product/");

  const queryParams = new URLSearchParams(location.search);

  const debouncedSearchText = useDebounce(searchTextInput, 500); // 500ms de retraso

  const updateQueryParam = (searchText: string) => {
    const updatedParams = new URLSearchParams(queryParams);
    if (searchText !== "") {
      updatedParams.set("searchText", String(searchText));
    } else {
      updatedParams.delete("searchText");
    }

    navigate(`?${updatedParams.toString()}`, { replace: true });
  };

  
  useEffect(() => {
    updateQueryParam(debouncedSearchText);
  }, [debouncedSearchText]);

  return (
    <header className="bg-gray-900 shadow-md w-full">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <div onClick={() => navigate("/search") } className="flex items-center justify-center space-x-2 bg-gray-800 p-2 rounded-md hover:cursor-pointer">
            <FiShoppingBag className="text-gray-300 w-10 h-10 hover:text-gray-100"/>
        </div>

        {/* Search Bar */}
        { !inProductDetailPage &&
        <div className="flex-grow max-w-md mx-4">
        <div className="relative">
          <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
          <input
            type="text"
            value={searchTextInput}
            onChange={(e) => setSearchTextInput(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full py-2 pl-10 pr-4 bg-gray-800 text-gray-400 border border-gray-700 rounded-md placeholder-gray-500 focus:ring-1  focus:outline-none text-sm "
          />
        </div>
      </div>
        }
        

        {/* Cart */}
        <button className="relative flex items-center text-gray-300 hover:text-white">
          <FiShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] font-semibold px-1 py-0.2 rounded-sm">
            {""}
          </span>
        </button>
      </div>
    </header>

  )
}
