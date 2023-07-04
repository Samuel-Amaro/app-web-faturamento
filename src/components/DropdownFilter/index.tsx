"use client";

import { ChangeEvent, ReactNode, useRef, useState } from "react";
import ArrowDown from "../Icons/ArrowDown";
import {
  getFocusableElements,
  getRefs,
  nextFocusable,
  setToFocus,
} from "@/utils/utils";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import useMatchMedia from "@/hooks/useMatchMedia";
import styles from "./style.module.css";

export type Option = {
  value: string;
  label: string;
};

type PropsDropdown = {
  options: Option[];
  onChange: (value: string, typeAction: "add" | "delete") => void;
  className?: string;
};

export default function DropdownFilter({
  options,
  onChange,
  className,
}: PropsDropdown) {
  const [menuDropdownIsOppen, setMenuDropdownIsOppen] = useState(false);
  const refBtn = useRef<HTMLButtonElement | null>(null);
  const refsOptionsDropdown = useRef<HTMLInputElement[] | null>(null);
  const refList = useRef<HTMLUListElement | null>(null);
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(options.length).fill(false)
  );
  const refContainerDropdown = useRef<HTMLDivElement | null>(null);

  function handleClickButton() {
    setMenuDropdownIsOppen(!menuDropdownIsOppen);
  }

  function handleKeyDownButton(e: React.KeyboardEvent<HTMLButtonElement>) {
    switch (e.key) {
      case " ":
      case "Enter":
      case "ArrowDown":
      case "Down":
        e.preventDefault();
        setMenuDropdownIsOppen(true);
        setToFocus(0, refsOptionsDropdown);
        break;
      case "Esc":
      case "Escape":
        setMenuDropdownIsOppen(false);
        refBtn.current?.focus();
        break;
      case "Up":
      case "ArrowUp":
        e.preventDefault();
        setMenuDropdownIsOppen(true);
        setToFocus(
          getRefs(refsOptionsDropdown).length - 1,
          refsOptionsDropdown
        );
        break;
      default:
        break;
    }
  }

  function handleChangeOptionDropdown(
    event: ChangeEvent<HTMLInputElement>,
    position: number
  ) {
    const updateCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    if (event.target.checked) {
      onChange(event.target.value, "add");
    } else {
      onChange(event.target.value, "delete");
    }
    setCheckedState(updateCheckedState);
  }

  function handleKeydownCheckbox(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case "Tab":
        event.preventDefault();
        nextFocusable(getFocusableElements(refList.current), !event.shiftKey);
        break;
      case "Esc":
      case "Escape":
        setMenuDropdownIsOppen(false);
        refBtn.current?.focus();
        break;
      case "ArrowDown":
      case "Down":
      case "Up":
      case "ArrowUp":
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  function handleOnCloseDropdown() {
    setMenuDropdownIsOppen(false);
  }

  useOnClickOutside({
    ref: refContainerDropdown,
    handle: handleOnCloseDropdown,
  });

  const txtButton = useMatchMedia({
    mobileContent: (
      <>
        <TextButton>Filtro</TextButton>
        <ArrowDown
          className={
            menuDropdownIsOppen
              ? `${styles.iconButton} ${styles.iconButtonTop}`
              : `${styles.iconButton} ${styles.iconBottom}`
          }
        />
      </>
    ),
    desktopContent: (
      <>
        <TextButton>Filtrar por status</TextButton>
        <ArrowDown
          className={
            menuDropdownIsOppen
              ? `${styles.iconButton} ${styles.iconButtonTop}`
              : `${styles.iconButton} ${styles.iconButtonBottom}`
          }
        />
      </>
    ),
    mediaQuery: "(min-width: 690px)",
  });

  return (
    <div ref={refContainerDropdown} className={styles.container}>
      <button
        type="button"
        title={
          menuDropdownIsOppen
            ? "Fechar opções de filtro"
            : "Abrir opções de filtro"
        }
        id="buttonDrop"
        aria-haspopup="true"
        aria-controls="list1"
        aria-expanded={menuDropdownIsOppen}
        aria-label={
          menuDropdownIsOppen
            ? "Fechar opções de filtro"
            : "Abrir opções de filtro"
        }
        onClick={handleClickButton}
        onKeyDown={handleKeyDownButton}
        ref={refBtn}
        className={styles.button}
      >
        {txtButton}
      </button>
      {menuDropdownIsOppen && (
        <ul
          id="list1"
          aria-labelledby="buttonDrop"
          ref={refList}
          className={styles.dropdowMenu}
        >
          {options.map((option, index) => (
            <li key={index} className={styles.item}>
              <input
                type="checkbox"
                name="filter"
                value={option.value}
                id={option.value}
                onChange={(e) => handleChangeOptionDropdown(e, index)}
                ref={(option) => {
                  const refItems = getRefs(refsOptionsDropdown);
                  if (option) {
                    refItems.push(option);
                  } else {
                    refItems.splice(0, 1);
                  }
                }}
                onKeyDown={handleKeydownCheckbox}
                checked={checkedState[index]}
                className={styles.input}
              />
              <label htmlFor={option.value} className={styles.label}>
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TextButton({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}
