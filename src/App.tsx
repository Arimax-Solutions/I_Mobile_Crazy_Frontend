// App.js or App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from './components/loginForm';
import Dashboard from './components/dashboard/dashboard.tsx';
import Home from './components/home';
import Layout from './components/layout/layout';
import Item from './components/item/item.tsx';
import User from './components/user/user.tsx';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
