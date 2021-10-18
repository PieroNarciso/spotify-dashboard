import { useAppDispatch } from '@/hooks';
import React, { useState } from 'react';
import { BsCursor } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';

import Modal from './Modal/Modal';
import ModalActions from './Modal/ModalActions';
import { userActions } from '@/store/user';
import ModalContent from './Modal/ModalContent';

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
        <ModalContent>
          <h1 className="text-xl font-semibold tracking-wider">
            Welcome to Spotify Dashboard
          </h1>
          <p className="flex items-center mt-5">
            <b>Hover</b> <BsCursor className="w-6 h-6 mx-2 text-primary" /> to
            listen music
          </p>
          <p className="flex items-center mt-2">
            <b>Click</b>{' '}
            <AiOutlineHeart className="w-6 h-6 mx-2 text-primary" /> to save the
            song
          </p>
        </ModalContent>
        <ModalActions>
          <button className="btn btn-primary" onClick={closeModal}>
            Close
          </button>
        </ModalActions>
      </Modal>
    </>
  );
};

export default InitialModal;
