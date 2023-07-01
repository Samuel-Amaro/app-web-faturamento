"use client";

import { ChangeEvent, useRef, useState } from "react";
import ArrowDown from "../Icons/ArrowDown";
import {
  getFocusableElements,
  getRefs,
  nextFocusable,
  setToFocus,
} from "@/utils/utils";
import useOnClickOutside from "@/hooks/useOnClickOutside";

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

  return (
    <div ref={refContainerDropdown}>
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
      >
        <span>Filtro</span> <ArrowDown />
      </button>
      {menuDropdownIsOppen && (
        <ul id="list1" aria-labelledby="buttonDrop" ref={refList}>
          {options.map((option, index) => (
            <li key={index}>
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
              />
              <label htmlFor={option.value}>{option.label}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
