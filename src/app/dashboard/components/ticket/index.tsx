'use client'

import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { useRouter } from "next/navigation";
import { FiFile, FiCheckSquare } from "react-icons/fi";
import { useContext } from "react";
import { ModalContext } from "@/providers/modal";

interface TicketItemProps {
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export function TicketItem({ ticket, customer }: TicketItemProps) {
    const router = useRouter();
    const { handleModalVisible, setDetailTicket } = useContext(ModalContext);

    async function handleChangeStatus() {
        try {
            const response = await api.patch('/api/ticket', { id: ticket.id });
            router.refresh();
        } catch (error) {
            console.log(error)
        }
    }

    function handleOpenModal() {
        setDetailTicket({ ticket: ticket, customer: customer });
        handleModalVisible();
    }

    return (
        <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
            <td className="text-left pl-1">{customer?.name}</td>
            <td className="text-left hidden sm:table-cell">{ticket.created_at?.toLocaleDateString('pt-BR')}</td>
            <td className="text-left">
                <span className="bg-red-500 text-white p-1 rounded px-4 py-1">
                    {ticket.status}
                </span>
            </td>
            <td className="text-left">
                <button className="mr-3" onClick={handleChangeStatus}>
                    <FiCheckSquare size={24} color="green" />
                </button>
                <button onClick={handleOpenModal} >
                    <FiFile size={24} color="blue" />
                </button>
            </td>
        </tr>
    );
}
