import { ActivatedButtonsForm, Fatura, Inputs, Item } from "@/types/datas";
import { useFieldArray, useForm } from "react-hook-form";
import styles from "./styles.module.css";
import Delete from "../Icons/Delete";

//TODO: FOCAR AQUI, construir este componente

interface FormProps {
  initialValues?: Fatura;
  onSubmit: (data: Inputs) => void;
  activatedButton: ActivatedButtonsForm;
  idForm: string;
  className?: string;
}

function getInitialValuesMaped(initialValues?: Fatura) {
  if (initialValues) {
    return {
      billFromStreetAddress: initialValues.enderecoRemetente.rua,
      billFromCity: initialValues.enderecoRemetente.cidade,
      billFromPostCode: initialValues.enderecoRemetente.codigoPostal,
      billFromCountry: initialValues.enderecoCliente.pais,
      billToClientName: initialValues.nomeCliente,
      billToClientEmail: initialValues.emailCliente,
      billToStreetAddress: initialValues.enderecoCliente.rua,
      billToCity: initialValues.enderecoCliente.cidade,
      billToPostCode: initialValues.enderecoCliente.codigoPostal,
      billToCountry: initialValues.enderecoCliente.pais,
      invoiceDate: initialValues.criadoEm,
      paymentTerms: initialValues.termosPagamento,
      projectDescription: initialValues.descricao,
      itemList: initialValues.items,
    } as Inputs;
  }
}

