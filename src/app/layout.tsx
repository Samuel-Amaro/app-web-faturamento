import "../styles/normalize.css";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import { League_Spartan } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";
import DataContextProvider from "@/context/DatasContext";

const inter = League_Spartan({ subsets: ["latin"], weight: ["500", "700"] });

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <ThemeContextProvider>
          <DataContextProvider>
            <div className="container">
              <Navbar />
              {children}
            </div>
          </DataContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
