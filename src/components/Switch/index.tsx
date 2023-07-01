"use client";

import { useThemeContext } from "@/context/ThemeContext";
import Moon from "../Icons/Moon";
import Sun from "../Icons/Sun";
import { KeyboardEvent, MouseEvent } from "react";
import styles from "./styles.module.css";

export default function Switch({className} : {className?: string}) {
  const themeContext = useThemeContext();

  function toggleStatus(
    event:
      | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
      | React.KeyboardEvent<HTMLButtonElement>
  ) {
    let state = "";
    if (event.currentTarget.getAttribute("aria-checked") === "true") {
      state = "false";
    } else {
      state = "true";
    }
    event.currentTarget.setAttribute("aria-checked", state);
  }

  function handleClick(
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    toggleStatus(event);
    themeContext.toggleTheme(
      event.currentTarget.getAttribute("aria-checked") === "true"
        ? "dark"
        : "light"
    );
  }

  function handleKeydown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      toggleStatus(event);
      themeContext.toggleTheme(
        event.currentTarget.getAttribute("aria-checked") === "true"
          ? "dark"
          : "light"
      );
    }
  }

  return (
    <button
      type="button"
      title="Alternar tema de cores"
      aria-label="Alternar tema de cores"
      role="switch"
      aria-checked={themeContext.theme === "light" ? false : true}
      onClick={handleClick}
      onKeyDown={handleKeydown}
      className={className ? `${className} ${styles.buttonSwitch}` :  styles.buttonSwitch}
    >
      {themeContext.theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
