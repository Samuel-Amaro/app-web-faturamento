"use client";

import { DataContextType, Fatura } from "@/types/datas";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import datasJSON from "../data.json";
import { ActionTypeDatasReducer, datasReducer } from "@/reducers/datasReducer";

const DataContext = React.createContext<DataContextType | null>(null);

const DataDispatchContext =
  createContext<React.Dispatch<ActionTypeDatasReducer> | null>(null);

export default function DataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const datasLocalStorage = getLocalStorage<Fatura[]>("datas", datasJSON);

  //const [datas, setDatas] = useState(datasLocalStorage);

  const [datas, dispatch] = useReducer(datasReducer, datasLocalStorage);

  useEffect(() => {
    setLocalStorage("datas", datas);
  }, [datas]);

  const contextValue = useMemo(
    () => ({
      datas,
    }),
    [datas]
  );

  const contextValueDispatch = useMemo(() => dispatch, [dispatch]);

  return (
    <DataContext.Provider value={contextValue}>
      <DataDispatchContext.Provider value={contextValueDispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
}

export function useDatasContext() {
  const dataContext = useContext(DataContext);

  if (!dataContext) {
    throw new Error("Houve um erros ao usar dados para o contexto");
  }

  return dataContext;
}

export function useDatasDispatch() {
  const dispacthContext = useContext(DataDispatchContext);
  if (!dispacthContext) {
    throw Error(
      "Houve um erro ao usar o dispatch function reducer datas no contexto"
    );
  }
  return dispacthContext;
}
