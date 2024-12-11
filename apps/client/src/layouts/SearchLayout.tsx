import Collections from "../components/search/Collections"
import Filters from "../components/search/Filters"
import SearchResult from "../pages/SearchResult";

function SearchLayout() {
  return (
    <div className="flex w-full min-h-screen bg-gray-800 ">
      {/* Sidebar izquierda: Collections */}
      <div className="w-1/7 bg-gray-800">
        <Collections />
      </div>
      
      {/* Contenido principal: Results */}
      <div className="flex-1 bg-gray-800 p-4 ">
        <SearchResult />
      </div>
      
      {/* Sidebar derecha: Filters */}
      <div className="w-1/7 bg-gray-800">
        <Filters />
      </div>
    </div>
  );
}

export default SearchLayout