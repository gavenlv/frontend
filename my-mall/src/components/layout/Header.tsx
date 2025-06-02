import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, state: authState, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* 顶部栏 */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-8">
            <div className="flex items-center space-x-4">
              <span className="text-white">🛍️ 我的商城 - 个性化购物体验</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="text-white hover:text-yellow-300 transition-colors"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <span className="text-white">
                    Hi，{authState.user?.name} 👋
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-pink-200 hover:text-white transition-colors"
                  >
                    退出
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="text-pink-200 hover:text-white transition-colors"
                  >
                    登录
                  </Link>
                  <span className="text-purple-300">|</span>
                  <Link
                    to="/register"
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    注册
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 主导航栏 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl shadow-lg group-hover:shadow-xl transition-all">
              ✨ M
            </div>
            <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              我的商城
            </span>
            <span className="ml-2 text-sm text-gray-500 hidden sm:block">MyMall</span>
          </Link>

          {/* 搜索框 */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 发现你的心仪商品..."
                className="w-full px-4 py-3 pl-4 pr-12 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
              >
                搜索
              </button>
            </form>
          </div>

          {/* 购物车和导航 */}
          <div className="flex items-center space-x-6">
            <Link
              to="/cart"
              className="relative flex items-center text-gray-700 hover:text-purple-600 transition-colors group"
            >
              <div className="relative">
                <svg
                  className="w-6 h-6 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m7.5-5v9a2 2 0 01-2 2H9a2 2 0 01-2-2v-9m7.5 0a2 2 0 002-2 2 2 0 00-2-2H9a2 2 0 00-2 2 2 2 0 002 2z"
                  />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <span className="ml-2 font-medium">购物车</span>
            </Link>

            {isAuthenticated && (
              <Link
                to="/profile"
                className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                个人中心
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 分类导航 */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 h-12 items-center">
            <Link
              to="/category/electronics"
              className="flex items-center text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              <span className="mr-1">📱</span>
              数码电器
            </Link>
            <Link
              to="/category/fashion"
              className="flex items-center text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              <span className="mr-1">👕</span>
              时尚服饰
            </Link>
            <Link
              to="/category/home"
              className="flex items-center text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              <span className="mr-1">🏠</span>
              家居生活
            </Link>
            <Link
              to="/category/beauty"
              className="flex items-center text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              <span className="mr-1">💄</span>
              美妆个护
            </Link>
            <Link
              to="/category/sports"
              className="flex items-center text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              <span className="mr-1">⚽</span>
              运动健康
            </Link>
            <Link
              to="/category/books"
              className="flex items-center text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              <span className="mr-1">📚</span>
              图书文娱
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 