import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Layout from './layouts/Layout';

import Home from '@/views/Home';
import Login from '@/views/Login';
import AuthRoute from '@/components/AuthRoute';
import { useAppSelector } from './hooks';

const App: React.FC = () => {
  const isAuthenticated = useAppSelector(state => state.user.authenticated);

  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/login">
            {isAuthenticated ? <Redirect to="/" /> : <Login />}
          </Route>
          <AuthRoute exact path="/">
            <Home />
          </AuthRoute>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
