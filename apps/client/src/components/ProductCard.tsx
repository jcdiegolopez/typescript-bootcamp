import { ProductDTO } from "@repo/schemas"
import { useNavigate } from "react-router";
import { formatPrice } from "../utils";



function ProductCard(product: ProductDTO) {
    const navigate = useNavigate();

    const handleCardClick = (productId: number) => {
        navigate(`product/${productId}`);
        };


  return (
    <div
        key={product.id}
        className="bg-gray-900 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-transform transform hover:scale-105 p-4 flex flex-col justify-between"
        onClick={() => handleCardClick(product.id)}
    >
        {/* Image */}
        <div className="w-full bg-gray-700 rounded-md overflow-hidden flex items-center justify-center">
        {product.image ? (
            <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
            />
        ) : (
            <span className="text-gray-500">No Image</span>
        )}
        </div>

        {/* Name */}
        <h2 className="mt-4 text-lg font-semibold text-gray-100">
        {product.name}
        </h2>

        {/* Description */}
        <p className="mt-2 text-xs text-gray-400 line-clamp-3">
        {product.description || "No description found"}
        </p>

        {/* Price */}
        <p className="mt-4 text-base font-semibold text-gray-200 bg-blue-700 w-fit py-1 px-2 rounded-md">
            {formatPrice(product.price)}
        </p>
    </div>
  )
}

export default ProductCard