import SideBar from '@/components/SideBar/SideBar';
import { useAppSelector } from '@/hooks';
import React from 'react';

const Layout: React.FC = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.user.authenticated);
  const profile = useAppSelector((state) => state.user.profile);

  return (
    <div className={` ${isAuthenticated ? 'flex bg-base-200' : ''}`}>
      {isAuthenticated && (
        <div className="shadow-2xl bg-base-100">
          <SideBar />
        </div>
      )}
      <div className="min-h-screen w-full">
        {isAuthenticated && profile && (
          <div className="flex justify-end items-center px-3 py-2">
            <span className="tracking-wide cursor-default font-medium">
              {profile.display_name}
            </span>
            <div className="avatar ml-2">
              <div className="rounded-full w-7 h-7">
                <img src={profile.images[0].url} alt={profile.display_name}/>
              </div>
            </div>
          </div>
        )}
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
