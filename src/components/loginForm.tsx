import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import '../index.css';

interface UserData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const userData: UserData = { username: username, password: password };
    try {
      const response = await axios.post('http://localhost:8080/auth/login', userData);
      
      if (response.data.token) {
        Swal.fire({
          title: "Success!",
          text: "Login successful.",
          icon: "success"
        });
        setUsername("");
        setPassword("")
        setError('');
        // Handle successful login (e.g., store token, redirect)
        console.log('Login successful', response.data);
      } else {
        Swal.fire({
          title: "Error!",
          text: response.data.message || "Invalid username or password.",
          icon: "error"
        });
        setError('Invalid username or password');
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Invalid username or password.",
        icon: "error"
      });
      // Handle error (e.g., show error message)
      console.error('Login failed', error);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex h-screen bg-gradient-custom">
      <div className="w-1/2 flex justify-center items-center">
        <img
          src="src/assets/images/Group 160.png"
          alt="main image"
          className="rounded-right w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="mb-8">
          <img
            src="src/assets/images/logo.png"
            alt="logo"
            className="w-[15vw] h-[30vh] object-contain"
          />
        </div>
        <div className="flex flex-col items-center space-y-4">
          <input
            placeholder="user name"
            className="p-2 rounded-md border border-gray-400 w-[30vw] m-3"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            className="p-2 rounded-md border border-gray-400 w-[30vw] m-3"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          {error && <div className="text-red-500">{error}</div>}
          <button type="button" onClick={handleLogin} className="custom-border-colour w-[10vw] h-[5vh]">
            <span className="custom-font-colour">Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
}
