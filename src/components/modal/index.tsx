'use client'

import { ModalContext } from "@/providers/modal";
import { useContext, useRef, MouseEvent } from "react";

export function ModalTicket() {
    const { visible, handleModalVisible, ticket } = useContext(ModalContext);
    const modalRef = useRef<HTMLDivElement | null>(null);

    if (!visible) return null;

    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            handleModalVisible();
        }
    };

    return (
        <section onClick={handleModalClick} className="absolute bg-gray-900/80 w-full min-h-screen">
            <div className="absolute inset-0 flex items-center justify-center">
                <div ref={modalRef} className="bg-white p-3 rounded shadow-lg w-4/5 md:w-1/2 max-w-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-lg font-bold md:text-2xl text-gray-800">Detalhes do chamado</h1>
                        <button className="text-sm text-gray-500" onClick={handleModalVisible}>Fechar</button>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2 items-center">
                        <h2 className="text-md font-semibold">Nome:</h2>
                        <p className="text-sm text-gray-600">{ticket?.ticket.name}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2 flex-col">
                        <h2 className="text-md font-semibold">Descrição:</h2>
                        <p className="text-sm text-gray-600">{ticket?.ticket.description}</p>
                    </div>
                    <div className="w-full border-b-[1.5px] border-gray-300 my-4"></div>
                    <h1 className="text-lg font-bold md:text-2xl text-gray-800 mb-4">Detalhes do cliente</h1>
                    <div className="flex flex-wrap gap-1 mb-2 items-center">
                        <h2 className="text-md font-semibold">Nome:</h2>
                        <p className="text-sm text-gray-600">{ticket?.customer?.name}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2 items-center">
                        <h2 className="text-md font-semibold">Telefone:</h2>
                        <p className="text-sm text-gray-600">{ticket?.customer?.phone}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2 items-center">
                        <h2 className="text-md font-semibold">Email:</h2>
                        <p className="text-sm text-gray-600">{ticket?.customer?.email}</p>
                    </div>
                    { ticket?.customer?.address && (
                        <div className="flex flex-wrap gap-1 mb-2 items-center">
                            <h2 className="text-md font-semibold">Endereço:</h2>
                            <p className="text-sm text-gray-600">{ticket?.customer?.address}</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
