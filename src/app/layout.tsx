import "./globals.css";
import '../lib/fontawesome';
import Header from "@/components/Header";
import { ConfigProvider } from "antd";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#96C8DD",
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
