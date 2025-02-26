import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
    const authResponse = await auth(); // Obter a resposta de autenticação

    const userID = authResponse.userId; // Pegue o ID do usuário

    if (userID) {
        redirect("/");
    }

    return (
        <div className="grid h-full grid-cols-2">
            {/* ESQUERDA */}
            <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
                <Image
                    src="/logo.svg"
                    width={173}
                    height={39}
                    alt="Finance AI"
                    className="mb-8"
                />
                <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
                <p className="mb-8 text-muted-foreground font-semibold">
                    A Finance AI é uma plataforma de gestão financeira que utiliza IA para
                    monitorar suas movimentações, e oferecer insights personalizados,
                    facilitando o controle do seu orçamento.
                </p>
                <SignInButton>
                    <Button variant="outline">
                        <LogInIcon className="mr-2" />
                        <p className="font-bold">Fazer login ou criar conta</p>
                    </Button>
                </SignInButton>
            </div>
            {/* DIREITA */}
            <div className="relative h-full w-full">
                <Image
                    src="/login.png"
                    alt="Faça o login"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    );
};

export default LoginPage;