"use client";

export function getLocalStorage<Type>(
  key: string,
  initialValue: Type | (() => Type)
) {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem(key);
    if (!data) {
      if (typeof initialValue === "function") {
        return (initialValue as () => Type)();
      } else {
        return initialValue;
      }
    }
    return JSON.parse(data) as Type;
  } else {
    if (typeof initialValue === "function") {
      return (initialValue as () => Type)();
    } else {
      return initialValue;
    }
  }
}

export function setLocalStorage(key: string, value: unknown) {
  if (typeof window !== "undefined") {
    const data = JSON.stringify(value);
    window.localStorage.setItem(key, data);
  }
}
