import { db } from "../../db";
import { users, blogs } from "../../db/schema";
import { eq } from "drizzle-orm"
import  bcrypt from "bcryptjs";

export const getUsers = async () => {
    return db.query.users.findMany();
}

export const addUser = async (username: string, name: string, password: string) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return db.insert(users).values({
        username,
        name,
        passwordHash
    }).returning();
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

export const dropAllUsers = async () => {
    await db.delete(blogs).execute();
    await db.delete(users).execute();
}