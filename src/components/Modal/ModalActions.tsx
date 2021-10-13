import React from 'react';

interface ModalActionsProps {
  className?: string;
}

const ModalActions: React.FC<ModalActionsProps> = (props) => {
  return (
    <div className={`modal-action ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  );
};

export default ModalActions;
