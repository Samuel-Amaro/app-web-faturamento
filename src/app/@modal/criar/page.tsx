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
  const dispatchDatasContext = useDatasDispatch();
  const themeContext = useThemeContext();

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
    console.log(newInvoice);
    /*console.log(data);
    if (activatedButton === "btnSaveAndSend") {
      console.log("Botão enviar e salvar");
    } else if (activatedButton === "btnSaveAsDraft") {
      console.log("Botão salvar como rascunho");
    }*/
  };

  return (
    <Modal className={styles.modalCreate}>
      <header className={styles.modalCreateHeader}>
        <button
          type="button"
          title="Voltar"
          aria-label="Voltar"
          className={styles.modalCreateBtnVoltar}
          onClick={() => router.back()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "") {
              router.back();
            }
          }}
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
            onClick={() => router.back()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "") {
                router.back();
              }
            }}
            className={`btn3 ${styles.containerButtonsBtn}`}
          >
            Descartar
          </button>
          <button
            type="submit"
            form="formCreate"
            aria-label="Salvar como rascunho"
            title="Salvar como rascunho"
            onClick={() => setActivatedButton("btnSaveAsDraftCreateForm")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "") {
                setActivatedButton("btnSaveAsDraftCreateForm");
              }
            }}
            className={`btn4 ${styles.containerButtonsBtn}`}
          >
            Salvar como rascunho
          </button>
          <button
            type="submit"
            form="formCreate"
            aria-label="Salvar e enviar"
            title="Salvar e enviar"
            onClick={() => setActivatedButton("btnSaveAndSendCreateForm")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "") {
                setActivatedButton("btnSaveAndSendCreateForm");
              }
            }}
            className={`btn1Default ${styles.containerButtonsBtn}`}
          >
            Salvar & Enviar
          </button>
        </div>
      </div>
    </Modal>
  );
}
