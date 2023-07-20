import "../styles/normalize.css";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { League_Spartan } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import DataContextProvider from "@/context/DatasContext";

const spartan = League_Spartan({ subsets: ["latin"], weight: ["500", "700"] });

export const metadata = {
  title: "App Faturamento",
  description: "Aplicativo web faturamento",
  keywords: ["Faturamento", "Contas", "Boletos", "Fatura"],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "App Faturamento",
    description: "",
    url: "/",
    type: "website",
    siteName: "App Faturamento",
    locale: "pt-br",
  },
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={spartan.className}>
        <ThemeContextProvider>
          <DataContextProvider>
            <div className="container">
              <div>
                <Navbar />
              </div>
              {props.children}
            </div>
            {props.modal}
          </DataContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
