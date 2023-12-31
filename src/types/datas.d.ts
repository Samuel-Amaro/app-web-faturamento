export type Endereco = {
  rua: string;
  cidade: string;
  codigoPostal: string;
  pais: string;
};

export type Item = {
  nome: string;
  quantidade: number;
  preco: number;
  total: number;
};

export type Fatura = {
  id: string;
  criadoEm: string;
  vencimento: string;
  descricao: string;
  termosPagamento: number;
  nomeCliente: string;
  emailCliente: string;
  status: string;
  enderecoRemetente: Endereco;
  enderecoCliente: Endereco;
  items: Item[];
  total: number;
};

export type DataContextType = {
  datas: Fatura[];
};

export type Inputs = {
  billFromStreetAddress: string;
  billFromCity: string;
  billFromPostCode: string;
  billFromCountry: string;
  billToClientName: string;
  billToClientEmail: string;
  billToStreetAddress: string;
  billToCity: string;
  billToPostCode: string;
  billToCountry: string;
  invoiceDate: string;
  paymentTerms: number;
  projectDescription: string;
  itemList: Item[];
};

type ActivatedButtonsForm =
  | "btnSaveAndSendCreateForm"
  | "btnSaveAsDraftCreateForm"
  | "btnSaveChangesEditForm"
  | "btnCancelEditForm"
  | "";
