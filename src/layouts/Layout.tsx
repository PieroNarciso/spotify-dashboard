import SideBar from '@/components/SideBar/SideBar';
import { useAppSelector } from '@/hooks';
import React from 'react';

const Layout: React.FC = ({ children }) => {
  const isAuthenticated = useAppSelector(state => state.user.authenticated);

  return (
    <div className={`${isAuthenticated ? 'flex bg-base-200' : ''}`}>
      {isAuthenticated && (
        <div className="shadow-2xl bg-base-100">
          <SideBar />
        </div>
      )}
      <div className="px-4 py-4">{children}</div>
    </div>
  );
};

export default Layout;
