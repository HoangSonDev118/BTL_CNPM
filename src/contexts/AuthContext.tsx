"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Role } from "@/lib/roles";

type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  role: Role;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (...roles: AuthUser["role"][]) => boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });
      if (!response.ok) {
        setUser(null);
        return;
      }
      const data = (await response.json()) as { user: AuthUser };
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      refresh: fetchProfile,
      logout,
      hasRole: (...roles: AuthUser["role"][]) =>
        roles.some((role) => (user ? user.role === role : false)),
    }),
    [user, loading, fetchProfile, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được sử dụng bên trong AuthProvider");
  }
  return context;
}
