import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try{
        const body = await request.json();
        const userData = body.formData;
        await User.create(userData);
        return NextResponse.json({message: "Success"}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}

export async function GET(request) {
    try{
        const users = await User.find();
        return NextResponse.json({users}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}