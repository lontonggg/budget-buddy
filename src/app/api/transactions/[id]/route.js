import { prisma } from "@/utils/prisma"
import { NextResponse } from "next/server"

export async function DELETE(request, {params}){
    const transactionId = params.id
    await prisma.transaction.delete({
        where: {
            id: transactionId
        }
    })
    return NextResponse.json({message: "Transaction deleted successfully"})
}

export async function GET(request, {params}) {
    const id = params.id
    const transactionData = await prisma.transaction.findFirst({
        where:{
            id
        }
    })
    
    return NextResponse.json({message: "Get user success", data: transactionData}, {status: 200})
}