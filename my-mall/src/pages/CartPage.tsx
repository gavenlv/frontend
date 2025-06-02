import { Link } from 'react-router';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m7.5-5v9a2 2 0 01-2 2H9a2 2 0 01-2-2v-9m7.5 0a2 2 0 002-2 2 2 0 00-2-2H9a2 2 0 00-2 2 2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">购物车是空的</h3>
            <p className="mt-2 text-gray-500">还没有添加任何商品到购物车</p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700"
              >
                继续购物
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">购物车</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section className="lg:col-span-7">
            <div className="bg-white shadow rounded-lg">
              <ul className="divide-y divide-gray-200">
                {state.items.map((item) => (
                  <li key={item.productId} className="p-6">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="ml-6 flex-1">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-lg font-medium text-gray-900">
                              <Link to={`/product/${item.productId}`} className="hover:text-red-600">
                                {item.name}
                              </Link>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.category && `分类: ${item.category}`}
                            </p>
                          </div>
                          <div className="ml-4 flex-shrink-0 flow-root">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.productId)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <span className="sr-only">删除</span>
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <label htmlFor={`quantity-${item.productId}`} className="sr-only">
                              数量
                            </label>
                            <select
                              id={`quantity-${item.productId}`}
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                              className="rounded border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 sm:text-sm"
                            >
                              {[...Array(10)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                          <p className="text-lg font-medium text-gray-900">
                            ¥{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 订单摘要 */}
          <section className="mt-16 bg-white rounded-lg shadow px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5">
            <h2 className="text-lg font-medium text-gray-900">订单摘要</h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">小计</dt>
                <dd className="text-sm font-medium text-gray-900">¥{getTotalPrice().toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-sm text-gray-600">运费</dt>
                <dd className="text-sm font-medium text-gray-900">免费</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">总计</dt>
                <dd className="text-base font-medium text-gray-900">¥{getTotalPrice().toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              <Link
                to="/checkout"
                className="w-full bg-red-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-red-500 flex items-center justify-center"
              >
                去结算
              </Link>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-500">
                或者{' '}
                <Link to="/" className="text-red-600 font-medium hover:text-red-500">
                  继续购物
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 