import { useEffect } from "react";

export default function useNoScroll() {
  useEffect(() => {
    document.body.classList.add("has-dialog");

    return () => {
      document.body.classList.remove("has-dialog");
    };
  }, []);
}
