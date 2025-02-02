"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createGlobalStyle } from "styled-components";

// Estilos globais para sobrepor estilos do clerk
const GlobalStyle = createGlobalStyle`
    .cl-userButtonOuterIdentifier{
        font-weight: 700;
    }
`;

const Navbar = () => {
    const pathname = usePathname();

    return (
        <>
            <GlobalStyle />
            <nav className="flex justify-between border-b border-solid px-8 py-4">
                {/* ESQUERDA */}
                <div className="flex items-center gap-10">
                    <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
                    <Link
                        href="/"
                        className={
                            pathname === "/"
                                ? "font-bold text-primary"
                                : "text-muted-foreground font-semibold"
                        }
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/transactions"
                        className={
                            pathname === "/transactions"
                                ? "font-bold text-primary"
                                : "text-muted-foreground font-semibold"
                        }
                    >
                        Transações
                    </Link>
                    <Link
                        href="/subscription"
                        className={
                            pathname === "/subscription"
                                ? "font-bold text-primary"
                                : "text-muted-foreground font-semibold"
                        }
                    >
                        Assinatura
                    </Link>
                </div>
                {/* DIREITA */}
                <div className="font-bold">
                    <UserButton showName />
                </div>
            </nav>
        </>
    );
};

export default Navbar;