import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

//Rota: http://localhost:3000/api/customer

//rota pra deletar um cliente
export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    if (!userId) {
        return NextResponse.json({ error: 'Missing customer id' }, { status: 400 });
    }

    const findTickets = await prismaClient.ticket.findFirst({
        where: {
            customerId: userId as string
        }
    });
    if (findTickets) {
        return NextResponse.json({ error: "Cliente não pode ser deletado, pois possui ingressos associados." }, { status: 400 });
    }

    try {
        await prismaClient.customer.delete({
            where: {
                id: userId as string
            }
        });
        return NextResponse.json({ message: "Cliente deletado com sucesso" })
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 400 });
    }
}

//rota pra cadastrar um cliente
export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { name, email, phone, address, userId } = await request.json();

    try {
        await prismaClient.customer.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : "",
                userId: userId
            }
        });
        return NextResponse.json({ message: "cliente cadastrado com sucesso" })
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 400 });
    }
}

// rota para buscar clientes
export async function GET(request: Request) {
    // const session = await getServerSession(authOptions)
    // if (!session || !session.user) {
    //     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }
    const { searchParams } = new URL(request.url);
    const customerEmail = searchParams.get('email');
    if (!customerEmail || customerEmail === "") {
        return NextResponse.json({ error: 'Missing customer email' }, { status: 400 });
    }

    try {
        const customer = await prismaClient.customer.findFirst({
            where: {
                email: customerEmail
            }
        });
        // if (!customer) {
        //     return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        // }
        return NextResponse.json(customer);
    } catch (err) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 400 });
    }
}