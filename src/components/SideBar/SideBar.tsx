import React from 'react';
import { MdArtTrack, MdLogout, MdModeStandby } from 'react-icons/md'
import { Link } from 'react-router-dom';

interface SideBarProps {
  className?: string;
}

const SideBar: React.FC<SideBarProps> = ({ className }) => {
  return (
    <div className={`flex justify-center h-full w-10 ${className ? className : ''}`}>
      <div className="flex flex-col items-center justify-between fixed h-screen py-2">
        {/* ThemeChanger */}
        <div>
          <button className="btn btn-sm btn-circle">
            <MdModeStandby className="w-5 h-5" />
          </button>
        </div> 
        {/* Navegation */}
        <div className="flex flex-col gap-y-3">
          <Link className="btn btn-sm btn-circle bg-primary hover:bg-primary-focus" to="/">
            <MdArtTrack className="w-5 h-5"/>
          </Link>
          <Link className="btn btn-sm btn-circle bg-primary hover:bg-primary-focus" to="/">
            <MdArtTrack className="w-5 h-5"/>
          </Link>
          <Link className="btn btn-sm btn-circle bg-primary hover:bg-primary-focus" to="/">
            <MdArtTrack className="w-5 h-5"/>
          </Link>
        </div>
        {/* Logout */}
        <div>
          <button className="btn btn-circle btn-sm">
            <MdLogout className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
};

export default SideBar;
