import { useAppDispatch } from '@/hooks';
import React, { useState } from 'react';
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
import ThemeMenu from '../ThemeMenu';

interface SideBarProps {
  className?: string;
}

const SideBar: React.FC<SideBarProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const logoutHandler = () => {
    dispatch(userActions.logout());
    history.push('/login');
  };

  const menuToggle = () => {
    console.log('jsdlf');
    setMenuIsOpen(!menuIsOpen);
  }

  return (
    <div
      className={`flex justify-center h-full w-10 lg:w-28 ${
        className ? className : ''
      }`}
    >
      <div className="flex flex-col items-center justify-between fixed h-screen py-2">
        {/* ThemeChanger */}
        <NavBtn label="Theme" onClick={menuToggle} className="relative">
          <button className="btn btn-sm btn-circle">
            <MdModeStandby className="w-5 h-5" />
          </button>
          {menuIsOpen && (
            <div className="origin-top-left absolute top-10 left-2">
              <ThemeMenu onClose={menuToggle} />
            </div>
          )}
        </NavBtn>
        {/* Navegation */}
        <div className="flex flex-col gap-y-3">
          <NavBtn label="Tracks" to="/">
            <button className="btn btn-sm btn-circle btn-primary">
              <MdOutlineLibraryMusic className="w-5 h-5" />
            </button>
          </NavBtn>
          <NavBtn label="Artists" to="/artists">
            <button className="btn btn-sm btn-circle btn-primary">
              <MdStar className="w-5 h-5" />
            </button>
          </NavBtn>
          <NavBtn label="Search" to="/search">
            <button className="btn btn-primary btn-sm btn-circle">
              <MdSearch className="w-5 h-5" />
            </button>
          </NavBtn>
        </div>
        {/* Logout */}
        <NavBtn label="Logout" onClick={logoutHandler}>
          <button className="btn btn-circle btn-sm">
            <MdLogout className="w-5 h-5" />
          </button>
        </NavBtn>
      </div>
    </div>
  );
};

export default SideBar;
