import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface SnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

const Snackbar: React.FC<SnackbarProps> = (props) => {
  useEffect(() => {
    const id = setTimeout(() => props.onClose(), 3000);
    return () => {
      clearTimeout(id);
    };
  });

  return props.open
    ? ReactDOM.createPortal(
      <div className="fixed bottom-5 right-5 px-3 py-2 bg-base-200 flex items-center rounded-md cursor-default">
        <span className="font-medium tracking-wide">{props.message}</span>
        <button
          className="ml-2 btn btn-sm btn-accent btn-outline"
          onClick={props.onClose}
        >
          Close
        </button>
      </div>,
      document.body
    )
    : null;
};

export default Snackbar;
