
import "./globals.css";
import "../lib/fontawesome";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#96C8DD",
              fontFamily: '"LinotteBold", sans-serif',
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
