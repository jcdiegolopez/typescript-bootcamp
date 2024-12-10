function SkeletonLoader() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex justify-center items-start p-6">
      <div className="animate-pulse">
        {/* Imagen del producto */}
        <div className="w-full h-64 bg-gray-700 rounded-md"></div>
  
        {/* Título */}
        <div className="mt-4 h-6 w-3/4 bg-gray-700 rounded-md"></div>
  
        {/* Precio */}
        <div className="mt-2 h-5 w-1/4 bg-gray-700 rounded-md"></div>
  
        {/* Descripción */}
        <div className="mt-4 h-4 w-full bg-gray-700 rounded-md"></div>
        <div className="mt-2 h-4 w-5/6 bg-gray-700 rounded-md"></div>
  
        {/* Opciones */}
        <div className="mt-6 space-y-3">
          <div className="h-4 w-2/5 bg-gray-700 rounded-md"></div>
          <div className="flex gap-2">
            <div className="h-8 w-16 bg-gray-700 rounded-lg"></div>
            <div className="h-8 w-16 bg-gray-700 rounded-lg"></div>
            <div className="h-8 w-16 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
  
        {/* Botón */}
        <div className="mt-8 h-12 w-1/3 bg-gray-700 rounded-md"></div>
      </div>
      </div>
    );
  }

  export default SkeletonLoader;