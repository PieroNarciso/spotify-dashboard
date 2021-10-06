import React from 'react';

interface ModalProps {
  open: boolean;
}


const Modal: React.FC<ModalProps> = (props) => {
  return (
    <>
      {props.open && (
        <div className="modal modal-open">
          <div className="modal-box">
            {props.children}
          </div>
        </div>
      )}
    </>
  )
};

export default Modal;
