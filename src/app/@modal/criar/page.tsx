"use client";

import ArrowLeft from "@/components/Icons/ArrowLeft";
import Delete from "@/components/Icons/Delete";
import Modal from "@/components/Modal";
import { Fatura, Item } from "@/types/datas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { customAlphabet } from "nanoid";
import { useDatasDispatch } from "@/context/DatasContext";

//TODO: add styles

enum PaymentTerms {
  net1Day = 1,
  net7Days = 7,
  net14Days = 14,
  net30Days = 30,
}

type Inputs = {
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
  invoiceDate: Date /*string*/;
  paymentTerms: number;
  projectDescription: string;
  itemList: Item[];
};

export default function ModalCreate() {
  const router = useRouter();
  const [activatedButton, setActivatedButton] = useState("");
  const dispatchDatasContext = useDatasDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itemList",
    rules: {
      required: {
        value: activatedButton === "btnSaveAndSend",
        message: "E nécessario que a fatura tenha pelos menos 1 item",
      },
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const invDate = new Date(data.invoiceDate);
    invDate.setDate(invDate.getDate() + data.paymentTerms);
    const nanoidLetters = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 2);
    const nanoidNumbers = customAlphabet("0123456789", 4);
    const newInvoice: Fatura = {
      id: `${nanoidLetters()}${nanoidNumbers()}`,
      criadoEm: data.invoiceDate.toISOString(),
      vencimento: invDate.toISOString(),
      descricao: data.projectDescription,
      termosPagamento: data.paymentTerms,
      nomeCliente: data.billToClientName,
      emailCliente: data.billToClientEmail,
      status: activatedButton === "btnSaveAndSend" ? "pendente" : "rascunho",
      enderecoRemetente: {
        rua: data.billFromStreetAddress,
        cidade: data.billFromCity,
        codigoPostal: data.billFromPostCode,
        pais: data.billFromCountry,
      },
      enderecoCliente: {
        rua: data.billToStreetAddress,
        cidade: data.billToCity,
        codigoPostal: data.billToPostCode,
        pais: data.billToCountry,
      },
      items: data.itemList,
      total: data.itemList.reduce((a, c) => a + c.total, 0),
    };
    dispatchDatasContext({
      type: "save_new_invoice",
      invoice: newInvoice,
    });
    /*console.log(newInvoice);
    console.log(data);
    if (activatedButton === "btnSaveAndSend") {
      console.log("Botão enviar e salvar");
    } else if (activatedButton === "btnSaveAsDraft") {
      console.log("Botão salvar como rascunho");
    }*/
  };

  function handleBtnAddNewItemList() {
    append({ nome: "", quantidade: 0, preco: 0, total: 0 });
  }

  function handleBtnRevomeItemList(indexItem: number) {
    remove(indexItem);
  }

  return (
    <Modal>
      <header>
        <button
          type="button"
          title="Voltar"
          aria-label="Voltar"
          onClick={() => router.back()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "") {
              router.back();
            }
          }}
        >
          <ArrowLeft />
          <span>Voltar</span>
        </button>
        <h1>Nova Fatura</h1>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <legend>Cobrar De</legend>
          <div>
            <div>
              <label htmlFor="billFromStreetAddress">Endereço Da Rua</label>
              {errors.billFromStreetAddress && (
                <p role="alert">{errors.billFromStreetAddress.message}</p>
              )}
            </div>
            <input
              type="text"
              title="Endereço Da Rua"
              id="billFromStreetAddress"
              aria-invalid={errors.billFromStreetAddress ? "true" : "false"}
              aria-required={activatedButton === "btnSaveAndSend"}
              {...register("billFromStreetAddress", {
                required: {
                  value: activatedButton === "btnSaveAndSend",
                  message: "Não pode estar vazio",
                },
              })}
            />
          </div>
          <div>
            <div>
              <div>
                <label htmlFor="billFromCity">Cidade</label>
                {errors.billFromCity && (
                  <p role="alert">{errors.billFromCity.message}</p>
                )}
              </div>
              <input
                type="text"
                title="Cidade"
                id="billFromCity"
                aria-invalid={errors.billFromCity ? "true" : "false"}
                aria-required={activatedButton === "btnSaveAndSend"}
                {...register("billFromCity", {
                  required: {
                    value: activatedButton === "btnSaveAndSend",
                    message: "Não pode estar vazio",
                  },
                })}
              />
            </div>
            <div>
              <div>
                <label htmlFor="billFromPostCode">Cep</label>
                {errors.billFromPostCode && (
                  <p role="alert">{errors.billFromPostCode.message}</p>
                )}
              </div>
              <input
                type="text"
                title="Cep"
                id="billFromPostCode"
                placeholder="e.x 00000-000"
                inputMode="numeric"
                aria-invalid={errors.billFromPostCode ? "true" : "false"}
                aria-required={activatedButton === "btnSaveAndSend"}
                {...register("billFromPostCode", {
                  required: {
                    value: activatedButton === "btnSaveAndSend",
                    message: "Não pode estar vazio",
                  },
                  minLength: {
                    value: 9,
                    message: "Mínimo 9 Dígitos",
                  },
                  maxLength: {
                    value: 9,
                    message: "Máximo 9 Dígitos",
                  },
                  pattern: {
                    value: /\d{5}-\d{3}/,
                    message: "CEP não corresponde ao formato desejado",
                  },
                })}
              />
            </div>
            <div>
              <div>
                <label htmlFor="billFromCountry">País</label>
                {errors.billFromCountry && (
                  <p role="alert">{errors.billFromCountry.message}</p>
                )}
              </div>
              <input
                type="text"
                title="País"
                id="billFromCountry"
                aria-invalid={errors.billFromCountry ? "true" : "false"}
                aria-required={activatedButton === "btnSaveAndSend"}
                {...register("billFromCountry", {
                  required: {
                    value: activatedButton === "btnSaveAndSend",
                    message: "Não pode estar vazio",
                  },
                })}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Conta Para</legend>
          <div>
            <div>
              <label htmlFor="billToClientName">Nome do Cliente</label>
              {errors.billToClientName && (
                <p role="alert">{errors.billToClientName.message}</p>
              )}
            </div>
            <input
              type="text"
              title="Nome do Cliente"
              id="billToClientName"
              aria-invalid={errors.billToClientName ? "true" : "false"}
              aria-required={activatedButton === "btnSaveAndSend"}
              {...register("billToClientName", {
                required: {
                  value: activatedButton === "btnSaveAndSend",
                  message: "Não pode estar vazio",
                },
              })}
            />
          </div>
          <div>
            <div>
              <label htmlFor="billToClientEmail">Email do Cliente</label>
              {errors.billToClientEmail && (
                <p role="alert">{errors.billToClientEmail.message}</p>
              )}
            </div>
            <input
              type="email"
              title="Email do Cliente"
              id="billToClientEmail"
              aria-invalid={errors.billToClientEmail ? "true" : "false"}
              aria-required={activatedButton === "btnSaveAndSend"}
              placeholder="e.x. email@example.com"
              {...register("billToClientEmail", {
                required: {
                  value: activatedButton === "btnSaveAndSend",
                  message: "Não pode estar vazio",
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                  message: "Email não corresponde ao formato desejado",
                },
              })}
            />
          </div>
          <div>
            <div>
              <label htmlFor="billToStreetAddress">Endereço Da Rua</label>
              {errors.billToStreetAddress && (
                <p role="alert">{errors.billToStreetAddress.message}</p>
              )}
            </div>
            <input
              type="text"
              title="Endereço Da Rua"
              id="billToStreetAddress"
              aria-invalid={errors.billToStreetAddress ? "true" : "false"}
              aria-required={activatedButton === "btnSaveAndSend"}
              {...register("billToStreetAddress", {
                required: {
                  value: activatedButton === "btnSaveAndSend",
                  message: "Não pode estar vazio",
                },
              })}
            />
          </div>
          <div>
            <div>
              <div>
                <label htmlFor="billToCity">Cidade</label>
                {errors.billToCity && (
                  <p role="alert">{errors.billToCity.message}</p>
                )}
              </div>
              <input
                type="text"
                title="Cidade"
                id="billToCity"
                aria-invalid={errors.billToCity ? "true" : "false"}
                aria-required={activatedButton === "btnSaveAndSend"}
                {...register("billToCity", {
                  required: {
                    value: activatedButton === "btnSaveAndSend",
                    message: "Não pode estar vazio",
                  },
                })}
              />
            </div>
            <div>
              <div>
                <label htmlFor="billToPostCode">Cep</label>
                {errors.billToPostCode && (
                  <p role="alert">{errors.billToPostCode.message}</p>
                )}
              </div>
              <input
                type="text"
                title="Cep"
                id="billToPostCode"
                inputMode="numeric"
                aria-invalid={errors.billToPostCode ? "true" : "false"}
                aria-required={activatedButton === "btnSaveAndSend"}
                {...register("billToPostCode", {
                  required: {
                    value: activatedButton === "btnSaveAndSend",
                    message: "Não pode estar vazio",
                  },
                  minLength: {
                    value: 9,
                    message: "Mínimo 9 Dígitos",
                  },
                  maxLength: {
                    value: 9,
                    message: "Máximo 9 Dígitos",
                  },
                  pattern: {
                    value: /\d{5}-\d{3}/,
                    message: "CEP não corresponde ao formato desejado",
                  },
                })}
              />
            </div>
            <div>
              <div>
                <label htmlFor="billToCountry">País</label>
                {errors.billToCountry && (
                  <p role="alert">{errors.billToCountry.message}</p>
                )}
              </div>
              <input
                type="text"
                title="País"
                id="billToCountry"
                aria-invalid={errors.billToCountry ? "true" : "false"}
                aria-required={activatedButton === "btnSaveAndSend"}
                {...register("billToCountry", {
                  required: {
                    value: activatedButton === "btnSaveAndSend",
                    message: "Não pode estar vazio",
                  },
                })}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div>
            {/*//TODO: construir fallback input type date para navegadores que não possui ui de date*/}
            <div>
              <div>
                <label htmlFor="invoiceDate">Data Da Fatura</label>
                {errors.invoiceDate && (
                  <p role="alert">{errors.invoiceDate.message}</p>
                )}
              </div>
              <input
                type="date"
                title="Data Da Fatura"
                id="invoiceDate"
                aria-invalid={errors.invoiceDate ? "true" : "false"}
                aria-required={activatedButton === "btnSaveAndSend"}
                {...register("invoiceDate", {
                  required: {
                    value: activatedButton === "btnSaveAndSend",
                    message: "Não pode estar vazio",
                  },
                  valueAsDate: true,
                })}
              />
            </div>
            <div>
              <div>
                <label htmlFor="paymentTerms">Termos de pagamento</label>
                {errors.paymentTerms && (
                  <p role="alert">{errors.paymentTerms.message}</p>
                )}
              </div>
              <select
                title="Termos de pagamento"
                id="paymentTerms"
                aria-invalid={errors.paymentTerms ? "true" : "false"}
                aria-required={activatedButton === "btnSaveAndSend"}
                {...register("paymentTerms", {
                  required: {
                    value: activatedButton === "btnSaveAndSend",
                    message: "Não pode estar vazio",
                  },
                  valueAsNumber: true,
                })}
              >
                <option value={1}>Líquido 1 Dia</option>
                <option value={7}>Líquido 7 Dias</option>
                <option value={14}>Líquido 14 Dias</option>
                <option value={30}>Líquido 30 Dias</option>
              </select>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="projectDescription">Descrição do Projeto</label>
              {errors.projectDescription && (
                <p role="alert">{errors.projectDescription.message}</p>
              )}
            </div>
            <input
              type="text"
              id="projectDescription"
              title="Descrição do Projeto"
              placeholder="e.x. Graphic Design"
              aria-invalid={errors.projectDescription ? "true" : "false"}
              aria-required={activatedButton === "btnSaveAndSend"}
              {...register("projectDescription", {
                required: {
                  value: activatedButton === "btnSaveAndSend",
                  message: "Não pode estar vazio",
                },
              })}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Item Da Lista</legend>
          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id}>
                  <div>
                    <div>
                      <label htmlFor={`itemList.${index}.nome`}>
                        Nome Do Item
                      </label>
                      {errors.itemList?.[index]?.nome && (
                        <p role="alert">
                          {errors.itemList?.[index]?.nome?.message}
                        </p>
                      )}
                    </div>
                    <input
                      type="text"
                      title="Nome Do Item"
                      id={`itemList.${index}.itemName`}
                      aria-invalid={
                        errors.itemList?.[index]?.nome ? "true" : "false"
                      }
                      aria-required={activatedButton === "btnSaveAndSend"}
                      {...register(`itemList.${index}.nome`, {
                        required: {
                          value: activatedButton === "btnSaveAndSend",
                          message: "Não pode estar vazio",
                        },
                      })}
                    />
                  </div>
                  <div>
                    <div>
                      <label htmlFor={`itemList.${index}.quantidade`}>
                        Qtd
                      </label>
                      {errors.itemList?.[index]?.quantidade && (
                        <p role="alert">
                          {errors.itemList?.[index]?.quantidade?.message}
                        </p>
                      )}
                    </div>
                    <input
                      type="number"
                      title="Quantidade"
                      id={`itemList.${index}.quantidade`}
                      aria-invalid={
                        errors.itemList?.[index]?.quantidade ? "true" : "false"
                      }
                      aria-required={activatedButton === "btnSaveAndSend"}
                      {...register(`itemList.${index}.quantidade`, {
                        required: {
                          value: activatedButton === "btnSaveAndSend",
                          message: "Não pode estar vazio",
                        },
                        min: {
                          value: 1,
                          message: "Qtd mínima 1",
                        },
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div>
                    <div>
                      <label htmlFor={`itemList.${index}.preco`}>Preço</label>
                      {errors.itemList?.[index]?.preco && (
                        <p role="alert">
                          {errors.itemList?.[index]?.preco?.message}
                        </p>
                      )}
                    </div>
                    <input
                      type="number"
                      step="any"
                      title="Preço"
                      id={`itemList.${index}.preco`}
                      aria-invalid={
                        errors.itemList?.[index]?.preco ? "true" : "false"
                      }
                      aria-required={activatedButton === "btnSaveAndSend"}
                      {...register(`itemList.${index}.preco`, {
                        required: {
                          value: activatedButton === "btnSaveAndSend",
                          message: "Não pode estar vazio",
                        },
                        min: {
                          value: 1,
                          message: "Preço mínimo 1",
                        },
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div>
                    <div>
                      <label htmlFor={`itemList.${index}.total`}>Total</label>
                      {errors.itemList?.[index]?.total && (
                        <p role="alert">
                          {errors.itemList?.[index]?.total?.message}
                        </p>
                      )}
                    </div>
                    <input
                      type="number"
                      step="any"
                      title="Total"
                      id={`itemList.${index}.total`}
                      aria-invalid={
                        errors.itemList?.[index]?.total ? "true" : "false"
                      }
                      aria-required={activatedButton === "btnSaveAndSend"}
                      {...register(`itemList.${index}.total`, {
                        required: {
                          value: activatedButton === "btnSaveAndSend",
                          message: "Não pode estar vazio",
                        },
                        min: {
                          value: 1,
                          message: "Total mínimo 1",
                        },
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <button
                    type="button"
                    title="Excluir item de lista"
                    aria-label="Excluir item de lista"
                    onClick={() => handleBtnRevomeItemList(index)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleBtnRevomeItemList(index);
                      }
                    }}
                  >
                    <Delete />
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            title="Adicionar novo item"
            aria-label="Adicionar novo item"
            onClick={handleBtnAddNewItemList}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "") {
                handleBtnAddNewItemList();
              }
            }}
          >
            + Adicionar novo item
          </button>
        </fieldset>
        <div>
          {Object.values(errors).length > 0 && (
            <p role="alert">- Todos os campos devem ser adicionados</p>
          )}
          {errors.itemList && (
            <p role="alert">{`- ${errors.itemList.root?.message}`}</p>
          )}
        </div>
        <div>
          <button
            type="button"
            aria-label="Descartar Fatura"
            title="Descartar Fatura"
            onClick={() => router.back()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "") {
                router.back();
              }
            }}
          >
            Descartar
          </button>
          <button
            type="submit"
            aria-label="Salvar como rascunho"
            title="Salvar como rascunho"
            onClick={() => setActivatedButton("btnSaveAsDraft")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "") {
                setActivatedButton("btnSaveAsDraft");
              }
            }}
          >
            Salvar como rascunho
          </button>
          <button
            type="submit"
            aria-label="Salvar e enviar"
            title="Salvar e enviar"
            onClick={() => setActivatedButton("btnSaveAndSend")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "") {
                setActivatedButton("btnSaveAndSend");
              }
            }}
          >
            Salvar & Enviar
          </button>
        </div>
      </form>
    </Modal>
  );
}
