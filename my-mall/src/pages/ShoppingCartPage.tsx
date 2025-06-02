import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { getCartItems, updateCartItemQuantity, removeCartItem } from '../services/cartService'; // Mock API

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  stock: number;
}

// Mock cart data - in a real app, this would come from a context, Redux store, or API
const initialMockCart: CartItem[] = [
  {
    id: 'cart-item-1',
    productId: 'prod-123',
    name: 'Elegant Smartwatch Series 7',
    price: 299.99,
    quantity: 1,
    imageUrl: 'https://via.placeholder.com/150?text=Smartwatch',
    stock: 10,
  },
  {
    id: 'cart-item-2',
    productId: 'prod-456',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 199.50,
    quantity: 2,
    imageUrl: 'https://via.placeholder.com/150?text=Headphones',
    stock: 5,
  },
];

const ShoppingCartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialMockCart);
  const [loading, setLoading] = useState(false); // For API calls
  const [error, setError] = useState<string | null>(null);

  // In a real app, you'd fetch cart items from your service/context
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     setLoading(true);
  //     try {
  //       // const items = await getCartItems();
  //       // setCartItems(items);
  //     } catch (err) {
  //       setError('Failed to load cart items.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCart();
  // }, []);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Or handle removal if quantity is 0
    
    // Find item to check against stock
    const itemToUpdate = cartItems.find(item => item.id === itemId);
    if (itemToUpdate && newQuantity > itemToUpdate.stock) {
        alert(`Cannot add more than ${itemToUpdate.stock} items for ${itemToUpdate.name}.`);
        return;
    }

    setLoading(true);
    try {
      // Mock API call
      // await updateCartItemQuantity(itemId, newQuantity);
      setCartItems(prevItems => 
        prevItems.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item)
      );
      console.log(`Mock: Updated quantity for item ${itemId} to ${newQuantity}`);
    } catch (err) {
      setError('Failed to update item quantity.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setLoading(true);
    try {
      // Mock API call
      // await removeCartItem(itemId);
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
      console.log(`Mock: Removed item ${itemId} from cart`);
    } catch (err) {
      setError('Failed to remove item from cart.');
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shippingEstimate = cartItems.length > 0 ? 5.00 : 0; // Example shipping
  const taxEstimate = subtotal * 0.08; // Example 8% tax
  const orderTotal = subtotal + shippingEstimate + taxEstimate;

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-lg shadow-md">
            <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
            <Link to="/" className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-150">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:flex lg:gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 border-b border-gray-200 md:flex md:items-center md:justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                      <div>
                        <Link to={`/product/${item.productId}`} className="text-lg font-semibold text-gray-800 hover:text-red-600">{item.name}</Link>
                        <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">In Stock: {item.stock}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end md:w-auto w-full">
                      <div className="flex items-center mr-4">
                        <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantity</label>
                        <select 
                            id={`quantity-${item.id}`}
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            className="border border-gray-300 rounded p-2 focus:ring-red-500 focus:border-red-500 text-sm w-20"
                            disabled={loading}
                        >
                            {[...Array(Math.min(item.stock, 10)).keys()].map(x => (
                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                            ))}
                        </select>
                      </div>
                      <p className="font-semibold text-gray-800 w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700 font-semibold text-sm disabled:opacity-50"
                        disabled={loading}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping estimate</span>
                  <span className="text-gray-800 font-semibold">${shippingEstimate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Tax estimate</span>
                  <span className="text-gray-800 font-semibold">${taxEstimate.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">Order total</span>
                  <span className="text-xl font-bold text-red-600">${orderTotal.toFixed(2)}</span>
                </div>
                <button 
                  className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out focus:outline-none focus:shadow-outline disabled:opacity-50"
                  // onClick={() => navigate('/checkout')} // TODO: Implement checkout page
                  disabled={loading || cartItems.length === 0}
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                <div className="text-center mt-4">
                  <Link to="/" className="text-red-500 hover:text-red-700 font-medium">
                    or Continue Shopping
                  </Link>
                </div>
              </div>
              <div className="text-center mt-6">
                <span className="text-md font-semibold text-gray-600">my-mall</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage; 