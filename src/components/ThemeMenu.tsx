import React from 'react';

const ThemeMenu: React.FC = () => {
  const themeChanger = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  return (
    <ul className="menu shadow-lg rounded-box bg-base-200 py-2">
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
