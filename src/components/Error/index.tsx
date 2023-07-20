import Image from "next/image";
import styles from "./styles.module.css";

export default function ErrorUi({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className={styles.containerNoContent}>
      <Image
        src="/assets/illustration-empty.svg"
        alt="Ilustração sem contéudo"
        aria-hidden="true"
        width={242}
        height={200}
        className={styles.imageNoContent}
      />
      <h2 className={styles.containerNoContentTitle}>Algo deu errado!</h2>
      <button className={`btn3 ${styles.btn}`} onClick={() => reset()}>Try again</button>
    </div>
  );
}
