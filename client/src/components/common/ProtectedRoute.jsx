import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './Loading';
import styled from 'styled-components';

const ProtectedRouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ProtectedRoute = ({ roles = [] }) => {
  const { user, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <ProtectedRouteContainer>
      <Outlet />
    </ProtectedRouteContainer>
  );
};

export default ProtectedRoute;