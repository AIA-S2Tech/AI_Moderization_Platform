import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';
import { ROUTES } from '../../config/routes';
import AppShell from '../layout/AppShell';
import IdleTimeHandler from './idleTimeHandler';

// Auth guard for every private page. Wraps the page in the AppShell (TopNav),
// which replaces the old SmartHire SideNav (T-39).
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }
  return (
    <>
      <IdleTimeHandler />
      <AppShell>{children}</AppShell>
    </>
  );
};

export default ProtectedRoute;
