// App.js or App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './components/loginForm';
import Dashboard from './components/dashboard/dashboard.tsx';
import Home from './components/home';
import Layout from './components/layout/layout';
import Item from './components/item/item.tsx';
import User from './components/user/user.tsx';
import Shop from './components/shop/shop.tsx';
import StockPhones from './components/stock-phones/stockPhones.tsx';
import ReturnPhone from './components/return-phone/retun-phone.tsx';
import Order from './components/order/order.tsx';
import ProceedPayment from './components/proceed-payment/proceed-payment.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home" element={<Home />} />
          <Route path="user" element={<User />} />
          <Route path="item" element={<Item />} />
          <Route path="shop" element={<Shop />} />
          <Route path="stockPhones" element={<StockPhones />} />
          <Route path="returnPhone" element={<ReturnPhone />} />
          <Route path="order" element={<Order />} />
          <Route path=':orderType' element={<ProceedPayment />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
