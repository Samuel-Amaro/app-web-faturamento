"use client";

import { useDatasContext } from "@/context/DatasContext";
import useMatchMedia from "@/hooks/useMatchMedia";
import { Item } from "@/types/datas";
import { formatDate, formatNumber } from "@/utils/utils";
import Link from "next/link";
import Status from "../Status";

export default function ContentPageInvoice({
  idInvoice,
}: {
  idInvoice: string;
}) {
  const dataContext = useDatasContext();
  const invoiceSelected = dataContext.datas.find(
    (invoice) => invoice.id === idInvoice
  );

  if (!invoiceSelected) {
    //TODO: arruma o html aqui
    return "Fatura não encontrada";
  }

  return (
    <>
      <header>
        <div>
          <p>Status</p>
          <Status status={invoiceSelected.status} />
        </div>
        <div>
          <button
            type="button"
            title="Editar Fatura"
            aria-label="Editar Fatura"
          >
            Editar
          </button>
          <button
            type="button"
            title="Excluir Fatura"
            aria-label="Excluir Fatura"
          >
            Excluir
          </button>
          <button
            type="button"
            title="Marcar fatura como paga"
            aria-label="Marcar fatura como paga"
          >
            Marcar como pago
          </button>
        </div>
      </header>
      <section>
        <div>
          <div>
            <b>
              <span>#</span>
              {invoiceSelected.id}
            </b>
            <p>{invoiceSelected.descricao}</p>
          </div>
          <address>
            <span>{invoiceSelected.enderecoRemetente.rua}</span>
            <span>{invoiceSelected.enderecoRemetente.cidade}</span>
            <span>{invoiceSelected.enderecoRemetente.codigoPostal}</span>
            <span>{invoiceSelected.enderecoRemetente.pais}</span>
          </address>
        </div>
        <div>
          <div>
            <div>
              <p>Data da fatura</p>
              <b>{formatDate(invoiceSelected.criadoEm)}</b>
            </div>
            <div>
              <p>Pagamento Vencido</p>
              <b>{formatDate(invoiceSelected.vencimento)}</b>
            </div>
          </div>
          <div>
            <p>Conta Para</p>
            <b>{invoiceSelected.nomeCliente}</b>
            <address>
              <span>{invoiceSelected.enderecoCliente.rua}</span>
              <span>{invoiceSelected.enderecoCliente.cidade}</span>
              <span>{invoiceSelected.enderecoCliente.codigoPostal}</span>
              <span>{invoiceSelected.enderecoCliente.pais}</span>
            </address>
          </div>
          <div>
            <p>Enviado para</p>
            <Link
              href={`mailto:${invoiceSelected.emailCliente}`}
              target="_blank"
              rel="external"
            >
              {invoiceSelected.emailCliente}
            </Link>
          </div>
        </div>
        <TableItems items={invoiceSelected.items} />
      </section>
    </>
  );
}

function TableItems({ items }: { items: Item[] }) {
  const tableMobile = (
    <div role="table" aria-label="Itens de cobrança da fatura">
      <div role="rowgroup">
        <div role="row">
          <span role="columnheader">Nome Item</span>
          <span role="columnheader">QTD</span>
          <span role="columnheader">Preço</span>
          <span role="columnheader">Total</span>
        </div>
      </div>
      <div role="rowgroup">
        {items.map((item, index) => (
          <div role="row" key={index}>
            <div aria-hidden="true">
              <span role="cell">{item.nome}</span>
              <p>
                <span role="cell">{item.quantidade}</span>
                <span aria-hidden="true">x</span>
                <span role="cell">{formatNumber(item.preco)}</span>
              </p>
            </div>
            <span role="cell">{formatNumber(item.total)}</span>
          </div>
        ))}
      </div>
      <div>
        <p>
          <span>Total geral</span>
          <span>{formatNumber(items.reduce((a, c) => a + c.total, 0))}</span>
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
