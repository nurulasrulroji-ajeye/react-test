import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

type ProtectedRouteProps = {
  children: React.ReactNode;
};
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authorization } = useAppSelector((state) => state.auth.auth);
  console.log(authorization);

  if (!authorization) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
