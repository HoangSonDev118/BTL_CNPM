"use client";

import { ReactNode } from "react";
import { ConfigProvider } from "antd";

import { AuthProvider } from "@/contexts/AuthContext";
import { DarkModeProvider } from "@/contexts/DarkModeContext";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#96C8DD",
              fontFamily: '"LinotteBold", sans-serif',
              fontSize: 15,
            },
          }}
        >

          {children}
        </ConfigProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
}
