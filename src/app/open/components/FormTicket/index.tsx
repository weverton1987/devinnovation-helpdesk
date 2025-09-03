'use client'

import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { CustomerDataInfo } from "@/app/open/page";
import toast from "react-hot-toast";


const schema = z.object({
    nome: z.string().min(1, "O nome do chamado é obrigatório."),
    descricao: z.string().min(1, "Descreva o problema..."),
});
type FormData = z.infer<typeof schema>;

interface FormTicketProps {
    customer: CustomerDataInfo;
}

export function FormTicket({ customer }: FormTicketProps) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    async function handleRegisterTicket(data: FormData) {
        const response = await api.post('/api/ticket', {
            name: data.nome,
            description: data.descricao,
            customerId: customer.id
        });
        toast.success("Chamado criado com sucesso!");
        setValue("nome", "");
        setValue("descricao", "");
    }

    return (
        <form className="p-4 rounded-lg shadow-md space-y-4" onSubmit={handleSubmit(handleRegisterTicket)}>
            <label className="block text-sm font-medium text-gray-700">Nome do chamado</label>
            <Input
                register={register}
                type="text"
                placeholder="Digite o nome do chamado..."
                name="nome"
                error={errors.nome?.message}
            />
            <label className="block text-sm font-medium text-gray-700">Descrição do chamado</label>
            <textarea
                className='mt-1 border-2 px-2 h-24 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                placeholder="Descreva o problema..."
                id="descricao"
                {...register("descricao")}
            />
            {errors.descricao?.message && <p className="text-red-500 text-sm mb-4">{errors.descricao.message}</p>}
            <button type="submit" className="bg-blue-500 w-full flex flex-row gap-3 h-11 items-center justify-center font-bold text-white py-2 px-4 rounded-lg">
                Abrir chamado
            </button>
        </form>
    );
};

