import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal/Modal';
import ModalActions from './Modal/ModalActions';
import ModalContent from './Modal/ModalContent';
import ThemeControls from './ThemeControls';
import VolumeSwitcher from './VolumeSwitcher';

interface SettingsButtonProps {
  className?: string;
}

const SettingsButton: React.FC<SettingsButtonProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const portalNode = document.body;
  return (
    <React.Fragment>
      <button
        className={props.className ? props.className : ''}
        onClick={onOpen}
      >
        {props.children}
      </button>
      {ReactDOM.createPortal(
        <Modal open={isOpen}>
          <ModalContent>
            <span className="font-medium text-lg tracking-wide cursor-default">Theme</span>
            <ThemeControls className="mb-4 mt-2"/>
            <span className="font-medium text-lg tracking-wide cursor-default">Volume</span>
            <VolumeSwitcher className="mt-1"/>
          </ModalContent>
          <ModalActions>
            <button className="btn" onClick={onClose}>Close</button>
          </ModalActions>
        </Modal>,
        portalNode
      )}
    </React.Fragment>
  );
};

export default SettingsButton;
