
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    const userid = params.id
    const userData = await prisma.user.findFirst({
        where:{
            id: userid
        }
    })
    
    return NextResponse.json({message: "Get user success", data: userData}, {status: 200})
}

export async function PATCH(request, {params}){
    try {
        const userid = params.id
        const {income, expense, balance} = await request.json();
       
        const updatedUser = await prisma.user.update({
            where: {
                id:userid
            },
            data: {
                income,
                expense,
                balance
            }
        })
        return NextResponse.json({message: "User Updated", updatedUser}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
}