import Image from "next/image";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { FaUserEdit, FaTrash } from "react-icons/fa";

interface CardProps {
  contact: Contact;
  setIsOpenEdit: Dispatch<SetStateAction<boolean>>;
  setIsOpenDelete: Dispatch<SetStateAction<boolean>>;
  setSelectedContact: Dispatch<SetStateAction<Contact | null>>;
}

export default function Card({
  contact,
  setIsOpenDelete,
  setIsOpenEdit,
  setSelectedContact,
}: CardProps) {
  function openModalDelete() {
    setSelectedContact(contact);
    setIsOpenDelete(true);
  }

  function openModalEdit() {
    setSelectedContact(contact);
    setIsOpenEdit(true);
  }

  return (
    <div className="px-[20px] flex justify-between bg-purple-100 w-[100%] h-[102px] items-center rounded-lg hover:bg-purple-300">
      <div className="flex items-center gap-[22px]">
        <Image
          alt={`Imagem de perfil de ${contact!?.full_name}`}
          src={contact!?.image}
          width={70}
          height={70}
        />
        <div className="flex items-center flex-col text-purple800 text-2xl">
          <p>{contact.full_name}</p>
        </div>
      </div>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <div className="flex flex-col gap-3.5 mt-[6px]">
        <FaUserEdit
          size={25}
          className="cursor-pointer"
          onClick={() => openModalEdit()}
        />
        <FaTrash
          size={25}
          className="cursor-pointer"
          onClick={() => openModalDelete()}
        />
      </div>
    </div>
  );
}