export default function Form({
  initialValues,
  onSubmit,
  activatedButton,
  idForm,
  className,
}: FormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<Inputs>({ defaultValues: getInitialValuesMaped(initialValues) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itemList",
    rules: {
      required: {
        value:
          activatedButton === "btnSaveAndSendCreateForm" ||
          activatedButton === "btnSaveChangesEditForm",
        message: "E nécessario que a fatura tenha pelos menos 1 item",
      },
    },
  });

  function handleBtnAddNewItemList() {
    append({ nome: "", quantidade: 0, preco: 0, total: 0 });
  }

  function handleBtnRevomeItemList(indexItem: number) {
    remove(indexItem);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id={idForm} className={className}>
      <fieldset className={styles.formFieldset}>
        <legend className={styles.formSubtitle}>Cobrar De</legend>
        <div className={styles.formGroup}>
          <div className={styles.containerALabels}>
            <label
              htmlFor="billFromStreetAddress"
              className={
                errors.billFromStreetAddress
                  ? `${styles.formLabel} ${styles.formLabelError}`
                  : styles.formLabel
              }
            >
              Endereço Da Rua
            </label>
            {errors.billFromStreetAddress && (
              <p role="alert" className={styles.labelsErrors}>
                {errors.billFromStreetAddress.message}
              </p>
            )}
          </div>
          <input
            type="text"
            title="Endereço Da Rua"
            id="billFromStreetAddress"
            aria-invalid={errors.billFromStreetAddress ? "true" : "false"}
            aria-required={
              activatedButton === "btnSaveAndSendCreateForm" ||
              activatedButton === "btnSaveChangesEditForm"
            }
            className={
              errors.billFromStreetAddress
                ? `${styles.formInput} ${styles.formInputError}`
                : styles.formInput
            }
            {...register("billFromStreetAddress", {
              required: {
                value:
                  activatedButton === "btnSaveAndSendCreateForm" ||
                  activatedButton === "btnSaveChangesEditForm",
                message: "Não pode estar vazio",
              },
            })}
          />
        </div>
        <div className={`${styles.formGroupContainer}`}>
          <div className={styles.formGroupContainerA}>
            <div className={styles.containerALabels}>
              <label
                htmlFor="billFromCity"
                className={
                  errors.billFromCity
                    ? `${styles.formLabel} ${styles.formLabelError}`
                    : styles.formLabel
                }
              >
                Cidade
              </label>
              {errors.billFromCity && (
                <p role="alert" className={styles.labelsErrors}>
                  {errors.billFromCity.message}
                </p>
              )}
            </div>
            <input
              type="text"
              title="Cidade"
              id="billFromCity"
              aria-invalid={errors.billFromCity ? "true" : "false"}
              aria-required={
                activatedButton === "btnSaveAndSendCreateForm" ||
                activatedButton === "btnSaveChangesEditForm"
              }
              className={
                errors.billFromCity
                  ? `${styles.formInput} ${styles.formInputError}`
                  : styles.formInput
              }
              {...register("billFromCity", {
                required: {
                  value:
                    activatedButton === "btnSaveAndSendCreateForm" ||
                    activatedButton === "btnSaveChangesEditForm",
                  message: "Não pode estar vazio",
                },
              })}
            />
          </div>
          <div className={styles.formGroupContainerB}>
            <div className={styles.containerALabels}>
              <label
                htmlFor="billFromPostCode"
                className={
                  errors.billFromPostCode
                    ? `${styles.formLabel} ${styles.formLabelError}`
                    : styles.formLabel
                }
              >
                Cep
              </label>
              {errors.billFromPostCode && (
                <p role="alert" className={styles.labelsErrors}>
                  {errors.billFromPostCode.message}
                </p>
              )}
            </div>
            <input
              type="text"
              title="Cep"
              id="billFromPostCode"
              placeholder="e.x 00000-000"
              inputMode="numeric"
              aria-invalid={errors.billFromPostCode ? "true" : "false"}
              aria-required={
                activatedButton === "btnSaveAndSendCreateForm" ||
                activatedButton === "btnSaveChangesEditForm"
              }
              className={
                errors.billFromPostCode
                  ? `${styles.formInput} ${styles.formInputError}`
                  : styles.formInput
              }
              {...register("billFromPostCode", {
                required: {
                  value:
                    activatedButton === "btnSaveAndSendCreateForm" ||
                    activatedButton === "btnSaveChangesEditForm",
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
          <div className={styles.formGroupContainerC}>
            <div className={styles.containerALabels}>
              <label
                htmlFor="billFromCountry"
                className={
                  errors.billFromCountry
                    ? `${styles.formLabel} ${styles.formLabelError}`
                    : styles.formLabel
                }
              >
                País
              </label>
              {errors.billFromCountry && (
                <p role="alert" className={styles.labelsErrors}>
                  {errors.billFromCountry.message}
                </p>
              )}
            </div>
            <input
              type="text"
              title="País"
              id="billFromCountry"
              aria-invalid={errors.billFromCountry ? "true" : "false"}
              aria-required={
                activatedButton === "btnSaveAndSendCreateForm" ||
                activatedButton === "btnSaveChangesEditForm"
              }
              className={
                errors.billFromCountry
                  ? `${styles.formInput} ${styles.formInputError}`
                  : styles.formInput
              }
              {...register("billFromCountry", {
                required: {
                  value:
                    activatedButton === "btnSaveAndSendCreateForm" ||
                    activatedButton === "btnSaveChangesEditForm",
                  message: "Não pode estar vazio",
                },
              })}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className={styles.formFieldset}>
        <legend className={styles.formSubtitle}>Conta Para</legend>
        <div className={styles.formGroup}>
          <div className={styles.containerALabels}>
            <label
              htmlFor="billToClientName"
              className={
                errors.billToClientName
                  ? `${styles.formLabel} ${styles.formLabelError}`
                  : styles.formLabel
              }
            >
              Nome do Cliente
            </label>
            {errors.billToClientName && (
              <p role="alert" className={styles.labelsErrors}>
                {errors.billToClientName.message}
              </p>
            )}
          </div>
          <input
            type="text"
            title="Nome do Cliente"
            id="billToClientName"
            aria-invalid={errors.billToClientName ? "true" : "false"}
            aria-required={
              activatedButton === "btnSaveAndSendCreateForm" ||
              activatedButton === "btnSaveChangesEditForm"
            }
            className={
              errors.billToClientName
                ? `${styles.formInput} ${styles.formInputError}`
                : styles.formInput
            }
            {...register("billToClientName", {
              required: {
                value:
                  activatedButton === "btnSaveAndSendCreateForm" ||
                  activatedButton === "btnSaveChangesEditForm",
                message: "Não pode estar vazio",
              },
            })}
          />
        </div>
        <div className={styles.formGroup}>
          <div className={styles.containerALabels}>
            <label
              htmlFor="billToClientEmail"
              className={
                errors.billToClientEmail
                  ? `${styles.formLabel} ${styles.formLabelError}`
                  : styles.formLabel
              }
            >
              Email do Cliente
            </label>
            {errors.billToClientEmail && (
              <p role="alert" className={styles.labelsErrors}>
                {errors.billToClientEmail.message}
              </p>
            )}
          </div>
          <input
            type="email"
            title="Email do Cliente"
            id="billToClientEmail"
            aria-invalid={errors.billToClientEmail ? "true" : "false"}
            aria-required={
              activatedButton === "btnSaveAndSendCreateForm" ||
              activatedButton === "btnSaveChangesEditForm"
            }
            placeholder="e.x. email@example.com"
            className={
              errors.billToClientEmail
                ? `${styles.formInput} ${styles.formInputError}`
                : styles.formInput
            }
            {...register("billToClientEmail", {
              required: {
                value:
                  activatedButton === "btnSaveAndSendCreateForm" ||
                  activatedButton === "btnSaveChangesEditForm",
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
        <div className={styles.formGroup}>
          <div className={styles.containerALabels}>
            <label
              htmlFor="billToStreetAddress"
              className={
                errors.billToStreetAddress
                  ? `${styles.formLabel} ${styles.formLabelError}`
                  : styles.formLabel
              }
            >
              Endereço Da Rua
            </label>
            {errors.billToStreetAddress && (
              <p role="alert" className={styles.labelsErrors}>
                {errors.billToStreetAddress.message}
              </p>
            )}
          </div>
          <input
            type="text"
            title="Endereço Da Rua"
            id="billToStreetAddress"
            aria-invalid={errors.billToStreetAddress ? "true" : "false"}
            aria-required={
              activatedButton === "btnSaveAndSendCreateForm" ||
              activatedButton === "btnSaveChangesEditForm"
            }
            className={
              errors.billToStreetAddress
                ? `${styles.formInput} ${styles.formInputError}`
                : styles.formInput
            }
            {...register("billToStreetAddress", {
              required: {
                value:
                  activatedButton === "btnSaveAndSendCreateForm" ||
                  activatedButton === "btnSaveChangesEditForm",
                message: "Não pode estar vazio",
              },
            })}
          />
        </div>
        <div className={styles.formGroupContainer}>
          <div className={styles.formGroupContainerA}>
            <div className={styles.containerALabels}>
              <label
                htmlFor="billToCity"
                className={
                  errors.billToCity
                    ? `${styles.formLabel} ${styles.formLabelError}`
                    : styles.formLabel
                }
              >
                Cidade
              </label>
              {errors.billToCity && (
                <p role="alert" className={styles.labelsErrors}>
                  {errors.billToCity.message}
                </p>
              )}
            </div>
            <input
              type="text"
              title="Cidade"
              id="billToCity"
              aria-invalid={errors.billToCity ? "true" : "false"}
              aria-required={
                activatedButton === "btnSaveAndSendCreateForm" ||
                activatedButton === "btnSaveChangesEditForm"
              }
              className={
                errors.billToCity
                  ? `${styles.formInput} ${styles.formInputError}`
                  : styles.formInput
              }
              {...register("billToCity", {
                required: {
                  value:
                    activatedButton === "btnSaveAndSendCreateForm" ||
                    activatedButton === "btnSaveChangesEditForm",
                  message: "Não pode estar vazio",
                },
              })}
            />
          </div>
          <div className={styles.formGroupContainerB}>
            <div className={styles.containerALabels}>
              <label
                htmlFor="billToPostCode"
                className={
                  errors.billToPostCode
                    ? `${styles.formLabel} ${styles.formLabelError}`
                    : styles.formLabel
                }
              >
                Cep
              </label>
              {errors.billToPostCode && (
                <p role="alert" className={styles.labelsErrors}>
                  {errors.billToPostCode.message}
                </p>
              )}
            </div>
            <input
              type="text"
              title="Cep"
              id="billToPostCode"
              inputMode="numeric"
              aria-invalid={errors.billToPostCode ? "true" : "false"}
              aria-required={
                activatedButton === "btnSaveAndSendCreateForm" ||
                activatedButton === "btnSaveChangesEditForm"
              }
              className={
                errors.billToPostCode
                  ? `${styles.formInput} ${styles.formInputError}`
                  : styles.formInput
              }
              {...register("billToPostCode", {
                required: {
                  value:
                    activatedButton === "btnSaveAndSendCreateForm" ||
                    activatedButton === "btnSaveChangesEditForm",
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
          <div className={styles.formGroupContainerC}>
            <div className={styles.containerALabels}>
              <label
                htmlFor="billToCountry"
                className={
                  errors.billToCountry
                    ? `${styles.formLabel} ${styles.formLabelError}`
                    : styles.formLabel
                }
              >
                País
              </label>
              {errors.billToCountry && (
                <p role="alert" className={styles.labelsErrors}>
                  {errors.billToCountry.message}
                </p>
              )}
            </div>
            <input
              type="text"
              title="País"
              id="billToCountry"
              aria-invalid={errors.billToCountry ? "true" : "false"}
              aria-required={
                activatedButton === "btnSaveAndSendCreateForm" ||
                activatedButton === "btnSaveChangesEditForm"
              }
              className={
                errors.billToCountry
                  ? `${styles.formInput} ${styles.formInputError}`
                  : styles.formInput
              }
              {...register("billToCountry", {
                required: {
                  value:
                    activatedButton === "btnSaveAndSendCreateForm" ||
                    activatedButton === "btnSaveChangesEditForm",
                  message: "Não pode estar vazio",
                },
              })}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className={styles.formFieldset}>
        <div className={styles.formGroupContainer2}>
          <div className={styles.formGroupContainer2A}>
            <div className={styles.containerALabels}>
              <label
                htmlFor="invoiceDate"
                className={
                  errors.invoiceDate
                    ? `${styles.formLabel} ${styles.formLabelError}`
                    : styles.formLabel
                }
              >
                Data Da Fatura
              </label>
              {errors.invoiceDate && (
                <p role="alert" className={styles.labelsErrors}>
                  {errors.invoiceDate.message}
                </p>
              )}
            </div>
            <input
              type="date"
              title="Data Da Fatura"
              id="invoiceDate"
              aria-invalid={errors.invoiceDate ? "true" : "false"}
              aria-required={
                activatedButton === "btnSaveAndSendCreateForm" ||
                activatedButton === "btnSaveChangesEditForm"
              }
              className={
                errors.invoiceDate
                  ? `${styles.formInput} ${styles.formInputError}`
                  : styles.formInput
              }
              {...register("invoiceDate", {
                required: {
                  value:
                    activatedButton === "btnSaveAndSendCreateForm" ||
                    activatedButton === "btnSaveChangesEditForm",
                  message: "Não pode estar vazio",
                },
              })}
            />
          </div>
          <div className={styles.formGroupContainer2B}>
            <div className={styles.containerALabels}>
              <label
                htmlFor="paymentTerms"
                className={
                  errors.paymentTerms
                    ? `${styles.formLabel} ${styles.formLabelError}`
                    : styles.formLabel
                }
              >
                Termos de pagamento
              </label>
              {errors.paymentTerms && (
                <p role="alert" className={styles.labelsErrors}>
                  {errors.paymentTerms.message}
                </p>
              )}
            </div>
            <select
              title="Termos de pagamento"
              id="paymentTerms"
              aria-invalid={errors.paymentTerms ? "true" : "false"}
              aria-required={
                activatedButton === "btnSaveAndSendCreateForm" ||
                activatedButton === "btnSaveChangesEditForm"
              }
              className={
                errors.paymentTerms
                  ? `${styles.formSelect} ${styles.formInputError}`
                  : styles.formSelect
              }
              {...register("paymentTerms", {
                required: {
                  value:
                    activatedButton === "btnSaveAndSendCreateForm" ||
                    activatedButton === "btnSaveChangesEditForm",
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
          <div className={styles.containerALabels}>
            <label
              htmlFor="projectDescription"
              className={
                errors.projectDescription
                  ? `${styles.formLabel} ${styles.formLabelError}`
                  : styles.formLabel
              }
            >
              Descrição do Projeto
            </label>
            {errors.projectDescription && (
              <p role="alert" className={styles.labelsErrors}>
                {errors.projectDescription.message}
              </p>
            )}
          </div>
          <input
            type="text"
            id="projectDescription"
            title="Descrição do Projeto"
            placeholder="e.x. Graphic Design"
            aria-invalid={errors.projectDescription ? "true" : "false"}
            aria-required={
              activatedButton === "btnSaveAndSendCreateForm" ||
              activatedButton === "btnSaveChangesEditForm"
            }
            className={
              errors.projectDescription
                ? `${styles.formInput} ${styles.formInputError}`
                : styles.formInput
            }
            {...register("projectDescription", {
              required: {
                value:
                  activatedButton === "btnSaveAndSendCreateForm" ||
                  activatedButton === "btnSaveChangesEditForm",
                message: "Não pode estar vazio",
              },
            })}
          />
        </div>
      </fieldset>
      <fieldset
        className={`${styles.formFieldset} ${styles.formFieldsetMargin}`}
      >
        <legend className={styles.formSubtitleVariant}>Item Da Lista</legend>
        {/*//TODO: PARA LAYOUT DESKTOP ESTA ESTRUTURA DEVE*/}
        {fields.length > 0 && (
          <div className={styles.formContainerItemList}>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className={styles.formItemList}>
                  <div className={styles.formItemListContainerName}>
                    <div className={styles.containerALabels}>
                      <label
                        htmlFor={`itemList.${index}.nome`}
                        className={
                          errors.itemList?.[index]?.nome
                            ? `${styles.formLabel} ${styles.formLabelError}`
                            : styles.formLabel
                        }
                      >
                        Nome Do Item
                      </label>
                      {errors.itemList?.[index]?.nome && (
                        <p role="alert" className={styles.labelsErrors}>
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
                      aria-required={
                        activatedButton === "btnSaveAndSendCreateForm" ||
                        activatedButton === "btnSaveChangesEditForm"
                      }
                      className={
                        errors.itemList?.[index]?.nome
                          ? `${styles.formInput} ${styles.formInputError}`
                          : styles.formInput
                      }
                      {...register(`itemList.${index}.nome`, {
                        required: {
                          value:
                            activatedButton === "btnSaveAndSendCreateForm" ||
                            activatedButton === "btnSaveChangesEditForm",
                          message: "Não pode estar vazio",
                        },
                      })}
                    />
                  </div>
                  <div className={styles.formContainerFlex}>
                    <div className={styles.formContainerFlexQtd}>
                      <div className={styles.containerALabels}>
                        <label
                          htmlFor={`itemList.${index}.quantidade`}
                          className={
                            errors.itemList?.[index]?.quantidade
                              ? `${styles.formLabel} ${styles.formLabelError}`
                              : styles.formLabel
                          }
                        >
                          Qtd
                        </label>
                        {errors.itemList?.[index]?.quantidade && (
                          <p role="alert" className={styles.labelsErrors}>
                            {errors.itemList?.[index]?.quantidade?.message}
                          </p>
                        )}
                      </div>
                      <input
                        type="number"
                        title="Quantidade"
                        id={`itemList.${index}.quantidade`}
                        aria-invalid={
                          errors.itemList?.[index]?.quantidade
                            ? "true"
                            : "false"
                        }
                        aria-required={
                          activatedButton === "btnSaveAndSendCreateForm" ||
                          activatedButton === "btnSaveChangesEditForm"
                        }
                        className={
                          errors.itemList?.[index]?.quantidade
                            ? `${styles.formInput} ${styles.formInputError}`
                            : styles.formInput
                        }
                        {...register(`itemList.${index}.quantidade`, {
                          required: {
                            value:
                              activatedButton === "btnSaveAndSendCreateForm" ||
                              activatedButton === "btnSaveChangesEditForm",
                            message: "Não pode estar vazio",
                          },
                          min: {
                            value: 1,
                            message: "Qtd mínima 1",
                          },
                          valueAsNumber: true,
                          onChange: (e) => {
                            setValue(
                              `itemList.${index}.total`,
                              (e.target.value as number) *
                                getValues(`itemList.${index}.preco`)
                            );
                          },
                        })}
                      />
                    </div>
                    <div className={styles.formContainerFlexPreco}>
                      <div className={styles.containerALabels}>
                        <label
                          htmlFor={`itemList.${index}.preco`}
                          className={
                            errors.itemList?.[index]?.preco
                              ? `${styles.formLabel} ${styles.formLabelError}`
                              : styles.formLabel
                          }
                        >
                          Preço
                        </label>
                        {errors.itemList?.[index]?.preco && (
                          <p role="alert" className={styles.labelsErrors}>
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
                        aria-required={
                          activatedButton === "btnSaveAndSendCreateForm" ||
                          activatedButton === "btnSaveChangesEditForm"
                        }
                        className={
                          errors.itemList?.[index]?.preco
                            ? `${styles.formInput} ${styles.formInputError}`
                            : styles.formInput
                        }
                        {...register(`itemList.${index}.preco`, {
                          required: {
                            value:
                              activatedButton === "btnSaveAndSendCreateForm" ||
                              activatedButton === "btnSaveChangesEditForm",
                            message: "Não pode estar vazio",
                          },
                          min: {
                            value: 1,
                            message: "Preço mínimo 1",
                          },
                          valueAsNumber: true,
                          onChange: (e) => {
                            setValue(
                              `itemList.${index}.total`,
                              (e.target.value as number) *
                                getValues(`itemList.${index}.quantidade`)
                            );
                          },
                        })}
                      />
                    </div>
                    <div className={styles.formContainerFlexTotal}>
                      <div className={styles.containerALabels}>
                        <label
                          htmlFor={`itemList.${index}.total`}
                          className={styles.formLabel}
                        >
                          Total
                        </label>
                      </div>
                      <input
                        type="text"
                        title="Total"
                        id={`itemList.${index}.total`}
                        readOnly={true}
                        className={`${styles.formInput} ${styles.formInputReadonly}`}
                        {...register(`itemList.${index}.total`)}
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
                      className={styles.formBtnDelete}
                    >
                      <Delete className={styles.formBtnDeleteIcon} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
          className={`btn3 ${styles.formBtnAddNewItem}`}
        >
          + Adicionar novo item
        </button>
      </fieldset>
      <div className={styles.formContainerWarnings}>
        {Object.values(errors).length > 0 && (
          <p role="alert" className={styles.formWarning}>
            - Todos os campos devem ser adicionados
          </p>
        )}
        {errors.itemList && (
          <p
            role="alert"
            className={styles.formWarning}
          >{`- ${errors.itemList.root?.message}`}</p>
        )}
      </div>
    </form>
  );
}
