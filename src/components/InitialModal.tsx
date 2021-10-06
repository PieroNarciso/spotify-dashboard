import React, { useState } from 'react';
import Modal from './Modal/Modal';
import ModalActions from './Modal/ModalActions';

const InitialModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Modal open={isOpen}>
        <ModalActions>
          <button className="btn" onClick={() => setIsOpen(false)}>Close</button>
        </ModalActions>
      </Modal>
    </>
  )
};

export default InitialModal;
