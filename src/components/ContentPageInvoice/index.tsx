"use client";

import { useDatasContext } from "@/context/DatasContext";
import useMatchMedia from "@/hooks/useMatchMedia";
import { Item } from "@/types/datas";
import { formatDate, formatNumber } from "@/utils/utils";
import Link from "next/link";
import Status from "../Status";
import styles from "./styles.module.css";

export default function ContentPageInvoice({
  idInvoice,
}: {
  idInvoice: string;
}) {
  const dataContext = useDatasContext();
  const invoiceSelected = dataContext.datas.find(
    (invoice) => invoice.id === idInvoice
  );

  const buttons = (
    <div className={styles.headerContainerButtons}>
      <button
        type="button"
        title="Editar Fatura"
        aria-label="Editar Fatura"
        className={`btn3 ${styles.btn}`}
      >
        Editar
      </button>
      <button
        type="button"
        title="Excluir Fatura"
        aria-label="Excluir Fatura"
        className={`btn5 ${styles.btn}`}
      >
        Excluir
      </button>
      <button
        type="button"
        title="Marcar fatura como paga"
        aria-label="Marcar fatura como paga"
        className={`btn2 ${styles.btn}`}
      >
        Marcar como pago
      </button>
    </div>
  );

  const footer = useMatchMedia({
    mobileContent: buttons,
    desktopContent: null,
    mediaQuery: "(min-width: 690px)",
  });

  const header = useMatchMedia({
    mobileContent: (
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <p className={styles.headerText}>Status</p>
          <Status
            status={
              invoiceSelected?.status === undefined
                ? "Sem Status"
                : invoiceSelected.status
            }
          />
        </div>
      </header>
    ),
    desktopContent: (
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <p className={styles.headerText}>Status</p>
          <Status
            status={
              invoiceSelected?.status === undefined
                ? "Sem Status"
                : invoiceSelected.status
            }
          />
        </div>
        {buttons}
      </header>
    ),
    mediaQuery: "(min-width: 690px)",
  });

  if (!invoiceSelected) {
    //TODO: arruma o html aqui
    return <h1>Fatura não encontrada</h1>;
  }

  return (
    <>
      {header}
      <section className={styles.section}>
        <div className={styles.sectionContainerHeader}>
          <div>
            <b className={styles.sectionId}>
              <span className={styles.sectionHash}>#</span>
              {invoiceSelected.id}
            </b>
            <p className={styles.sectionLabelInfo}>
              {invoiceSelected.descricao}
            </p>
          </div>
          <address
            className={`${styles.sectionLabelInfo} ${styles.sectionAddres}`}
          >
            {invoiceSelected.enderecoRemetente.rua}
            <br />
            {invoiceSelected.enderecoRemetente.cidade}
            <br />
            {invoiceSelected.enderecoRemetente.codigoPostal}
            <br />
            {invoiceSelected.enderecoRemetente.pais}
          </address>
        </div>
        <div className={styles.sectionContainerBody}>
          <div className={styles.sectionContainerDatas}>
            <div className={styles.containerData}>
              <p
                className={`${styles.sectionLabelInfo} ${styles.sectionLabelMargin}`}
              >
                Data da fatura
              </p>
              <b className={styles.sectionValueInfo}>
                {formatDate(invoiceSelected.criadoEm)}
              </b>
            </div>
            <div className={styles.containerData}>
              <p
                className={`${styles.sectionLabelInfo} ${styles.sectionLabelMargin}`}
              >
                Pagamento Vencido
              </p>
              <b className={styles.sectionValueInfo}>
                {formatDate(invoiceSelected.vencimento)}
              </b>
            </div>
          </div>
          <div>
            <p
              className={`${styles.sectionLabelInfo} ${styles.sectionLabelMargin}`}
            >
              Conta Para
            </p>
            <b
              className={`${styles.sectionValueInfo} ${styles.sectionValueMargin}`}
            >
              {invoiceSelected.nomeCliente}
            </b>
            <address
              className={`${styles.sectionLabelInfo} ${styles.sectionAddres}`}
            >
              {invoiceSelected.enderecoCliente.rua}
              <br />
              {invoiceSelected.enderecoCliente.cidade}
              <br />
              {invoiceSelected.enderecoCliente.codigoPostal}
              <br />
              {invoiceSelected.enderecoCliente.pais}
            </address>
          </div>
          <div>
            <p
              className={`${styles.sectionLabelInfo} ${styles.sectionLabelMargin}`}
            >
              Enviado para
            </p>
            <Link
              href={`mailto:${invoiceSelected.emailCliente}`}
              target="_blank"
              rel="external"
              className={`${styles.sectionValueInfo} ${styles.sectionLinkEmail}`}
            >
              {invoiceSelected.emailCliente}
            </Link>
          </div>
        </div>
        <TableItems items={invoiceSelected.items} />
      </section>
      {footer}
    </>
  );
}

function TableItems({ items }: { items: Item[] }) {
  const tableMobile = (
    <div
      role="table"
      aria-label="Itens de cobrança da fatura"
      className={styles.table}
    >
      <div role="rowgroup" className={styles.tableRowGroupHeader}>
        <div role="row">
          <span role="columnheader">Nome Item</span>
          <span role="columnheader">QTD</span>
          <span role="columnheader">Preço</span>
          <span role="columnheader">Total</span>
        </div>
      </div>
      <div role="rowgroup" className={styles.tableRowGroupBody}>
        {items.map((item, index) => (
          <div role="row" key={index} className={styles.tableRow}>
            <div aria-hidden="true">
              <span
                role="cell"
                className={`${styles.tableCell} ${styles.tableCellName}`}
              >
                {item.nome}
              </span>
              <p>
                <span
                  role="cell"
                  className={`${styles.tableCell} ${styles.tableCellQtd}`}
                >
                  {item.quantidade}
                </span>{" "}
                <span
                  aria-hidden="true"
                  className={`${styles.tableCell} ${styles.tableDiviser}`}
                >
                  x
                </span>{" "}
                <span
                  role="cell"
                  className={`${styles.tableCell} ${styles.tableCellPreco}`}
                >
                  {formatNumber(item.preco)}
                </span>
              </p>
            </div>
            <span
              role="cell"
              className={`${styles.tableCell} ${styles.tableCellTotal}`}
            >
              {formatNumber(item.total)}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.tableFooter}>
        <p className={styles.tableContainerFooter}>
          <span className={styles.tableTotalGeralCell}>Total geral</span>
          <span className={styles.tableTotalValue}>
            {formatNumber(items.reduce((a, c) => a + c.total, 0))}
          </span>
        </p>
      </div>
    </div>
  );

  const tableDesktop = (
    <table>
      <thead>
        <th>Nome Item</th>
        <th>QTD</th>
        <th>Preço</th>
        <th>Total</th>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.nome}</td>
            <td>{item.quantidade}</td>
            <td>{formatNumber(item.preco)}</td>
            <td>{formatNumber(item.total)}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>Total geral</td>
          <td>{formatNumber(items.reduce((a, c) => a + c.total, 0))}</td>
        </tr>
      </tfoot>
    </table>
  );

  return useMatchMedia({
    mobileContent: tableMobile,
    desktopContent: tableDesktop,
    mediaQuery: "(min-width: 690px)",
  });
}
