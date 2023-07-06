"use client";

import styles from "./styles.module.css";

export default function Status({ status }: { status: string }) {
  return (
    <p
      className={
        (status === "pago" && `${styles.statusPago}`) ||
        (status === "pendente" && `${styles.statusPendente}`) ||
        (status === "rascunho" && `${styles.statusRascunho}`) ||
        `${styles.status}`
      }
    >
      <span
        className={
          (status === "pago" && `${styles.ballStatusPago}`) ||
          (status === "pendente" && `${styles.ballStatusPendente}`) ||
          (status === "rascunho" && `${styles.ballStatusRascunho}`) ||
          undefined
        }
      ></span>{" "}
      {status.toLowerCase().charAt(0).toUpperCase() + status.slice(1)}
    </p>
  );
}
