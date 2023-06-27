import Image from "next/image";
import Logo from "../Icons/Logo";
import Switch from "../Switch";

export default function Navbar() {
  return (
    <aside>
      <div>
        <Logo />
      </div>
      <div>
        <Switch />
        <hr />
        <Image
          src="/assets/image-avatar.jpg"
          alt="Image de perfil"
          width={32}
          height={32}
        />
      </div>
    </aside>
  );
}
