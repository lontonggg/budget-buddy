
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        const {title, type, amount, description, user_id} = await request.json();
        const createdTransaction = await prisma.transaction.create({
            data: {
                title,
                type,
                amount,
                description,
                user_id,
            }
        })
        return NextResponse.json({message: "Success", data: createdTransaction}, {status: 201})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}

export async function GET(request){
    const searchParams = request.nextUrl.searchParams;
    const userid = searchParams.get("id")

    if(userid){
        const getTranscationsByUser = await prisma.transaction.findMany({
            where: {
                user_id: userid
            }
        })
        return NextResponse.json({message: "Succes get transactions of user", data: getTranscationsByUser}, {status: 200})
    }

    const getTranscationsByUser = await prisma.transaction.findMany()
    return NextResponse.json({message: "Succes get transactions", data: getTranscationsByUser}, {status: 200})
}
