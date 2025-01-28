import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";

const Home = async () => {
  const authResponse = await auth(); // Obter a resposta de autenticação

  const userID = authResponse.userId; // Pegue o ID do usuário

  if (!userID) {
    redirect("/login");
  }

  return (
    <div className="flex h-full items-center justify-center">
      <UserButton 
        showName 
        appearance={{
          baseTheme: dark,
        }}
      />
    </div>
  );
};

export default Home;