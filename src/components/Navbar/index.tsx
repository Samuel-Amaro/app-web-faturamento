import Image from "next/image";
import Logo from "../Icons/Logo";
import Switch from "../Switch";
import styles from "./styles.module.css";

//TODO: FOCAR STYLES DESKTOP AQUI

export default function Navbar() {
  return (
    <aside className={styles.container}>
      <Logo className={styles.containerLogo} />
      <div className={styles.containerControls}>
        <Switch className={styles.switch} />
        <hr className={styles.lineDiviser} />
        <Image
          src="/assets/image-avatar.jpg"
          alt="Image de perfil"
          width={32}
          height={32}
          className={styles.profile}
        />
      </div>
    </aside>
  );
}
