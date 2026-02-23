import "./globals.css"
import type { ReactNode } from "react";

export const metadata = {
  title: "Vytron Systems",
  description: "Regulatory Infrastructure Engineering for financial institutions",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
