import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import prismaClient from '@/lib/prisma'

// rota pra atualizar um chamado
export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions)
    if(!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await request.json();

    // Find the ticket by ID
    const findTicket = await prismaClient.ticket.findFirst({
        where: {
            id: id as string,
        },
    });
    if(!findTicket) {
        return NextResponse.json({ error: 'Ticket not found' }, { status: 400 });
    }

    try {
        await prismaClient.ticket.update({
            where: { 
                id: id as string
            },
            data: {
                status: 'RESOLVIDO',
            }
        });
        return NextResponse.json({ message: 'Ticket status updated successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update ticket status' }, { status: 400 });
    }
}

export async function POST(request: Request) {

    const { name, description, customerId } = await request.json();

    if(!name || !description || !customerId) {
        return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
}

    try {
        await prismaClient.ticket.create({
            data: {
                name: name,
                description: description,
                status: 'ABERTO',
                customerId: customerId,
            }
        });
        return NextResponse.json({ message: 'Ticket created successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
    }
}
