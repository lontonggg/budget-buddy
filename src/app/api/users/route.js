import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {name, income, expense, balance, transactions} = await request.json();
    try{
        const createdUser = await prisma.user.create({
            data: {
                name,
                income,
                expense,
                balance,
                transactions
            }
        });
        return NextResponse.json({message: "Success", data: createdUser}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}

export async function GET(request) {
    try{
        const users = await prisma.user.findMany()
        return NextResponse.json({message: "Success", data:users}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}