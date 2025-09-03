import { Container } from "@/components/container"
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CustomerCard } from "./components/card";
import prismaClient from '@/lib/prisma';



export default async function Customer() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        redirect("/")
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    });
    

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center justify-between mb-5">
                    <h1 className="text-3xl font-bold">Meus clientes</h1>
                    <Link href="/dashboard/customer/new" className="bg-blue-500 text-white p-4 rounded px-4 py-1">
                        Novo Cliente
                    </Link>
                </div>
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    {customers.map((customer) => (
                        <CustomerCard
                            key={customer.id}
                            customer={{
                                ...customer,
                                userId: customer.userId ?? "",
                                address: customer.address ?? null
                            }}
                        />
                    ))}
                </section>
                {customers.length === 0 && (
                    <p className="text-gray-500">Nenhum cliente encontrado.</p>
                )}
            </main>
        </Container>
    );
}
