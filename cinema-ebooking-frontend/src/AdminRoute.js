import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
	return sessionStorage.getItem('isAdmin') === 'true';
};

// Custom Route component to protect routes
export default function AdminRoute({ component: Component}) {
	return (
		isAuthenticated() ? <Component /> : <Navigate to="/login" />
	);
}