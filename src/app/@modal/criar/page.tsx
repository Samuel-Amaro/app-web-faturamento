"use client";

import ArrowLeft from "@/components/Icons/ArrowLeft";
import Modal from "@/components/Modal";
import { ActivatedButtonsForm, Fatura, Inputs } from "@/types/datas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { customAlphabet } from "nanoid";
import { useDatasDispatch } from "@/context/DatasContext";
import styles from "./styles.module.css";
import Form from "@/components/Form";
import { useThemeContext } from "@/context/ThemeContext";

export default function ModalCreate() {
  const router = useRouter();
  const [activatedButton, setActivatedButton] =
    useState<ActivatedButtonsForm>("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const dispatchDatasContext = useDatasDispatch();
  const themeContext = useThemeContext();

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleClickBtnVoltar() {
    handleCloseModal();
    router.back();
  }

  function handleKeydownBtnVoltar(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "Enter" || e.key === "") {
      handleCloseModal();
      router.back();
    }
  }

  function handleClickBtnDescartar() {
    handleCloseModal();
    router.back();
  }

  function handleKeydownBtnDescartar(
    e: React.KeyboardEvent<HTMLButtonElement>
  ) {
    if (e.key === "Enter" || e.key === "") {
      handleCloseModal();
      router.back();
    }
  }

  function handleClickBtnSalvarRascunho() {
    setActivatedButton("btnSaveAsDraftCreateForm");
    handleCloseModal();
    router.back();
  }

  function handleKeydownBtnSalvarRascunho(
    e: React.KeyboardEvent<HTMLButtonElement>
  ) {
    if (e.key === "Enter" || e.key === "") {
      setActivatedButton("btnSaveAsDraftCreateForm");
      handleCloseModal();
      router.back();
    }
  }

  function handleClickBtnSalvarEnviar() {
    setActivatedButton("btnSaveAndSendCreateForm");
  }

  function handleKeydownBtnSalvarEnviar(
    e: React.KeyboardEvent<HTMLButtonElement>
  ) {
    if (e.key === "Enter" || e.key === "") {
      setActivatedButton("btnSaveAndSendCreateForm");
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const invDate = data.invoiceDate ? new Date(data.invoiceDate) : new Date();
    invDate.setDate(invDate.getDate() + data.paymentTerms);
    const nanoidLetters = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 2);
    const nanoidNumbers = customAlphabet("0123456789", 4);
    console.log(data);
    const newInvoice: Fatura = {
      id: `${nanoidLetters()}${nanoidNumbers()}`,
      criadoEm: data.invoiceDate ? data.invoiceDate : new Date().toISOString(),
      vencimento: invDate.toISOString(),
      descricao: data.projectDescription,
      termosPagamento: data.paymentTerms,
      nomeCliente: data.billToClientName,
      emailCliente: data.billToClientEmail,
      status:
        activatedButton === "btnSaveAndSendCreateForm"
          ? "pendente"
          : "rascunho",
      enderecoRemetente: {
        rua: data.billFromStreetAddress,
        cidade: data.billFromCity,
        codigoPostal: data.billFromPostCode,
        pais: data.billFromCountry,
      },
      enderecoCliente: {
        rua: data.billToStreetAddress,
        cidade: data.billToCity,
        codigoPostal: data.billToPostCode,
        pais: data.billToCountry,
      },
      items: data.itemList,
      total: data.itemList.reduce((a, c) => a + c.total, 0),
    };
    dispatchDatasContext({
      type: "save_new_invoice",
      invoice: newInvoice,
    });
    handleCloseModal();
    router.back();
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      className={styles.modalCreate}
    >
      <header className={styles.modalCreateHeader}>
        <button
          type="button"
          title="Voltar"
          aria-label="Voltar"
          className={styles.modalCreateBtnVoltar}
          onClick={handleClickBtnVoltar}
          onKeyDown={handleKeydownBtnVoltar}
        >
          <ArrowLeft className={styles.modalCreateIconBtnVoltar} />
          <span>Voltar</span>
        </button>
        <h1 className={styles.title}>Nova Fatura</h1>
      </header>
      <Form
        onSubmit={onSubmit}
        activatedButton={activatedButton}
        idForm="formCreate"
        className={styles.form}
      />
      <div className={styles.containerButtons}>
        {themeContext.theme === "light" && (
          <span className={styles.containerButtonsGradient}></span>
        )}
        <div className={styles.containerButtonsSub}>
          <button
            type="button"
            aria-label="Descartar Fatura"
            title="Descartar Fatura"
            onClick={handleClickBtnDescartar}
            onKeyDown={handleKeydownBtnDescartar}
            className={`btn3 ${styles.containerButtonsBtn}`}
          >
            Descartar
          </button>
          <button
            type="submit"
            form="formCreate"
            aria-label="Salvar como rascunho"
            title="Salvar como rascunho"
            onClick={handleClickBtnSalvarRascunho}
            onKeyDown={handleKeydownBtnSalvarRascunho}
            className={`btn4 ${styles.containerButtonsBtn}`}
          >
            Salvar como rascunho
          </button>
          <button
            type="submit"
            form="formCreate"
            aria-label="Salvar e enviar"
            title="Salvar e enviar"
            onClick={handleClickBtnSalvarEnviar}
            onKeyDown={handleKeydownBtnSalvarEnviar}
            className={`btn1Default ${styles.containerButtonsBtn}`}
          >
            Salvar & Enviar
          </button>
        </div>
      </div>
    </Modal>
  );
}
