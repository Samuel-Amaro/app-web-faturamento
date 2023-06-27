import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

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
          <div className="container">
            <Navbar />
            {children}
          </div>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
