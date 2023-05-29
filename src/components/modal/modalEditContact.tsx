import { Dispatch } from "react";
import { ModalContainer } from ".";
import { SetStateAction } from "react";
import Input from "../input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactRegisterData,
  schemaContactsRegister,
} from "@/provider/clientProvider/validator";
import Button from "../button";
import { useClient } from "@/provider/clientProvider";

interface ModalEditContactProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  contact: Contact;
}

export function ModalEditContact({
  isOpen,
  setIsOpen,
  contact,
}: ModalEditContactProps) {
  const { getClientData, editContact, loading } = useClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactRegisterData>({
    resolver: zodResolver(schemaContactsRegister),
  });

  function contactEdit(data: ContactRegisterData) {
    editContact(contact.id, data);
    getClientData();
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      titleModal="Editar Contato"
    >
      <div className="flex flex-col gap-[10px]">
        <form
          className="flex flex-col gap-[10px]"
          onSubmit={handleSubmit(contactEdit)}
        >
          <Input
            defaultValue={contact.full_name}
            type="text"
            id="full_name"
            label="Nome completo"
            width="w-[379px]"
            placeholder="Nome completo"
            register={register("full_name")}
            error={errors?.full_name?.message}
          />
          <Input
            defaultValue={contact.email}
            type="email"
            id="email"
            label="Email"
            width="w-[379px]"
            placeholder="email@email.com"
            register={register("email")}
            error={errors?.email?.message}
          />
          <Input
            defaultValue={contact.phone}
            type="text"
            id="phone"
            label="Telefone"
            width="w-[379px]"
            placeholder="(00) 0 0000-0000"
            register={register("phone")}
            error={errors?.phone?.message}
          />
          <Input
            type="file"
            id="image"
            label="Imagem"
            width="w-[379px]"
            register={register("image")}
            error={errors?.image?.message}
          />
          <Button
            text="Alterar"
            w="w-[379px]"
            color="bg-[--color-purple-600]"
            type="submit"
            loading={loading}
          />
        </form>
      </div>
    </ModalContainer>
  );
}
