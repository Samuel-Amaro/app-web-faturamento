"use client";

import { DataContextType, Fatura } from "@/types/datas";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import React, { useContext, useEffect, useMemo, useState } from "react";
import datasJSON from "../data.json";

const DataContext = React.createContext<DataContextType | null>(null);

export default function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const datasLocalStorage = getLocalStorage<Fatura[]>("datas", datasJSON);

  const [datas, setDatas] = useState(datasLocalStorage);

  useEffect(() => {
    setLocalStorage("datas", datas);
  }, [datas]);

  const contextValue = useMemo(
    () => ({
      datas,
    }),
    [datas]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}

export function useDatasContext() {
  const dataContext = useContext(DataContext);

  if (!dataContext) {
    throw new Error("Houve um erros ao usar dados para o contexto");
  }

  return dataContext;
}
