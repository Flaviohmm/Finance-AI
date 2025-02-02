import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./_components/navbar";

const Home = async () => {
  const authResponse = await auth(); // Obter a resposta de autenticação

  const userID = authResponse.userId; // Pegue o ID do usuário

  if (!userID) {
    redirect("/login");
  }

  return (
    <Navbar />
  );
};

export default Home;