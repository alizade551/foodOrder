import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void | null;
  className?: string;
};

function Modal({ children, open, className = '', onClose }: ModalProps) {
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
    <dialog ref={dialogRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')!
  );
}

export default Modal;
