import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { TicketItem } from "./components/ticket";
import prismaClient from "@/lib/prisma";
import { ButtonRefresh } from './components/buttonRefresh';

export default async function Dashboard() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        redirect("/")
    }

    const tickets = await prismaClient.ticket.findMany({
        where: {
            status: 'ABERTO',
            customer: {
                userId: session.user.id
            }
        },
        include: {
            customer: true
        },
        orderBy: {
            created_at: 'asc'
        }
    })


    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between">
                    <h1 className="font-bold text-3xl md:text-4xl">Chamados</h1>
                    <div className="flex items-center gap-2">
                        <ButtonRefresh />
                        <Link href="/dashboard/new" className="bg-blue-500 text-white p-4 rounded px-4 py-1">
                            Novo Chamado
                        </Link>
                    </div>
                </div>
                <table className="min-w-full mt-2">
                    <thead>
                        <tr>
                            <th className="text-left font-medium pl-1">CLIENTE</th>
                            <th className="text-left font-medium hidden sm:table-cell">DATA CADASTRO</th>
                            <th className="text-left font-medium">STATUS</th>
                            <th className="text-left font-medium">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <TicketItem key={ticket.id} ticket={ticket} customer={ticket.customer} />
                        ))}
                    </tbody>
                </table>
                {tickets.length === 0 && (
                    <div className="text-center py-4 px-2 md:px-0">
                        <p className="text-gray-500">Nenhum chamado em aberto foi encontrado...</p>
                    </div>
                )}
            </main>
        </Container>
    );
}
