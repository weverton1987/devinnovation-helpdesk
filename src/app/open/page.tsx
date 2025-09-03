'use client'

import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { FormTicket } from "./components/FormTicket";
import { api } from "@/lib/api";


const schema  = z.object({
    email: z.email("Email inválido.").min(1, 'Email é obrigatório.')
})

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo{
    id: string;
    name: string;

}

export default function OpenTicket() {
    const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

    const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    function handleClearCustomer() {
        setCustomer(null);
        setValue("email", "");
    }

    async function handleSearchCustomer(data: FormData) {
        const response = await api.get('/api/customer', { params: { email: data.email } });
        if(response.data === null) {
            setError("email", { type: "custom", message: "Cliente não encontrado." });
            return;
        }
        setCustomer({
            id: response.data.id,
            name: response.data.name
        });
    }
    return (
        <div className="w-full max-w-2xl mx-auto px-2 mb-[16rem] mt-[17rem]">
            <h1 className="text-3xl font-bold mb-4 text-center mt-10">Abrir chamados</h1>
            <main className="flex flex-col mt-4 mb-2">
                {customer ? (
                    <div className="flex items-center justify-between bg-slate-200 p-2 mt-1.5 rounded-lg shadow-md space-y-4">
                        <p className="text-lg flex items-center gap-2 h-11"><strong>Cliente encontrado:</strong> {customer.name}</p>
                        <button onClick={handleClearCustomer} className="flex flex-row gap-3 h-11 items-center justify-center font-bold text-white py-2 px-4 rounded-lg">
                            <FiX size={20} color="red"/>
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(handleSearchCustomer)} className="p-4 rounded-lg shadow-md space-y-4">
                        <div className="flex flex-col gap-3">
                            <Input
                            placeholder="Digite o email do cliente..."
                            name="email"
                            type="email"
                            error={errors.email?.message}
                            register={register}
                            />
                            <button type="submit" className="bg-blue-500 flex flex-row gap-3 h-11 items-center justify-center font-bold text-white py-2 px-4 rounded-lg">
                                Procurar cliente
                                <FiSearch size={20} color="white"/>
                            </button>
                        </div>
                    </form>
                )}
                {customer !== null && <FormTicket customer={customer} />}
            </main>
        </div>
    );
}