import { Fatura } from "@/types/datas";

export type ActionTypeDatasReducer =
  | {
      type: "save_new_invoice";
      invoice: Fatura;
    }
  | {
      type: "changed";
      invoice: Fatura;
    }
  | {
      type: "markAsPaid";
      idInvoice: string;
    };

export function datasReducer(draft: Fatura[], action: ActionTypeDatasReducer) {
  switch (action.type) {
    case "save_new_invoice": {
      return [...draft, action.invoice];
    }
    case "changed": {
      return draft.map((invoice) => {
        if (invoice.id === action.invoice.id) {
          return action.invoice;
        }
        return invoice;
      });
    }
    case "markAsPaid": {
      return draft.map((invoice) => {
        if (invoice.id === action.idInvoice) {
          return {
            ...invoice,
            status: "pago",
          };
        }
        return invoice;
      });
    }
    default: {
      throw Error("Ação desconhecida Reducer Datas");
    }
  }
}
