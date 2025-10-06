"use client";

import { ReactNode } from "react";
import { ConfigProvider } from "antd";

import { AuthProvider } from "@/contexts/AuthContext";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
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
  );
}
