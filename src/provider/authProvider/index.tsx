"use client";
import { api } from "@/service/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("your-contactList:token");

    if (!token) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common.authorization = `Bearer ${token}`;
    setLoading(false);
  }, []);

  async function signIn(data: LoginData) {
    try {
      const response = await api.post("/login", data);
      const { token } = response.data;

      api.defaults.headers.common.authorization = `Bearer ${token}`;
      localStorage.setItem("your-contactList:token", token);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  async function registerClient(data: RegisterData) {
    try {
      const response = await api.post("/client", data);
      const { token } = response.data;

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, loading, registerClient }}>
      {children}
    </AuthContext.Provider>
  );
};
