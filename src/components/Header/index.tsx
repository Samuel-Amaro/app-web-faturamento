"use client";

import { useDatasContext } from "@/context/DatasContext";

export default function Header() {
  const datasContext = useDatasContext();

  return (
    <header>
      <div>
        <h1>Faturas</h1>
        <span>{datasContext.datas.length} faturas</span>
      </div>
    </header>
  );
}
