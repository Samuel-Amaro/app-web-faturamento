"use client";

import { ReactNode, useEffect, useRef } from "react";
import styles from "./styles.module.css";

interface Props {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, className, isOpen, onClose }: Props) {
  const refDialog = useRef<HTMLDialogElement | null>(null);

  function handleClose() {
    if (refDialog.current) {
      refDialog.current.close();
    }
    onClose();
  }

  useEffect(() => {
    if (refDialog.current) {
      if (isOpen) {
        document.body.classList.add("has-dialog");
        refDialog.current.showModal();
      } else {
        refDialog.current.close();
        document.body.classList.remove("has-dialog");
      }
    }
  }, [isOpen]);

  return (
    <dialog
      ref={refDialog}
      className={className ? `${styles.dialog} ${className}` : styles.dialog}
      onClose={handleClose}
    >
      {children}
    </dialog>
  );
}
