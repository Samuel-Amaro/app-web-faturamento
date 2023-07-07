import ContentPageInvoice from "@/components/ContentPageInvoice";
import ArrowLeft from "@/components/Icons/ArrowLeft";
import Link from "next/link";
import styles from "./style.module.css";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Fatura #${params.id}`,
    description: "Wep App de faturamento",
    keywords: ["Faturamento", "Contas", "Boletos", "Fatura"],
    icons: {
      icon: "/logo.svg",
      shortcut: "/logo.svg",
      apple: "/logo.svg",
    },
    openGraph: {
      title: `Fatura #${params.id}`,
      description: "",
      url: "/",
      type: "website",
      siteName: "App Faturamento",
      locale: "pt-br",
    },
  };
}

export default function Page({ params }: Props) {
  return (
    <div className={styles.container}>
      <Link
        href="/"
        title="Voltar"
        aria-label="Voltar"
        className={styles.containerLinkVoltar}
      >
        <ArrowLeft className={styles.containerIconLink} />
        Voltar
      </Link>
      <ContentPageInvoice idInvoice={params.id} />
    </div>
  );
}
