"use client";

import { useRouter } from "next/navigation";
import Modal from "../Modal";
import styles from "./styles.module.css";
import { useDatasDispatch } from "@/context/DatasContext";
import { useState } from "react";

type Props = {
  id: string;
};

export default function ModalExcluir({ id }: Props) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const dispatchDatasContext = useDatasDispatch();

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleClickBtnCancelar() {
    handleCloseModal();
    router.back();
  }

  function handleKeydownBtnCancelar(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === "") {
      handleCloseModal();
      router.back();
    }
  }

  function handleClickBtnExcluir() {
    dispatchDatasContext({ type: "delete", idInvoice: id });
    handleCloseModal();
    router.back();
  }

  function handleKeydownBtnExcluir(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === "") {
      dispatchDatasContext({ type: "delete", idInvoice: id });
      handleCloseModal();
      router.back();
    }
  }

  return (
    <Modal
      className={styles.modalExcluir}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
    >
      <div>
        <h1 className={styles.title}>Confirmar exclusão</h1>
        <p className={styles.description}>
          Tem certeza de que deseja excluir a fatura nº {id}? Essa ação não pode
          ser desfeita.
        </p>
        <div className={styles.containerButtons}>
          <button
            type="button"
            title="Cancelar exclusão da fatura"
            aria-label="Cancelar exclusão da fatura"
            onClick={handleClickBtnCancelar}
            onKeyDown={handleKeydownBtnCancelar}
            className={`btn3 ${styles.btn}`}
          >
            Cancelar
          </button>
          <button
            type="button"
            title="Excluir fatura"
            aria-label="Excluir fatura"
            className={`btn5 ${styles.btn}`}
            onClick={handleClickBtnExcluir}
            onKeyDown={handleKeydownBtnExcluir}
          >
            Excluir
          </button>
        </div>
      </div>
    </Modal>
  );
}
