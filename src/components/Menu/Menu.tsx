/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useRef, useState } from 'react';

interface MenuContext {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
}

export const MenuContext = React.createContext<MenuContext>({
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
  onToggle: () => {},
});

interface MenuProps {
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ className, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const onToggle = () => setIsOpen(!isOpen);

  const closeOnClickOutside = (event: MouseEvent) => {
    if (!wrapperRef.current?.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', closeOnClickOutside);
    return () => document.removeEventListener('mouseup', closeOnClickOutside);
  }, []);

  return (
    <MenuContext.Provider value={{ isOpen, onClose, onOpen, onToggle }}>
      <div className={className} ref={wrapperRef}>
        {children}
      </div>
    </MenuContext.Provider>
  );
};

export default Menu;
