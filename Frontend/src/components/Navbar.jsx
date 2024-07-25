import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider';
const Navbar = () => {
    const [authUser, setAuthUser] = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('User');
        setAuthUser(null);
        navigate('/login');
    }

    const onClick = () => {
        navigate('/profile')
    }

    let navinfo = (
        <>
            <li><Link to='/' className='text-white'>Home</Link></li>
            {!authUser ?
                <li>
                    <Link to='/login' className='text-white'>Share Recipes</Link>
                </li> :
                <Link to='/share' className='text-white my-auto'>Share Recipes</Link>}
            <li><Link to='/course' className='text-white'>Cuisine</Link></li>
            <li><Link to='/authors' className='text-white'>Authors</Link></li>
        </>
    )
    return (
        <>
            <div>
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {navinfo}
                            </ul>
                        </div>
                        <h1 className=" mx-auto text-4xl font-bold md:font-extrabold font-sans text-green-500">Recipe Exchanger</h1>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navinfo}
                        </ul>
                    </div>
                    {!authUser ?
                        <div className="navbar-end space-x-4">
                            <Link to='/login' className="btn text-white">Login</Link>
                        </div> :
                        <div className="navbar-end space-x-4">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full " onClick={onClick}>
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>

                            <Link onClick={handleLogout} className="btn text-white bg-red-500">Logout</Link>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default Navbar
