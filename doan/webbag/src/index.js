import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthProvider from './context/AuthContext';
import 'antd/dist/antd.min.css';
import CartProvider from './context/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>

);


