import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { ProductDetailDTO } from "@repo/schemas";
import SkeletonLoader from "./Skeletons/ProductSkeleton";
import { formatPrice } from '../utils/index';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetailDTO | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: number }>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      navigate("/search");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(response.data);
        setSelectedImage(response.data.image ?? null);
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/search");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleOptionChange = (optionId: number, valueId: number) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: valueId }));
  };

  const handleAddToCart = () => {
    console.log("Adding to cart with options:", selectedOptions);
  };

  const handleImageSelection = (image: string | null) => {
    setSelectedImage(image);
  };

  if (!product) return <SkeletonLoader/>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex justify-center items-start p-6">
      
      
      {/* Card Container */}
      <div className="relative bg-gray-900 text-gray-300 rounded-lg shadow-2xl max-w-5xl w-full p-8 border-[1px] border-gray-600">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-200 transition-colors"
        >
          <FaArrowLeft size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Image Section */}
          <div className="md:col-span-2">
            <div className="relative">
              <img
                src={selectedImage ?? product.image ?? "/placeholder.png"}
                alt={product.name}
                className="w-full max-h-[500px] object-cover rounded-md shadow-lg border-[2px] border-gray-600"
              />
            </div>
            <div className="flex mt-6 gap-4 flex-wrap">
              {/* Include the main product image as an option */}
              <button
                className={`w-24 h-24 rounded-md overflow-hidden shadow-md transition-all duration-300 ${
                  selectedImage === product.image
                    ? "ring-4 ring-blue-500"
                    : "bg-gray-700 hover:opacity-80"
                }`}
                onClick={() => handleImageSelection(product.image)}
              >
                <img
                  src={product.image ?? "/placeholder.png"}
                  alt="Main product"
                  className="w-full h-full object-cover"
                />
              </button>
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  className={`w-24 h-24 rounded-md overflow-hidden shadow-md transition-all duration-300 ${
                    selectedImage === variant.image
                      ? "ring-4 ring-blue-500"
                      : "bg-gray-700 hover:opacity-80"
                  }`}
                  onClick={() => handleImageSelection(variant.image)}
                >
                  <img
                    src={variant.image ?? "/placeholder.png"}
                    alt={variant.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-1">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl mt-2 text-blue-400 font-semibold">{formatPrice(product.price)}</p>
            <p className="mt-4 text-sm text-gray-400">{product.description}</p>

            {/* Options */}
            {product.variants.map((variant) => (
              
              <div key={variant.id} className="mt-6">
                <h2 className="text-base font-medium mb-2">{variant.name}</h2>
                <div className="flex gap-2 flex-wrap">
                  {variant.optionValues.map((value) => (
                    <button
                      key={value.id}
                      className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                        selectedOptions[String(variant.id)] === value.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-500 hover:bg-gray-400 text-gray-200"
                      }`}
                      onClick={() => handleOptionChange(variant.id, value.id)}
                    >
                      {value.value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
