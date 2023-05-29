import { Dispatch } from "react";
import { ModalContainer } from ".";
import { SetStateAction } from "react";
import { useClient } from "@/provider/clientProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  schemaRegister,
  RegisterData,
} from "@/provider/authProvider/validator";
import Input from "../input";
import Button from "../button";

interface ModalEditClientProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function ModalEditClients({ isOpen, setIsOpen }: ModalEditClientProps) {
  const { client, getClientData, editClient, loading } = useClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(schemaRegister),
  });

  function contactEdit(data: RegisterData) {
    editClient(data);
    getClientData();
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      titleModal="Editar Usuário"
    >
      <div className="flex flex-col gap-[10px]">
        <form
          className="flex flex-col gap-[10px]"
          onSubmit={handleSubmit(contactEdit)}
        >
          <Input
            defaultValue={client!.full_name}
            type="text"
            id="full_name"
            label="Nome completo"
            width="w-[379px]"
            placeholder="Nome completo"
            register={register("full_name")}
            error={errors?.full_name?.message}
          />
          <Input
            defaultValue={client!.email}
            type="email"
            id="email"
            label="Email"
            width="w-[379px]"
            placeholder="email@email.com"
            register={register("email")}
            error={errors?.email?.message}
          />
          <Input
            defaultValue={client!.phone}
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
          <Input
            type="password"
            id="password"
            label="Senha"
            width="w-[379px]"
            placeholder="***********"
            register={register("password", { required: true })}
            error={errors?.password?.message}
          />

          <Input
            type="password"
            id="confirm_password"
            label="Confirmar senha"
            width="w-[379px]"
            placeholder="***********"
            register={register("confirmPassword", { required: true })}
            error={errors?.confirmPassword?.message}
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
