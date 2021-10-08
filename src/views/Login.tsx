import React from 'react';
import { BsSpotify, BsGithub } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

import { AUTH_LINK } from '@/api';
import { useAppDispatch, useHashQuery } from '@/hooks';
import { userActions } from '@/store/user';
import { getUserProfile } from '@/store/user.thunks';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const query = useHashQuery();

  const token = query.get('access_token');
  if (token) {
    dispatch(userActions.authenticate(token));
    dispatch(getUserProfile());
    history.push('/');
  }

  return (
    <React.Fragment>
      <div className="flex flex-col h-screen w-screen absolute top-0 left-0 items-center justify-center">
        <div>
          <h1 className="text-xl font-medium tracking-wide">Spotify Dashboard</h1>
        </div>
        <div className="mt-4">
          <a href={AUTH_LINK} className="btn btn-primary">
            LOGIN
            <BsSpotify className="w-6 h-6 ml-2" />
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full flex items-center justify-center p-3">
        <span className="">
          Piero Narciso
        </span>
        <a className="btn btn-sm btn-circle ml-2">
          <BsGithub className="w-5 h-5" />
        </a>
      </div>
    </React.Fragment>
  );
};

export default Login;
