import { useAppDispatch } from '@/hooks';
import React from 'react';
import {
  MdLogout,
  MdModeStandby,
  MdOutlineLibraryMusic,
  MdSearch,
  MdStar,
  MdVolumeUp,
} from 'react-icons/md';

import NavBtn from '../NavBtn';
import { userActions } from '@/store/user';
import { useHistory } from 'react-router-dom';
import ThemeMenu from '../ThemeMenu';
import VolumeSwitcher from '../VolumeSwitcher';
import Menu from '../Menu/Menu';
import MenuButton from '../Menu/MenuButton';
import MenuContainer from '../Menu/MenuContainer';

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
      className={`flex justify-center h-full w-10 lg:w-28 ${
        className ? className : ''
      }`}
    >
      <div className="flex flex-col items-center justify-between fixed h-screen py-2">
        {/* ThemeChanger */}
        <div className="flex flex-col items-center lg:items-start">
          <Menu>
            <MenuButton className="flex items-center px-1 py-1 hover:opacity-75">
              <span className="btn btn-circle btn-sm">
                <MdModeStandby className="w-5 h-5" />
              </span>
              <span className="ml-2 hidden lg:block">Theme</span>
            </MenuButton>
            <MenuContainer>
              <div className="origin-top-left absolute top-2 left-11 lg:left-28 z-30">
                <ThemeMenu />
              </div>
            </MenuContainer>
          </Menu>
          <Menu className="relative">
            <MenuButton className="flex items-center px-1 py-1 hover:opacity-75">
              <span className="btn btn-sm btn-circle">
                <MdVolumeUp />
              </span>
              <span className="ml-2 hidden lg:block">Volume</span>
            </MenuButton>
            <MenuContainer>
              <VolumeSwitcher className="absolute origin-top-top left-11 lg:left-28 top-1 w-60" />
            </MenuContainer>
          </Menu>
        </div>
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
