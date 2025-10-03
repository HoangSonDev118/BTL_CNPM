import "./globals.css";
import "../lib/fontawesome";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />

          <main className="flex-1 w-full">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
