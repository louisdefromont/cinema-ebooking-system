import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
	return sessionStorage.getItem('isLoggedIn') === 'true';
};

// Custom Route component to protect routes
export default function UserRoute({ component: Component}) {
	return (
		isAuthenticated() ? <Component /> : <Navigate to="/login" />
	);
}