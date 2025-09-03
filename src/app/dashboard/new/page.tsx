import { Container } from "@/components/container"
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma"; // Import prismaClient

export default async function NewTicket() {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        redirect('/')
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    async function handleRegisterTicket(formData: FormData) {
        'use server'

        const name = formData.get('name') as string
        const description = formData.get('description') as string
        const customerId = formData.get('customer') as string

        if (!name || !description || !customerId) {
            return
        }

        await prismaClient.ticket.create({
            data: {
                name,
                description,
                customerId,
                status: 'ABERTO',
                userId: session?.user.id
            }
        })
        redirect('/dashboard')
    }

    return (
        <Container>
            <main className="mt-9 mb-2">
                <div className="flex items-center gap-3">
                    <Link href="/dashboard" className="bg-gray-900 text-white px-4 py-1 rounded">
                        Voltar
                    </Link>
                    <h1 className="text-3xl font-bold">Novo chamado</h1>
                </div>
                <form action={handleRegisterTicket} className="mt-6 flex flex-col">
                    <label className="mb-1 font-medium text-lg">Nome do chamado</label>
                    <input
                        type="text"
                        className="w-full border-2 rounded-md px-2 mb-2 h-11"
                        placeholder="Digite o nome do chamado..."
                        required
                        name="name" />

                    <label className="mb-1 font-medium text-lg">Descreva o problema</label>
                    <textarea
                        className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
                        placeholder="Descreva o problema..."
                        required
                        name="description"
                    ></textarea>
                    {customers.length !== 0 && (
                        <>
                            <label htmlFor="client-select" className="mb-1 font-medium text-lg">Selecione o cliente</label>
                            <select id="client-select" name="customer" className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white" required>
                                {customers.map(customer => (
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                ))}
                            </select>
                        </>
                    )}
                    {customers.length === 0 && (
                        <Link href="/dashboard/customer/new" className="mt-2 text-sm text-blue-500">Cadastrar cliente</Link>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!customers.length}>
                        Cadastrar
                    </button>
                </form>
            </main>
        </Container>
    );
}
