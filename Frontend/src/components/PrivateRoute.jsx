import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const [authUser] = useAuth();
    const location = useLocation();
    return authUser ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default PrivateRoute;
