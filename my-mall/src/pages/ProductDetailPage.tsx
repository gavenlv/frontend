import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { getProductById } from '../services/productService'; // Mock API
// import { addToCart } from '../services/cartService'; // Mock API

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  // Add other relevant product details here (e.g., specifications, reviews)
}

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        // Mock API call to fetch product by ID
        // const fetchedProduct = await getProductById(productId!);
        // setProduct(fetchedProduct);

        // Mock data for now:
        if (productId) {
          setProduct({
            id: productId,
            name: `Sample Product ${productId}`,
            description: 'This is a great sample product. High quality, durable, and stylish. Perfect for your needs! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            price: Math.floor(Math.random() * 200) + 50, // Random price between 50 and 250
            imageUrl: `https://via.placeholder.com/600x400?text=Product+${productId}`,
            stock: Math.floor(Math.random() * 100) + 10, // Random stock between 10 and 110
          });
        } else {
          setError('Product ID is missing.');
        }
      } catch (err) {
        setError('Failed to load product details.');
        console.error('Error fetching product (mock):', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;

    setAddingToCart(true);
    setError(null);
    try {
      // Mock API call to add to cart
      // await addToCart(product.id, quantity);
      console.log(`Mock: Added ${quantity} of ${product.name} (ID: ${product.id}) to cart.`);
      alert(`${quantity} ${product.name}(s) added to cart! (Mock)`);
      // Optionally, redirect to cart page or show a success message
    } catch (err) {
      setError('Failed to add product to cart. Please try again.');
      console.error('Error adding to cart (mock):', err);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center">Loading product details...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="p-4 text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden md:flex">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-cover max-h-96" />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 text-sm mb-4">Product ID: {product.id}</p>
            <p className="text-gray-700 mb-4 leading-relaxed">{product.description}</p>
            
            <div className="mb-4">
                <span className="text-3xl font-bold text-red-600">${product.price.toFixed(2)}</span>
                {product.stock > 0 ? (
                    <span className="ml-4 text-sm text-green-600">In Stock ({product.stock} available)</span>
                ) : (
                    <span className="ml-4 text-sm text-red-500">Out of Stock</span>
                )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
                <div className="mb-6 flex items-center">
                    <label htmlFor="quantity" className="mr-3 text-gray-700 font-semibold">Quantity:</label>
                    <select 
                        id="quantity" 
                        value={quantity} 
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="border border-gray-300 rounded p-2 focus:ring-red-500 focus:border-red-500"
                        disabled={product.stock === 0}
                    >
                        {[...Array(Math.min(product.stock, 10)).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                    </select>
                </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-auto">
            <button 
                onClick={handleAddToCart}
                className={`w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out ${product.stock === 0 || addingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={product.stock === 0 || addingToCart}
            >
              {addingToCart ? 'Adding to Cart...' : (product.stock === 0 ? 'Out of Stock' : 'Add to Cart')}
            </button>
            {/* <button className="mt-2 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out">
              Buy Now (Not Implemented)
            </button> */}
          </div>
        </div>
      </div>

      {/* Placeholder for my-mall branding/logo if needed at page bottom or corner */}
      {/* <div className="text-center mt-8">
        <span className="text-lg font-semibold text-gray-700">my-mall</span>
      </div> */}
    </div>
  );
};

export default ProductDetailPage; 