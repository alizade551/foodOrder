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
    const modal = dialogRef.current;

    if (modal) {
      if (open) {
        if (!modal.open) {
          modal.showModal();
        }
      }
    }
    return () => modal?.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById('modal')!
  );
}

export default Modal;
