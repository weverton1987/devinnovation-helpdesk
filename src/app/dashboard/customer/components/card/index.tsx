'use client'

import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { useRouter } from "next/navigation";


export function CustomerCard({ customer }: { customer: CustomerProps}) {
    const router = useRouter();

    async function handleDeleteCustomer() {
        try {
            const response = await api.delete('/api/customer', { params: { id: customer.id } });
            console.log(response.data);
            router.refresh();
        } catch (err) {
            console.log(err);
        }
        
    }

    return (
        <article className="flex flex-col gap-2 bg-gray-100 border-2 rounded-lg p-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
            <h2><a className="font-bold text-xl">Nome: </a> {customer.name}</h2>
            <p><a className="font-bold text-xl">Email: </a>{customer.email}</p>
            <p><a className="font-bold text-xl">Telefone: </a>{customer.phone}</p>
            <button onClick={handleDeleteCustomer} className="self-start bg-red-500 text-white px-4 rounded mt-2 hover:bg-red-600">Deletar</button>
        </article>
    );
}
