"use client";
import { api } from "@/service/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";

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

      toast.success("Login feito com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error: any) {
      toast.error("Email ou senha incorretos", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  async function registerClient(data: RegisterData) {
    try {
      const response = await api.post("/client", data);

      toast.success("Cadastro feito com sucesso!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error: any) {
      const err = error as AxiosError;

      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, loading, registerClient }}>
      {children}
    </AuthContext.Provider>
  );
};
