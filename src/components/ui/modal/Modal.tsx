import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '../../../context/theme/useTheme';
import modalImg from '../../../assets/img/modal.png';
import './modal.css';

type ModalProps = {
  title: string;
  text: string;
  onClose: () => void;
};

export const Modal = ({ title, text, onClose }: ModalProps) => {
  const { theme } = useTheme();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalTheme = theme === 'dark' ? 'modal--dark' : 'modal--light';

  useEffect(() => {
    const dialog = dialogRef.current;
    const controller = new AbortController();
    const signal = controller.signal;

    dialog?.showModal();
    dialog?.addEventListener('cancel', onClose, { signal });

    return () => {
      controller.abort();
      dialog?.close();
    };
  }, []);

  function closeModal() {
    dialogRef.current?.close();
  }

  const modalContainer = (
    <dialog className={`modal ${modalTheme}`} ref={dialogRef}>
      <div className="modal__container">
        <div className="modal__content">
          <img className="modal__img" src={modalImg} width={280} height={250} alt="" />
          <h1 className="modal__title">{title}</h1>
          <p className="modal__text">{text}</p>
          <button
            className="btn btn--primary-action modal__btn"
            onClick={() => {
              if (onClose) onClose();
              closeModal();
            }}
          >
            Got it!
          </button>
        </div>
      </div>
    </dialog>
  );

  return createPortal(modalContainer, document.body);
};

export default Modal;
