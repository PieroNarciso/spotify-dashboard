import { useAppSelector } from '@/hooks';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

const AuthRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const isAuthenticated = useAppSelector((state) => state.user.authenticated);

  return (
    <Route {...props}>
      {isAuthenticated ? children : <Redirect to="/login" />}
    </Route>
  );
};

export default AuthRoute;
