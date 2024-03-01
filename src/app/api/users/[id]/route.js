import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req, {params}){
    try {
        const {id} = params;
        const body = await req.json()
        const userData = body.userData

        const updatedUserData = await User.findByIdAndUpdate(id, {
            ...userData
        })
        return NextResponse.json({message: "User Updated"}, {status: 200});
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500});
    }
}