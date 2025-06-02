import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* 主要内容区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-2 rounded-lg font-bold text-lg">
                ✨ M
              </div>
              <span className="ml-3 text-xl font-bold">我的商城</span>
            </div>
            <p className="text-gray-400 mb-4">
              专注为您提供个性化购物体验，精选全球优质商品，让购物变得更简单、更快乐。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <span className="text-xl">📧</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <span className="text-xl">📷</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <span className="text-xl">💬</span>
              </a>
            </div>
          </div>

          {/* 购物指南 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">购物指南</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help/order" className="text-gray-400 hover:text-white transition-colors">
                  如何下单
                </Link>
              </li>
              <li>
                <Link to="/help/payment" className="text-gray-400 hover:text-white transition-colors">
                  支付方式
                </Link>
              </li>
              <li>
                <Link to="/help/shipping" className="text-gray-400 hover:text-white transition-colors">
                  配送说明
                </Link>
              </li>
              <li>
                <Link to="/help/return" className="text-gray-400 hover:text-white transition-colors">
                  退换货政策
                </Link>
              </li>
              <li>
                <Link to="/help/warranty" className="text-gray-400 hover:text-white transition-colors">
                  售后保障
                </Link>
              </li>
            </ul>
          </div>

          {/* 服务支持 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">服务支持</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-gray-400 hover:text-white transition-colors">
                  意见反馈
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  常见问题
                </Link>
              </li>
              <li>
                <Link to="/service" className="text-gray-400 hover:text-white transition-colors">
                  在线客服
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">
                  网站地图
                </Link>
              </li>
            </ul>
          </div>

          {/* 关于我们 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-300">关于我们</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  公司介绍
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white transition-colors">
                  加入我们
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white transition-colors">
                  新闻动态
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  服务条款
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 底部版权信息 */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 我的商城 MyMall. 版权所有 | 个性化购物新体验
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>🔒 安全认证</span>
              <span>✅ 品质保证</span>
              <span>🚚 极速配送</span>
              <span>💯 正品保障</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 