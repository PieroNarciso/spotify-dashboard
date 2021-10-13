import React, { useContext } from 'react';
import { MenuContext } from './Menu';

interface MenuContainerProps {
  className?: string;
}

const MenuContainer: React.FC<MenuContainerProps> = ({
  className,
  children,
}) => {
  const { isOpen } = useContext(MenuContext);

  return isOpen ? <div className={className}>{children}</div> : null;
};

export default MenuContainer;
