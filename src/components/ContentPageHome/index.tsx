"use client";

import { useState } from "react";
import { useDatasContext } from "@/context/DatasContext";
import DropdownFilter from "../DropdownFilter";

export default function ContentPageHome() {
  const datasContext = useDatasContext();
  const [filters, setFilters] = useState<string[]>([]);
  const optionsFilter = [
    { value: "pago", label: "Pago" },
    { value: "pendente", label: "Pendente" },
    { value: "rascunho", label: "Rascunho" },
  ];

  function onChange(value: string, typeAction: "add" | "delete") {
    console.log(`valor escolhido dropdown: ${value}`);
    if (typeAction === "add") {
      if (filters.indexOf(value) === -1) {
        setFilters([...filters, value]);
      }
    } else {
      setFilters(filters.filter((f) => f === value));
    }
  }

  return (
    <>
      <header>
        <div>
          <h1>Faturas</h1>
          <span>{datasContext.datas.length} faturas</span>
        </div>
        <DropdownFilter options={optionsFilter} onChange={onChange} />
      </header>
    </>
  );
}
