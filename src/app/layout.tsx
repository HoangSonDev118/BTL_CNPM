import "./globals.css";
import '../lib/fontawesome';
import Header from "@/components/Header";
import { ConfigProvider } from "antd";
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  subsets: ['vietnamese'],
  weight: ['400','600','700','800'],
  variable: '--font-sans',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col items-center ${nunito.variable} font-sans`}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#96C8DD",
              fontFamily: 'var(--font-sans)',
            },
            components: {
              // Input: {
              //   lineWidth: 2,      // border dày hơn
              //   borderRadius: 5,  
              //   controlHeight: 48,
              // },
            },
          }}
        >
          <Header/>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
