import React from 'react';
import LoginForm from './components/loginForm';
import Dashboard from './components/dashboard';
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
       <BrowserRouter>
       <Routes>
       <Route path="/" element={<LoginForm />} />
       <Route path="/dashboard" element={<Dashboard />} />
       </Routes>
       </BrowserRouter>
  );
}

export default App;
