"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";



const schema = z.object({
    name: z.string().min(1, "Nome completo é obrigatório"),
    email: z.email("Email inválido").min(1, "Email é obrigatório"),
    phone: z.string().refine((value) => {
        return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value);
    }, {
        message: "O número de telefone deve ser (DD) 9XXXX-XXXX",
    }),
    address: z.string(),
});
type FormData = z.infer<typeof schema>;


export function NewCustomerForm({ userId }: { userId: string }) {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter();

    async function handleRegisterCustomer(data: FormData) {
        await api.post("/api/customer", {
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            userId: userId
        });
        router.refresh();
        router.replace('/dashboard/customer')
    }

    return (
        <form className="flex flex-col gap-1" onSubmit={handleSubmit(handleRegisterCustomer)}>
            <label>Nome completo:</label>
            <Input type="text" placeholder="Digite o nome completo" name="name" register={register} error={errors.name?.message}
            />
            <section className="flex gap-2 my-2 flex-col sm:flex-row">
                <div className="flex-1">
                    <label>Email:</label>
                    <Input type="email" placeholder="Digite seu email" name="email" register={register} error={errors.email?.message} />
                </div>
                <div className="flex-1">
                    <label>Telefone:</label>
                    <Input type="number" placeholder="Exemplo (DD) 123456789" name="phone" register={register} error={errors.phone?.message} />
                </div>
            </section>
            <label>Endereço completo:</label>
            <Input type="text" placeholder="Digite o endereço do cliente..." name="address" register={register} error={errors.address?.message}
            />
            <button type="submit" className="bg-blue-500 text-white h-10 rounded-md mt-4 hover:bg-blue-600 transition-colors font-bold">
                Cadastrar
            </button>
        </form>

    );
}
