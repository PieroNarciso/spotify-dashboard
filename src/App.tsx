import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Layout from './layouts/Layout';

import Home from '@/views/Home';
import Login from '@/views/Login';
import AuthRoute from '@/components/AuthRoute';
import { useAppDispatch, useAppSelector } from './hooks';
import { spotifyActions } from '@/store/spotify';
import Artist from './views/Artist';
import Search from './views/Search';

const App: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.user.authenticated);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const volume = localStorage.getItem('volume');
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
    if (volume) {
      dispatch(spotifyActions.changeVolume(parseInt(volume)));
    }
  }, []);

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
          <AuthRoute exact path="/artists">
            <Artist />
          </AuthRoute>
          <AuthRoute exact path="/search">
            <Search />
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
