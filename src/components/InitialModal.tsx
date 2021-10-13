import { useAppDispatch } from '@/hooks';
import React, { useState } from 'react';
import Modal from './Modal/Modal';
import ModalActions from './Modal/ModalActions';
import { userActions } from '@/store/user';

const InitialModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    setIsOpen(false);
    dispatch(userActions.toogleFirstTime());
  };

  return (
    <>
      <Modal open={isOpen}>
        <ModalActions>
          <button className="btn" onClick={closeModal}>Close</button>
        </ModalActions>
      </Modal>
    </>
  );
};

export default InitialModal;
