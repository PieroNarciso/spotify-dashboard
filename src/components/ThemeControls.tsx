import React from 'react';

interface ThemeControlsProps {
  className?: string;
}

const ThemeControls: React.FC<ThemeControlsProps> = (props) => {
  const themeChanger = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <div className={`btn-group ${props.className ? props.className : ''}`}>
      <button className="btn btn-outline btn-primary" onClick={() => themeChanger('light')}>
        Light
      </button>
      <button className="btn btn-outline btn-primary" onClick={() => themeChanger('dark')}>
        Dark
      </button>
      <button className="btn btn-outline btn-primary" onClick={() => themeChanger('retro')}>
        Retro
      </button>
    </div>
  );
};

export default ThemeControls;
