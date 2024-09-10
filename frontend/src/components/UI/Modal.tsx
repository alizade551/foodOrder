import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  className?: string;
};

function Modal({ children, open, className = '' }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog) {
      if (open) {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else {
        if (dialog.open) {
          dialog.close();
        }
      }
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById('modal')!
  );
}

export default Modal;
