import { db } from "../../db";
import { users, blogs } from "../../db/schema";
import { eq } from "drizzle-orm"

export const getUsers = async () => {
    return db.query.users.findMany();
}

export const getUserWithBlogs = async (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username),
        with: {blogs: true}
    })
}

export const getUserByUsername = async (username: string) => {
    return db.query.users.findFirst({
        where: eq(users.username, username)
    })
}

export const getUserBlogs = async (username: string) => {
    const rows = await db.select().from(users).leftJoin(blogs, eq(users.id, blogs.userId)).where(eq(users.username, username));
    if (rows.length === 0) {
        return null;
    }
    const user = rows[0].users;

    return {
        ...user,
        blogs: rows.filter(r => r.blogs !== null).map(r => r.blogs),
    };
}

export const getUserWithToken = async (token: string) => {
    return db.query.users.findFirst({
        where: eq(users.token, token)
    });
}