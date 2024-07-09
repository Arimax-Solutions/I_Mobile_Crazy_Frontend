import React from 'react';
import LoginForm from './components/loginForm';
import Dashboard from './components/dashboard';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/home';
import Layout from './components/layout/layout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<LoginForm />} />
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
