"use client";
import Image from "next/image";
import img from "@/image/agenda.svg";
import Button from "@/components/button";
import Input from "@/components/input";
import Link from "next/link";
import { useAuth } from "@/provider/authProvider";
import { schema } from "@/provider/authProvider/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  return (
    <main className="flex min-h-screen items-center justify-evenly p-24">
      <div className="w-128 bg-purple-300/50  h-130 rounded-2xl flex flex-col items-center pt-[36px]">
        <h2 className="text-purple800 text-4xl font-semibold">
          Bem vindo de volta!
        </h2>
        <form
          onSubmit={handleSubmit(signIn)}
          className="flex flex-col gap-y-10 mt-[31px]"
        >
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
            type="password"
            id="password"
            label="Senha"
            width="w-[379px]"
            placeholder="***********"
            register={register("password", { required: true })}
            error={errors?.password?.message}
          />

          <Button
            text="Entrar"
            type="submit"
            disabled={!isValid}
            w="w-[374px]"
            color="--color-purple-600"
          />
        </form>

        <div className="w-[379px] h-[1px] bg-white mt-[40px]" />
        <p className="text-purple800 text-2xl text-center mt-[40px] mb-[23px]">
          Ainda não possui uma <br />
          conta?
        </p>
        <Link href="/register">
          <Button
            text="Criar sua conta"
            type="button"
            w="w-[374px]"
            color="--color-purple-600"
          />
        </Link>
      </div>
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
    </main>
  );
}
