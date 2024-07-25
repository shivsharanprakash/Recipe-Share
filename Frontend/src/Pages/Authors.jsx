import React, { useState, useEffect } from 'react';
import Author from '../components/Author';
import Navbar from '../components/Navbar';

const Authors = () => {
  const [auth, setAuth] = useState([]);

  useEffect(() => {
    const getAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/auth");
        const data = await res.json();
        setAuth(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuth();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        {auth && auth.map((author) => (
          <Author key={author._id} auth={author} />
        ))}
      </div>
    </div>
  );
};

export default Authors;
