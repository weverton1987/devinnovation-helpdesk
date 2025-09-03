import { Container } from "@/components/container"
import Link from "next/link";

export function DashboardHeader() {
    return (
        <Container>
            <header className="w-full bg-gray-800 text-white flex items-center gap-6">
                <Link href="/dashboard">
                    <h1 className="text-lg font-bold">Chamados</h1>
                </Link>
                <Link href="/dashboard/customer ">
                    <h1 className="text-lg font-bold">Clientes</h1>
                </Link>                
            </header>
        </Container>
    );
}
