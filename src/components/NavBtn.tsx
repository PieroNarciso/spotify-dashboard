import React from 'react';
import { NavLink } from 'react-router-dom';

interface LinkWrapperProps {
  to?: string;
  activeClassName?: string;
  className?: string;
  onClick?: () => void;
}

const LinkWrapper: React.FC<LinkWrapperProps> = (props) => {
  if (props.to)
    return (
      <NavLink
        exact
        activeClassName={props.activeClassName}
        className={props.className}
        to={props.to}
        onClick={props.onClick}
      >
        {props.children}
      </NavLink>
    );
  else
    return (
      <div className={props.className} onClick={props.onClick}>
        {props.children}
      </div>
    );
};

interface NavBtn {
  to?: string;
  onClick?: () => void;
  label: string;
  className?: string;
}

const NavBtn: React.FC<NavBtn> = (props) => {
  return (
    <LinkWrapper
      to={props.to}
      activeClassName={props.to ? 'bg-base-200' : ''}
      onClick={props.onClick}
      className={`flex items-center justify-center cursor-pointer hover:opacity-75 rounded px-1 py-1 ${
        props.className ? props.className : ''
      }`}
    >
      {props.children}
      <span onClick={props.onClick} className="hidden ml-2 lg:block">{props.label}</span>
    </LinkWrapper>
  );
};

export default NavBtn;
