import { useEffect } from 'react';
import { Overlay, ModalEl } from './Modal.styled';

export const Modal = ({ img, alt, onCloseModal }) => {
  const handleClickBackdrop = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  return (
    <Overlay className="overlay" onClick={handleClickBackdrop}>
      <ModalEl classN="modal">
        <img src={img} alt={alt} />
      </ModalEl>
    </Overlay>
  );
};
