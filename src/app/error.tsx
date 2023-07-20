"use client";

import ErrorUi from "@/components/Error";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  return (
    <ErrorUi error={error} reset={reset}/>
  );
}
