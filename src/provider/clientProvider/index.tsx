"use client";
import { api } from "@/service/api";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { ContactRegisterData } from "./validator";
import { RegisterData } from "@/provider/authProvider/validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";

interface ClientContextValues {
  client: Client | null;
  contacts: Contact[] | null;
  setClient: Dispatch<SetStateAction<Client | null>>;
  loading: boolean;
  getClientData: () => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  registerContact: (data: ContactRegisterData) => Promise<void>;
  editContact: (id: string, data: ContactRegisterData) => Promise<void>;
  editClient: (data: RegisterData) => Promise<void>;
}

export const ClientContext = createContext<ClientContextValues>(
  {} as ClientContextValues
);

export const useClient = () => {
  const clientContext = useContext(ClientContext);

  return clientContext;
};

export const ClientProvider = ({ children }: ClientProviderProps) => {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("your-contactList:token");

    if (!token) {
      setLoading(false);
      router.push("/");
      return;
    }
    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setLoading(false);
  }, []);

  async function getClientData() {
    try {
      const response = await api.get("/client");
      setClient(response.data);
      setContacts(response.data.contacts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function editClient(data: RegisterData) {
    try {
      await api.patch(`/client`, data);
      toast.success("Usuário editado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
    } finally {
      setLoading(false);
    }
  }

  async function deleteContact(id: string) {
    try {
      await api.delete(`/contact/${id}`);
      toast.success("Contato deletado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
    } finally {
      setLoading(false);
    }
  }

  async function registerContact(data: ContactRegisterData) {
    try {
      const response = await api.post(`/contact/`, data);
      toast.success("Contato cadastrado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
    } finally {
      setLoading(false);
    }
  }

  async function editContact(id: string, data: ContactRegisterData) {
    try {
      await api.patch(`/contact/${id}`, data);
      toast.success("Contato editado com sucesso!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <ClientContext.Provider
      value={{
        client,
        contacts,
        loading,
        setClient,
        getClientData,
        deleteContact,
        registerContact,
        editContact,
        editClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
