"use client";

import React, { useEffect } from "react";

type ParamsUseClickOutside = {
  ref: React.RefObject<HTMLElement | null>;
  handle: () => void;
};

export default function useOnClickOutside({
  ref,
  handle,
}: ParamsUseClickOutside) {
  function handleClick(ev: MouseEvent) {
    if (
      ref.current?.contains(ev.target as Node) &&
      (ref.current as HTMLElement) !== ev.target
    ) {
      return;
    }
    handle();
  }

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  });
}
