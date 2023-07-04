import styles from "./page.module.css";
import ContentPageHome from "@/components/ContentPageHome";

export default function Home() {
  return (
    <div className={styles.container}>
      <ContentPageHome />
    </div>
  );
}
