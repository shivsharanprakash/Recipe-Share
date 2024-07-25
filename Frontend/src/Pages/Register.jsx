import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
  const [credentials, setCredentials] = useState({ email: '', name: '', password: '' });
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const response = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      })
    });
    const json = await response.json();
    if (response.status === 201) {
      alert("Account Created Successfully");
      navigate('/login');
    } else {
      setError(json.message || "An error occurred");
    }
  };


  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <form className='border p-6 rounded-lg shadow-lg bg-gray-800 w-full max-w-md' onSubmit={handleSubmit}>
        <h3 className='text-2xl font-semibold text-white text-center mb-6'>Register</h3>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}

        <div className='mt-4'>
          <label className='block text-gray-400'>Name</label>
          <input
            type="text"
            placeholder='Enter your name'
            name='name'
            value={credentials.name}
            onChange={onChange}
            className='w-full px-3 py-2 mt-2 border rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white'
          />
        </div>
        <div className='mt-4'>
          <label className='block text-gray-400'>Email</label>
          <input
            type="email"
            name='email'
            value={credentials.email}
            placeholder='Enter your email'
            onChange={onChange}
            className='w-full px-3 py-2 mt-2 border rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white'
          />
        </div>
        <div className='mt-4'>
          <label className='block text-gray-400'>Password</label>
          <input
            type="password"
            name='password'
            value={credentials.password}
            onChange={onChange}
            placeholder='Enter your password'
            className='w-full px-3 py-2 mt-2 border rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white'
          />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button className='btn bg-yellow-500 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-600'>Submit</button>
          <Link to="/login" className='text-blue-300 hover:text-blue-500'>Already have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
