"use client";

export function getLocalStorage<Type>(
  key: string,
  initialValue: Type | (() => Type)
) {
  const data = window.localStorage.getItem(key);

  if (!data) {
    if (typeof initialValue === "function") {
      return (initialValue as () => Type)();
    } else {
        return initialValue;
    }
  }

  return JSON.parse(data) as Type;
}

export function setLocalStorage(key: string, value: unknown) {
    const data = JSON.stringify(value);
    window.localStorage.setItem(key, data);
}