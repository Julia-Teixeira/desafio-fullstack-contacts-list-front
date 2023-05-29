"use client";
import Button from "@/components/button";
import Card from "@/components/cardContacts";
import { ModalCreateContacts } from "@/components/modal/modalCreateContact";
import { ModalDeleteContact } from "@/components/modal/modalDeleteContact";
import { ModalEditClients } from "@/components/modal/modalEditClient";
import { ModalEditContact } from "@/components/modal/modalEditContact";
import img from "@/image/agenda.svg";
import { useClient } from "@/provider/clientProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { FaUserEdit, FaFilePdf, FaUserPlus } from "react-icons/fa";
import { jsPDF } from "jspdf";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Dashboard() {
  const { client, contacts, loading, setClient, getClientData } = useClient();
  const router = useRouter();
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenEditClient, setIsOpenEditClient] = useState(false);
  const [isOpenDeleteContact, setIsOpenDeleteContact] = useState(false);
  const [isOpenEditContact, setIsOpenEditContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    (async () => {
      await getClientData();
    })();
  });

  function logOut() {
    localStorage.clear();
    setClient(null);
    router.push("/");
  }

  function newPdf() {
    const doc = new jsPDF({ orientation: "p" });

    doc.setFontSize(32);
    doc.setTextColor("#200726");
    doc.text(`Relatório de ${client?.full_name}`, 10, 10);

    doc.setFontSize(12);
    doc.text("Nome Completo - Telefone - E-mail", 10, 20);
    doc.text(`Total de contatos: ${contacts?.length}`, 10, 30);
    let line = 30;
    contacts!.map((contact) =>
      doc.text(
        `${contact.full_name} - ${contact.phone} - ${contact.email}`,
        10,
        (line += 10)
      )
    );
    doc.save(`contactList${client?.id}.pdf`);
  }

  return (
    <main className="flex min-h-screen flex-col justify-between items-center">
      {isOpenCreate ? (
        <ModalCreateContacts
          isOpen={isOpenCreate}
          setIsOpen={setIsOpenCreate}
        />
      ) : null}
      {isOpenEditClient ? (
        <ModalEditClients
          isOpen={isOpenEditClient}
          setIsOpen={setIsOpenEditClient}
        />
      ) : null}
      {isOpenEditContact ? (
        <ModalEditContact
          isOpen={isOpenEditContact}
          setIsOpen={setIsOpenEditContact}
          contact={selectedContact!}
        />
      ) : null}
      {isOpenDeleteContact ? (
        <ModalDeleteContact
          isOpen={isOpenDeleteContact}
          setIsOpen={setIsOpenDeleteContact}
          contact={selectedContact!}
        />
      ) : null}
      <header className="flex justify-between h-[133px] w-[80%]  pt-[30px]">
        <div className="flex items-center">
          <Image alt="Agenda" src={img} className="w-[68px] h-[68px]" />
          <h1 className="text-purple800 text-4xl font-semibold ">Contatos</h1>
        </div>

        <div className="flex gap-2.5 items-center  ">
          <p
            className="text-right cursor-pointer font-semibold"
            onClick={() => logOut()}
          >
            Sair
          </p>
        </div>
      </header>
      <div className="flex gap-12 w-[80%]">
        <article className="w-[404px] h-[90vh] flex flex-col bg-purple-100/30 rounded-r-3xl items-center ">
          <Image
            alt={`Imagem de perfil de ${client!?.full_name}`}
            src={client!?.image}
            width={224}
            height={300}
            className="mt-[20px] w-[auto] h-[auto]"
          />

          <p className="text-purple800 text-2xl mt-[10px]">
            {client?.full_name}
          </p>
          <p className="text-purple800 text-xl">{client?.email}</p>
          <p className="text-purple800 text-xl">{client?.phone}</p>

          <div className="flex flex-col gap-[16px] mt-[30px]">
            <Button
              text="Editar Conta"
              type="button"
              color="bg-[--color-purple-500]"
              onClick={() => setIsOpenEditClient(true)}
              w="w-[310px]"
            >
              <FaUserEdit />
            </Button>
            <Button
              text="Criar novo contato"
              type="button"
              color="bg-[--color-purple-500]"
              onClick={() => setIsOpenCreate(true)}
              w="w-[310px]"
            >
              <FaUserPlus />
            </Button>
            <Button
              text="Gerar um relatório"
              type="button"
              color="bg-[--color-purple-500]"
              w="w-[310px]"
              onClick={() => newPdf()}
            >
              <FaFilePdf />
            </Button>
          </div>
        </article>

        <article className="flex flex-col gap-2.5 w-[50vw]">
          {contacts ? (
            contacts?.map((contact) => (
              <Card
                contact={contact}
                key={contact.id}
                setIsOpenDelete={setIsOpenDeleteContact}
                setIsOpenEdit={setIsOpenEditContact}
                setSelectedContact={setSelectedContact}
              />
            ))
          ) : (
            <p>Você não possui contato</p>
          )}
        </article>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
}
