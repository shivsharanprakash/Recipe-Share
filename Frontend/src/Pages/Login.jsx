import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const [_, setAuthUser] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const json = await response.json();
      if (response.status === 200) {
        alert("Logged in Successfully");
        const user = {
          name: json.user.name,
          email: credentials.email,
          authToken: json.authToken
        };
        localStorage.setItem("User", JSON.stringify(user));
        setAuthUser(user);
        navigate('/');
      } else {
        alert(json.message || "Invalid Credentials");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred during login. Please try again.");
    }
  };


  const onchange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <form onSubmit={handleSubmit} className='border p-6 rounded-lg shadow-lg bg-gray-800 w-full max-w-md'>
        <h3 className='text-2xl font-semibold text-white text-center mb-6'>Login</h3>
        <div className='mt-4'>
          <label className='block text-gray-400'>Email</label>
          <input
            type="email"
            placeholder='Enter your email'
            value={credentials.email}
            name='email'
            id='email'
            onChange={onchange}
            required
            className='w-full px-3 py-2 mt-2 border rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white'
          />
        </div>
        <div className='mt-4'>
          <label className='block text-gray-400'>Password</label>
          <input
            type="password"
            placeholder='Enter your password'
            value={credentials.password}
            name='password'
            id='password'
            onChange={onchange}
            required
            className='w-full px-3 py-2 mt-2 border rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white'
          />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button className='btn bg-yellow-500 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-600'>Submit</button>
          <Link to="/register" className='underline text-blue-300 hover:text-blue-500'>Register</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
