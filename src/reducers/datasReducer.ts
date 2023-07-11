import { Fatura } from "@/types/datas";

export type ActionTypeDatasReducer = {
  type: "save_new_invoice";
  invoice: Fatura;
};

export function datasReducer(draft: Fatura[], action: ActionTypeDatasReducer) {
  switch (action.type) {
    case "save_new_invoice": {
      return [...draft, action.invoice];
    }
    default: {
      throw Error("Ação desconhecida Reducer Datas");
    }
  }
}
