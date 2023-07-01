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

export default function ContentPageHome() {
  const datasContext = useDatasContext();
  const [filters, setFilters] = useState<string[]>([]);
  const optionsFilter = [
    { value: "pago", label: "Pago" },
    { value: "pendente", label: "Pendente" },
    { value: "rascunho", label: "Rascunho" },
  ];

  function onChange(value: string, typeAction: "add" | "delete") {
    if (typeAction === "add") {
      if (filters.indexOf(value) === -1) {
        setFilters([...filters, value]);
      }
    } else {
      setFilters(filters.filter((f) => f !== value));
    }
  }

  return (
    <>
      <header>
        <div aria-live="polite" aria-atomic="true">
          {useMatchMedia({
            mobileContent: (
              <>
                <h1>Faturas</h1>
                <span>
                  {datasContext.datas.length > 0
                    ? `${datasContext.datas.length} faturas`
                    : `Sem faturas`}
                </span>
              </>
            ),
            desktopContent: (
              <>
                <h1>Faturas</h1>
                <span>
                  {datasContext.datas.length > 0
                    ? `Existem ${datasContext.datas.length} faturas ${
                        filters.length > 0 ? filters.join(", ") : "totais"
                      }`
                    : `Sem faturas`}
                </span>
              </>
            ),
            mediaQuery: "(min-width: 690px)",
          })}
        </div>
        <DropdownFilter options={optionsFilter} onChange={onChange} />
        <button type="button" title="Nova Fatura" aria-label="Nova Fatura">
          <span>
            <Plus />
          </span>
          <span>Nova</span>
        </button>
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
  return (
    <ul>
      {invoicesFiltered.map((invoice) => (
        <li key={invoice.id}>
          <Link
            href={`/fatura/${invoice.id}`}
            title={`Visualizar a fatura ${invoice.id}`}
            aria-label={`Visualizar a fatura ${invoice.id}`}
          >
            <div>
              <p>
                <span>#</span>
                {invoice.id}
              </p>
              <p>{invoice.nomeCliente}</p>
            </div>
            <div>
              <div>
                <p>Até {formatDate(invoice.vencimento)}</p>
                <p>{formatNumber(invoice.total)}</p>
              </div>
              <div>
                <p>
                  <span></span> {invoice.status}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function NoContent() {
  return (
    <div>
      <Image
        src="/assets/illustration-empty.svg"
        alt="Ilustração sem contéudo"
        aria-hidden="true"
      />
      <h2>Não há nada aqui</h2>
      <p>Crie uma fatura clicando no botão Nova fatura e comece</p>
    </div>
  );
}
