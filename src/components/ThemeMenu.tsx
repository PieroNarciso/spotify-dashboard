import React, { useEffect, useRef } from 'react';

interface ThemeMenuProps {
  onClose: () => void;
}

const ThemeMenu: React.FC<ThemeMenuProps> = (props) => {
  const themeChanger = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
  }
  const wrapper = useRef<HTMLUListElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (!wrapper.current?.contains(event.target as Node)) {
      props.onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  return (
    <ul ref={wrapper} className="menu shadow-lg rounded-box bg-base-200 py-2">
      <li className="menu-title">
        <span>Theme</span>
      </li>
      <li>
        <a onClick={() => themeChanger('light')}>Light</a>
      </li>
      <li>
        <a onClick={() => themeChanger('dark')}>Dark</a>
      </li>
      <li>
        <a onClick={() => themeChanger('retro')}>Retro</a>
      </li>
    </ul>
  );
};

export default ThemeMenu;
