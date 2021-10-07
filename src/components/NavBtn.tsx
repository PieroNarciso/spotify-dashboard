import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

const NavBtn: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link
      {...props}
      className="btn btn-sm btn-circle bg-primary hover:bg-primary-focus"
    >
      {children}
    </Link>
  );
};

export default NavBtn;
