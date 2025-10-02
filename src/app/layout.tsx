
import "./globals.css";
import "../lib/fontawesome";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

import { Nunito } from "next/font/google";
const nunito = Nunito({
  subsets: ["vietnamese"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});



export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`min-h-screen flex flex-col ${nunito.variable} font-sans`}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#96C8DD",
              fontFamily: "var(--font-sans)",
            },
          }}
        >
          <Header />

          <main className="flex-1 w-full">{children}</main>

          <Footer />
        </ConfigProvider>
      </body>
    </html>
  );
}
