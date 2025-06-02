import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  sales: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max 256GB 深空黑色',
    price: 9999,
    originalPrice: 10999,
    image: '/api/placeholder/300/300',
    category: 'electronics',
    rating: 4.8,
    sales: 1234,
  },
  {
    id: '2',
    name: 'MacBook Pro 14英寸 M3芯片 银色',
    price: 14999,
    originalPrice: 16999,
    image: '/api/placeholder/300/300',
    category: 'electronics',
    rating: 4.9,
    sales: 567,
  },
  {
    id: '3',
    name: 'Nike Air Jordan 1 限量版运动鞋',
    price: 1299,
    originalPrice: 1899,
    image: '/api/placeholder/300/300',
    category: 'fashion',
    rating: 4.7,
    sales: 2345,
  },
  {
    id: '4',
    name: '小米14 Ultra 摄影旗舰 512GB',
    price: 5999,
    originalPrice: 6999,
    image: '/api/placeholder/300/300',
    category: 'electronics',
    rating: 4.6,
    sales: 890,
  },
  {
    id: '5',
    name: 'Dyson V15 无绳吸尘器',
    price: 3999,
    originalPrice: 4899,
    image: '/api/placeholder/300/300',
    category: 'home',
    rating: 4.8,
    sales: 456,
  },
  {
    id: '6',
    name: 'Apple Watch Series 9 45mm',
    price: 2999,
    originalPrice: 3299,
    image: '/api/placeholder/300/300',
    category: 'electronics',
    rating: 4.7,
    sales: 789,
  },
];

const banners = [
  {
    id: 1,
    image: '/api/placeholder/1200/400',
    title: '💎 我的商城周年庆',
    subtitle: '全场商品 5折起，尊享会员专属优惠',
    link: '/category/electronics',
    bgColor: 'from-purple-600 to-pink-600',
  },
  {
    id: 2,
    image: '/api/placeholder/1200/400',
    title: '🔥 新品首发季',
    subtitle: 'iPhone 15系列 | 预约享好礼',
    link: '/product/1',
    bgColor: 'from-blue-600 to-purple-600',
  },
  {
    id: 3,
    image: '/api/placeholder/1200/400',
    title: '🏠 品质生活馆',
    subtitle: '精选家居好物，打造理想生活空间',
    link: '/category/home',
    bgColor: 'from-green-600 to-blue-600',
  },
];

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 轮播图 */}
      <section className="relative h-96 overflow-hidden bg-gradient-to-r from-purple-100 to-pink-100">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentBanner 
                ? 'opacity-100 transform scale-100' 
                : 'opacity-0 transform scale-105'
            }`}
          >
            <Link to={banner.link} className="block h-full">
              <div className={`h-full bg-gradient-to-r ${banner.bgColor} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <div className="text-center text-white max-w-4xl mx-auto px-4">
                    <h2 className="text-5xl font-bold mb-4 animate-fade-in">{banner.title}</h2>
                    <p className="text-2xl mb-6 opacity-90">{banner.subtitle}</p>
                    <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
                      立即抢购 →
                    </button>
                  </div>
                </div>
                {/* 装饰元素 */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
              </div>
            </Link>
          </div>
        ))}
        
        {/* 轮播指示器 */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-4 h-4 rounded-full transition-all ${
                index === currentBanner 
                  ? 'bg-white shadow-lg scale-110' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 分类导航 */}
      <section className="bg-white py-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 精选分类</h2>
            <p className="text-gray-600">发现你的专属购物世界</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: '数码电器', icon: '📱', link: '/category/electronics', gradient: 'from-blue-500 to-purple-600' },
              { name: '时尚服饰', icon: '👕', link: '/category/fashion', gradient: 'from-pink-500 to-red-500' },
              { name: '家居生活', icon: '🏠', link: '/category/home', gradient: 'from-green-500 to-teal-600' },
              { name: '美妆个护', icon: '💄', link: '/category/beauty', gradient: 'from-purple-500 to-pink-500' },
              { name: '运动健康', icon: '⚽', link: '/category/sports', gradient: 'from-orange-500 to-red-600' },
              { name: '图书文娱', icon: '📚', link: '/category/books', gradient: 'from-indigo-500 to-blue-600' },
            ].map((category) => (
              <Link
                key={category.name}
                to={category.link}
                className="group flex flex-col items-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {category.icon}
                </div>
                <span className="text-lg font-medium text-gray-700 group-hover:text-purple-600 transition-colors">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 热门商品 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">🔥 热门推荐</h2>
            <p className="text-xl text-gray-600">精选优质商品，品质生活从这里开始</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <Link to={`/product/${product.id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      热销
                    </div>
                    {product.originalPrice && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        省¥{product.originalPrice - product.price}
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-purple-600 line-clamp-2 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
                    </div>
                    <span className="ml-auto text-sm text-gray-500">已售 {product.sales}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-red-600">¥{product.price}</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-lg text-gray-400 line-through">¥{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    🛒 加入购物车
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 品牌展示 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🏆 品牌合作伙伴</h2>
            <p className="text-gray-600">与全球知名品牌携手，为您提供优质产品</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG'].map((brand) => (
              <div key={brand} className="flex items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <span className="text-xl font-bold text-gray-600">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 