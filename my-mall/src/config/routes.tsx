import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../components/layout/Layout';

const HomePage = lazy(() => import('../pages/HomePage'));
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'));
const CartPage = lazy(() => import('../pages/ShoppingCartPage'));
const CategoryPage = lazy(() => import('../pages/CategoryPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const RegistrationPage = lazy(() => import('../pages/RegistrationPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'category/:categoryId', element: <CategoryPage /> },
      { path: 'product/:productId', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegistrationPage /> },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      // 其他路由...
    ],
  },
]);