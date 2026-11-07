import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const loew = localFont({
  src: [
    { path: "../public/fonts/Loew-Regular.otf", weight: "400" },
    { path: "../public/fonts/Loew-Bold.otf", weight: "700" },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dashboard de Resultados Críticos",
  description:
    "Demonstração de acompanhamento de resultados laboratoriais críticos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={loew.className}>{children}</body>
    </html>
  );
}
