import { NextResponse, NextRequest } from "next/server";
import { addUser } from "@/app/services/users";

export const POST = async (req: NextRequest) => {
    const { username, name, password } = await req.json();

    if(process.env.NODE_ENV === "production") {
        return NextResponse.json(
            {error: "This endpoint is only available in development mode"},
            {status: 403}
        )
    }

    if (!username || !name || !password) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const newUser = await addUser(username, name, password);
        return NextResponse.json(newUser);
    } catch (error) {
        console.error("Error adding user:", error);
        return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
    }
}