import "./globals.css";
import '../lib/fontawesome';
import Header from "@/components/Header";
import { ConfigProvider } from "antd";
import Footer from "@/components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
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


          <Header />
          {children}
          <Footer/>
        </ConfigProvider>
      </body>
    </html>
  );
}
