import { NextResponse, NextRequest } from "next/server";
import { dropAllBlogs } from "@/app/services/blogs";
import { dropAllUsers } from "@/app/services/users";

export const DELETE = async (req: NextRequest) => {
    
    if(process.env.NODE_ENV === "production") {
        return NextResponse.json(
            {error: "This endpoint is only available in development mode"},
            {status: 403}
        )
    }
    await dropAllBlogs();
    await dropAllUsers();

    return NextResponse.json({ message: "Database reset successfully" });
}