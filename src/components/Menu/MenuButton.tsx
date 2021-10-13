import React, { useContext } from 'react';
import { MenuContext } from './Menu';

interface MenuButtonProps {
  className?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ children, className }) => {
  const { onToggle } = useContext(MenuContext);

  return (
    <button className={className} onClick={onToggle} type="button">
      {children}
    </button>
  );
};

export default MenuButton;
