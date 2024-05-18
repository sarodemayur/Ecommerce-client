import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import ProductProvider from './contexts/ProductContext';
import SidebarProvider from './contexts/SidebarContext';
import CartProvider from './contexts/Cartcontext';
import { AuthProvider } from './contexts/Authcontext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<AuthProvider>
<SidebarProvider>
  <CartProvider>
  {/* <ProductProvider> */}
    <App />
    <ToastContainer
    position='top-right'
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme='colored'
    bodyClassName="toastBody"
    />
  {/* </ProductProvider> */}
  </CartProvider>
  </SidebarProvider>
  </AuthProvider>
);
