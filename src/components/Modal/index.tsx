"use client";

import { ReactNode, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import useNoScroll from "@/hooks/useNoScroll";

export default function Modal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const refDialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dial = refDialog.current;
    dial?.showModal();

    return () => {
      dial?.close();
    };
  }, [refDialog]);

  useNoScroll();

  return (
    <dialog
      ref={refDialog}
      className={className ? `${styles.dialog} ${className}` : styles.dialog}
    >
      {children}
    </dialog>
  );
}
