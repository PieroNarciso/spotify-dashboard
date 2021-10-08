import { useAppDispatch } from '@/hooks';
import React from 'react';
import {
  MdLogout,
  MdModeStandby,
  MdOutlineLibraryMusic,
  MdSearch,
  MdStar,
} from 'react-icons/md';

import NavBtn from '../NavBtn';
import { userActions } from '@/store/user';
import { useHistory } from 'react-router-dom';

interface SideBarProps {
  className?: string;
}

const SideBar: React.FC<SideBarProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(userActions.logout());
    history.push('/login');
  };

  return (
    <div
      className={`flex justify-center h-full w-10 ${
        className ? className : ''
      }`}
    >
      <div className="flex flex-col items-center justify-between fixed h-screen py-2">
        {/* ThemeChanger */}
        <div>
          <button className="btn btn-sm btn-circle">
            <MdModeStandby className="w-5 h-5" />
          </button>
        </div>
        {/* Navegation */}
        <div className="flex flex-col gap-y-3">
          <NavBtn to="/">
            <MdOutlineLibraryMusic className="w-5 h-5" />
          </NavBtn>
          <NavBtn to="/artists">
            <MdStar className="w-5 h-5" />
          </NavBtn>
          <NavBtn to="/search">
            <MdSearch className="w-5 h-5" />
          </NavBtn>
        </div>
        {/* Logout */}
        <div>
          <button className="btn btn-circle btn-sm" onClick={logoutHandler}>
            <MdLogout className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
