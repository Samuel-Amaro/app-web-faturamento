"use client";

import { ReactNode, useEffect, useRef } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  const refDialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dial = refDialog.current;
    dial?.showModal();

    return () => {
      dial?.close();
    };
  }, [refDialog]);

  return <dialog ref={refDialog}>{children}</dialog>;
}
