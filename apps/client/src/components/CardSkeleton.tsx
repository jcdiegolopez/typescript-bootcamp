function SkeletonCard() {
    return (
      <div className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col animate-pulse">
        {/* Image */}
        <div className="w-full bg-gray-700 rounded-md h-40"></div>
  
        {/* Title */}
        <div className="mt-4 h-4 bg-gray-700 rounded"></div>
  
        {/* Description */}
        <div className="mt-2 h-3 bg-gray-700 rounded"></div>
        <div className="mt-1 h-3 bg-gray-700 rounded"></div>
        <div className="mt-1 h-3 bg-gray-700 rounded w-3/4"></div>
  
        {/* Price */}
        <div className="mt-auto h-5 bg-gray-700 rounded w-1/3"></div>
      </div>
    );
  }

export default SkeletonCard;