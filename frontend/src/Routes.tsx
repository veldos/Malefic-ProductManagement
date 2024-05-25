import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductList from './pages/Product/ProductList';
import ProductDetailPage from './pages/Product/ProductDetailPage';
import ProductCreatePage from './pages/Product/CreateProduct';
import ProductEditPage from './pages/Product/ProductEditPage';
import Layout from './Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from './AuthLayout';
// import Cart from './pages/productclient/Cart';
// import ClientDashboard from './pages/productclient/ClientDashboard';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/create" element={<ProductCreatePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/product/edit/:id" element={<ProductEditPage />} />
          {/* <Route path="/client/cart" element={<Cart />} />
          <Route path="/client/dashboard" element={<ClientDashboard />} /> */}
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;