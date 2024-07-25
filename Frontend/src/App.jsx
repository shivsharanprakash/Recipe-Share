import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import Authors from './Pages/Authors';
import Course from './Pages/Course';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Share from './Pages/Share';
import  { useAuth } from './context/AuthProvider';

function App() {
    const [authUser] = useAuth();
    return (
        <> 
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/course' element={<Course />} />
                <Route path='/authors' element={<Authors />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/share' element={authUser ? <Share /> : <Navigate to='/login' />} />
                <Route path='/profile' element={authUser ? <Profile /> : <Navigate to='/login' />} />
            </Routes>          
        </>
    );
}

export default App;
