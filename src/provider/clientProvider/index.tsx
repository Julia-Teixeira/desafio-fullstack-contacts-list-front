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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteContact(id: string) {
    try {
      await api.delete(`/contact/${id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function registerContact(data: ContactRegisterData) {
    try {
      await api.post(`/contact/`, data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function editContact(id: string, data: ContactRegisterData) {
    try {
      await api.patch(`/contact/${id}`, data);
    } catch (error) {
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
