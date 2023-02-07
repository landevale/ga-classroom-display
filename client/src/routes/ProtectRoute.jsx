import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

export default function ProtectRoute() {
  const [user] = UserAuth();

  if (user.loading) {
    return (
      <>Loading</>
    );
  }
  return user.data ? <Outlet /> : <Navigate to="/login" />;
};