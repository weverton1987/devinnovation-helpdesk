import Image from "next/image";
// import { Hero } from "@/components/hero";
// If you have the Hero component, make sure the path is correct, e.g.:
import Hero from "@/assets/hero.svg";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] flex-1 px-20 text-center">
      <h2 className="font-medium text-2xl mb-2">Gerencie sua empresa</h2>
      <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">Atendimentos, clientes</h1>
      <Image src={Hero} alt="Gerenciar" width={600} height={300} className="max-w-sm md:max-w-xl"/>
    </main>
  );
}
