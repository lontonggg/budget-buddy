import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
    const {name, password, confirmPassword} = await req.json();
    try {

        if(password !== confirmPassword){
            return NextResponse.json({message: "Register Failed"})
        }

        const existingUsername = await prisma.user.findFirst({
            where:{
                name: name
            }
        })

        if(existingUsername){
            return NextResponse.json({message: "User already exist"}, {status: 409})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await prisma.user.create({
            data: {
                name,
                password: hashedPassword,
                income: 0,
                expense: 0,
                balance: 0,
            }
        });

        return NextResponse.json({message: "Register Success!", data: createUser}, {status:201});
    } catch (error) {
        return NextResponse.json({message: "Register Failed"}, {})
    }

}