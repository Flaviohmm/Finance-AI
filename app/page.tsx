import { UserButton } from "@clerk/nextjs";
import { Button } from "./_components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const authResponse = await auth(); // Obter a resposta de autenticação

  console.log(authResponse); // Verifique a estrutura do que foi retornado

  const userID = authResponse.userId;  // Pegue o ID do usuário

  if (!userID) {
    redirect("/login");
  }

  return (
    <div className="flex h-full items-center justify-center">
      <UserButton showName />
    </div>
  );
};

export default Home;