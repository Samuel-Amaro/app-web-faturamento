"use client";

import { useDatasContext, useDatasDispatch } from "@/context/DatasContext";
import { useThemeContext } from "@/context/ThemeContext";
import { ActivatedButtonsForm, Fatura, Inputs } from "@/types/datas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Modal from "../Modal";
import styles from "./styles.module.css";
import ArrowLeft from "../Icons/ArrowLeft";
import Form from "../Form";
import useMatchMedia from "@/hooks/useMatchMedia";

//TODO: versionar alterações e arrumar o modalDelete que tem uma class modal a frente que esta estragando layout do modal delete

type Props = {
  id: string;
};

export default function ModalEdit({ id }: Props) {
  const router = useRouter();
  const [activatedButton, setActivatedButton] =
    useState<ActivatedButtonsForm>("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const dispatchDatasContext = useDatasDispatch();
  const datasContext = useDatasContext();
  const themeContext = useThemeContext();
  const datas = datasContext.datas.find((data) => data.id === id);

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

  function handleClickBtnSalvarMudancas() {
    setActivatedButton("btnSaveChangesEditForm");
  }

  function handleKeydownBtnSalvarMudancas(
    e: React.KeyboardEvent<HTMLButtonElement>
  ) {
    if (e.key === "Enter" || e.key === "") {
      setActivatedButton("btnSaveChangesEditForm");
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const invDate = data.invoiceDate ? new Date(data.invoiceDate) : new Date();
    invDate.setDate(invDate.getDate() + data.paymentTerms);
    if (datas) {
      const editedInvoice: Fatura = {
        id: datas.id,
        criadoEm: data.invoiceDate,
        vencimento: invDate.toISOString(),
        descricao: data.projectDescription,
        termosPagamento: data.paymentTerms,
        nomeCliente: data.billToClientName,
        emailCliente: data.billToClientEmail,
        status: datas.status === "rascunho" ? "pendente" : datas.status,
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
        type: "changed",
        invoice: editedInvoice,
      });
      handleCloseModal();
      router.back();
    } else {
      alert("Houve um erro, e não podemos alterar está fatura!!");
    }
  };

  return (
    <Modal
      className={styles.modalCreate}
      isOpen={isModalOpen}
      onClose={handleCloseModal}
    >
      <header className={styles.modalCreateHeader}>
        {useMatchMedia({
          mobileContent: (
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
          ),
          desktopContent: null,
          mediaQuery: "(min-width: 690px)",
        })}
        <h1 className={styles.title}>Editar {`# ${id}`}</h1>
      </header>
      <Form
        onSubmit={onSubmit}
        initialValues={datas}
        activatedButton={activatedButton}
        idForm="formEdit"
        className={styles.form}
      />
      <div className={styles.containerButtons}>
        {themeContext.theme === "light" && (
          <span className={styles.containerButtonsGradient}></span>
        )}
        <div className={styles.containerButtonsSub}>
          <button
            type="button"
            aria-label="Cancelar edição"
            title="Cancelar edição"
            onClick={handleClickBtnCancelar}
            onKeyDown={handleKeydownBtnCancelar}
            className={`btn3 ${styles.containerButtonsBtn}`}
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="formEdit"
            aria-label="Salvar mudanças"
            title="Salvar mudanças"
            onClick={handleClickBtnSalvarMudancas}
            onKeyDown={handleKeydownBtnSalvarMudancas}
            className={`btn1Default ${styles.containerButtonsBtn}`}
          >
            Salvar mudanças
          </button>
        </div>
      </div>
    </Modal>
  );
}
