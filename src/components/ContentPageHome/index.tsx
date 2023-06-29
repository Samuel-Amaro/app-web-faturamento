"use client";

import { useState } from "react";
import { useDatasContext } from "@/context/DatasContext";
import DropdownFilter from "../DropdownFilter";

export default function ContentPageHome() {
  const [filters, setFilters] = useState<string[]>([]);
  const datasContext = useDatasContext();
  const optionsFilter = [
    { value: "pago", label: "Pago" },
    { value: "pendente", label: "Pendente" },
    { value: "rascunho", label: "Rascunho" },
  ];

  function onChange(value: string) {
    //TODO: criar um state de string[] para armazenar as options de filter escolhidas
    console.log(`valor escolhido dropdown: ${value}`);
    if (filters.indexOf(value) === -1) {
      filters.push(value);
    }
  }

  return (
    <>
      <header>
        <div>
          <h1>Faturas</h1>
          <span>{datasContext.datas.length} faturas</span>
        </div>
        <DropdownFilter
          options={optionsFilter}
          onChange={onChange}
          filtersSelecteds={filters}
        />
      </header>
    </>
  );
}
