import { useLocation, useNavigate } from 'react-router';

function Filters() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const selectedSortBy = queryParams.get('sortBy');

  const updateSortBy = (sortBy: 'asc' | 'desc' | null) => {
    const updatedParams = new URLSearchParams(queryParams);

    if (sortBy) {
      updatedParams.set('sortBy', sortBy); // Set the sortBy parameter
    } else {
      updatedParams.delete('sortBy'); // Remove the parameter if default is selected
    }

    navigate(`?${updatedParams.toString()}`, { replace: true });
  };

  return (
    <div className="text-gray-200 py-6 pr-8">
      <h1 className="font-semibold mb-3">Sort By</h1>
      <ul>
        <li className="text-[0.85rem] pb-1">
          <button
            onClick={() => updateSortBy(null)} // Default option
            className={`hover:text-gray-400 ${
              !selectedSortBy ? 'text-blue-500 font-bold' : ''
            }`}
          >
            Default
          </button>
        </li>
        <li className="text-[0.85rem] pb-1">
          <button
            onClick={() => updateSortBy('asc')} // Low to High
            className={`hover:text-gray-400 ${
              selectedSortBy === 'asc' ? 'text-blue-500 font-bold' : ''
            }`}
          >
            Price: Low to High
          </button>
        </li>
        <li className="text-[0.85rem] pb-1">
          <button
            onClick={() => updateSortBy('desc')} // High to Low
            className={`hover:text-gray-400 ${
              selectedSortBy === 'desc' ? 'text-blue-500 font-bold' : ''
            }`}
          >
            Price: High to Low
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Filters;
