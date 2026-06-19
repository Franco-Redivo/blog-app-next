import { NextResponse, NextRequest } from "next/server";
import { getUserBlogs, getUserWithToken } from "@/app/services/users";

export const GET = async (req: NextRequest) => {

    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUserWithToken(token);

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userBlogs = await getUserBlogs(user.username);

    return NextResponse.json(userBlogs);
}