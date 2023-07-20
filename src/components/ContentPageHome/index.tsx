"use client";

import { useState } from "react";
import { useDatasContext } from "@/context/DatasContext";
import DropdownFilter from "../DropdownFilter";
import Plus from "../Icons/Plus";
import Image from "next/image";
import { Fatura } from "@/types/datas";
import Link from "next/link";
import { formatDate, formatNumber } from "@/utils/utils";
import useMatchMedia from "@/hooks/useMatchMedia";
import styles from "./styles.module.css";
import Status from "../Status";
import ArrowRight from "../Icons/ArrowRight";

export default function ContentPageHome() {
  const datasContext = useDatasContext();
  const [filters, setFilters] = useState<string[]>([]);
  const optionsFilter = [
    { value: "pago", label: "Pago" },
    { value: "pendente", label: "Pendente" },
    { value: "rascunho", label: "Rascunho" },
  ];
  const invoicesFiltered =
    filters.length > 0
      ? datasContext.datas.filter(
          (invoiceFilter) =>
            invoiceFilter.status ===
            filters.find((invoiceFind) => invoiceFind === invoiceFilter.status)
        )
      : datasContext.datas;

  function onChange(value: string, typeAction: "add" | "delete") {
    if (typeAction === "add") {
      if (filters.indexOf(value) === -1) {
        setFilters([...filters, value]);
      }
    } else {
      setFilters(filters.filter((f) => f !== value));
    }
  }

  const txtDescription = useMatchMedia({
    mobileContent: (
      <TextHeader
        textTitle="Faturas"
        textDescriptors={
          invoicesFiltered.length > 0
            ? `${invoicesFiltered.length} faturas`
            : `Sem faturas`
        }
      />
    ),
    desktopContent: (
      <TextHeader
        textTitle="Faturas"
        textDescriptors={
          invoicesFiltered.length > 0
            ? `Existem ${invoicesFiltered.length} faturas ${
                filters.length > 0 ? filters.join(", ") : "totais"
              }`
            : `Sem faturas`
        }
      />
    ),
    mediaQuery: "(min-width: 690px)",
  });

  const txtButtonNewInvoice = useMatchMedia({
    mobileContent: <span className={styles.btnNewText}>Nova</span>,
    desktopContent: <span className={styles.btnNewText}>Nova Fatura</span>,
    mediaQuery: "(min-width: 690px)",
  });

  return (
    <>
      <header className={styles.header}>
        <div aria-live="polite" aria-atomic="true">
          {txtDescription}
        </div>
        <div className={styles.headerContainer}>
          <DropdownFilter options={optionsFilter} onChange={onChange} />
          <Link
            href={"/criar"}
            rel="next"
            title="Nova Fatura"
            aria-label="Nova Fatura"
            className={`btn1Default ${styles.btnNew}`}
          >
            <Plus className={styles.iconBtnNew} />
            {txtButtonNewInvoice}
          </Link>
        </div>
      </header>
      <main aria-live="polite" aria-atomic="true">
        {datasContext.datas.length > 0 ? (
          <ListInvoices invoices={datasContext.datas} filters={filters} />
        ) : (
          <NoContent />
        )}
      </main>
    </>
  );
}

function ListInvoices({
  invoices,
  filters,
}: {
  invoices: Fatura[];
  filters: string[];
}) {
  const invoicesFiltered =
    filters.length > 0
      ? invoices.filter(
          (invoiceFilter) =>
            invoiceFilter.status ===
            filters.find((invoiceFind) => invoiceFind === invoiceFilter.status)
        )
      : invoices;

  const cardLink = useMatchMedia({
    mobileContent: null,
    desktopContent: null,
    mediaQuery: "(min-width: 690px)",
  });

  return (
    <ul className={styles.listInvoices}>
      {invoicesFiltered.map((invoice) => (
        <li key={invoice.id} className={styles.item}>
          <LinkCardInvoice invoice={invoice} />
        </li>
      ))}
    </ul>
  );
}

function LinkCardInvoice({ invoice }: { invoice: Fatura }) {
  const content = useMatchMedia({
    mobileContent: (
      <Link
        href={`/fatura/${invoice.id}`}
        title={`Visualizar a fatura ${invoice.id}`}
        aria-label={`Visualizar a fatura ${invoice.id}`}
        className={styles.linkCardInvoice}
      >
        <div className={styles.containerA}>
          <p className={styles.idInvoice}>
            <span className={styles.hashId}>#</span>
            {invoice.id}
          </p>
          <p className={styles.nameClient}>{invoice.nomeCliente}</p>
        </div>
        <div className={styles.containerB}>
          <div>
            <p className={styles.vencimento}>
              Até {formatDate(invoice.vencimento)}
            </p>
            <p className={styles.total}>{formatNumber(invoice.total)}</p>
          </div>
          <Status status={invoice.status} />
        </div>
      </Link>
    ),
    desktopContent: (
      <Link
        href={`/fatura/${invoice.id}`}
        title={`Visualizar a fatura ${invoice.id}`}
        aria-label={`Visualizar a fatura ${invoice.id}`}
        className={styles.linkCardInvoice}
      >
        <p className={styles.idInvoice}>
          <span className={styles.hashId}>#</span>
          {invoice.id}
        </p>
        <p className={styles.vencimento}>
          Até {formatDate(invoice.vencimento)}
        </p>
        <p className={styles.nameClient}>{invoice.nomeCliente}</p>
        <p className={styles.total}>{formatNumber(invoice.total)}</p>
        <div className={styles.status}>
          <Status status={invoice.status} />
        </div>

        <ArrowRight className={styles.iconLinkInvoice} />
      </Link>
    ),
    mediaQuery: "(min-width: 690px)",
  });
  return content;
}

function NoContent() {
  return (
    <div className={styles.containerNoContent}>
      <Image
        src="/assets/illustration-empty.svg"
        alt="Ilustração sem contéudo"
        aria-hidden="true"
        width={242}
        height={200}
        className={styles.imageNoContent}
      />
      <h2 className={styles.containerNoContentTitle}>Não há nada aqui</h2>
      <p className={styles.containerNoContentDescription}>
        Crie uma fatura clicando no botão Nova fatura e comece
      </p>
    </div>
  );
}

function TextHeader({
  textTitle,
  textDescriptors,
}: {
  textTitle: string;
  textDescriptors: string;
}) {
  return (
    <>
      <h1 className={`headingL ${styles.title}`}>{textTitle}</h1>
      <span className={styles.headerTotalInvoices}>{textDescriptors}</span>
    </>
  );
}
