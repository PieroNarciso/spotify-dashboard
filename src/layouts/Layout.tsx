import React from 'react';


const Layout: React.FC = ({ children }) => {
  return (
    <div className="my-4 mx-4">
      {children}
    </div>
  )
};

export default Layout;
