"use client";
import Button from "@/components/button";
import Input from "@/components/input";
import Image from "next/image";
import img from "@/image/agenda.svg";
import Link from "next/link";
import { useAuth } from "@/provider/authProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterData,
  schemaRegister,
} from "@/provider/authProvider/validator";

export default function Register() {
  const { registerClient } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(schemaRegister),
  });
  return (
    <main className="flex min-h-screen items-center justify-evenly p-24">
      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-purple800 text-4xl font-semibold">
          Lista de Contatos
        </h2>
        <Image alt="Imagem de uma agenda" src={img}></Image>
        <p className="text-white text-3.5xl">
          Simplifique a forma de <br />
          gerenciar seus contatos
        </p>
      </div>

      <div className="w-128 bg-purple-300/50  h-[899px] rounded-2xl flex flex-col items-center pt-[36px]">
        <h2 className="text-purple800 text-4xl font-semibold">
          Crie sua conta
        </h2>
        <form
          onSubmit={handleSubmit(registerClient)}
          className="flex flex-col gap-y-6 mt-[31px]"
        >
          <Input
            type="text"
            id="fullname"
            label="Nome Completo"
            width="w-[379px]"
            placeholder="Nome completo"
            register={register("full_name", { required: true })}
            error={errors?.full_name?.message}
          />

          <Input
            type="text"
            id="email"
            label="Email"
            width="w-[379px]"
            placeholder="email@email.com"
            register={register("email", { required: true })}
            error={errors?.email?.message}
          />

          <Input
            type="text"
            id="phone"
            label="Telefone"
            width="w-[379px]"
            placeholder="(00) 0 0000-0000"
            register={register("phone", { required: true })}
            error={errors?.phone?.message}
          />

          <Input
            type="text"
            id="image"
            label="Imagem"
            width="w-[379px]"
            placeholder="Url da imagem"
            register={register("image", { required: true })}
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
            text="Registrar"
            type="submit"
            w="w-[310px]"
            color="--color-purple-600"
          />
        </form>

        <div className="w-[379px] h-[1px] bg-white mt-[40px]" />
        <p className="text-purple800 text-2xl text-center mt-[40px] mb-[23px]">
          Já possui conta?
        </p>
        <Link href="/">
          <Button
            text="Ir para o Login"
            type="button"
            w="w-[310px]"
            color="--color-purple-600"
          />
        </Link>
      </div>
    </main>
  );
}
