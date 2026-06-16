"use server"

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "../../db";
import { users } from "../../db/schema";
import { getUserByUsername } from "../services/users";

export const registerUser = async (prevState: {error: string, values: {username: string, name: string, password: string}}, formData: FormData) => {
    const username = (formData.get("username") as string)?.trim();
    const name = (formData.get("name") as string)?.trim();
    const password = formData.get("password") as string
    const passwordConfirm = formData.get("passwordConfirm") as string;

    if (!password || password.length < 4) return {error: "password must be at least 4 characters long", values: {username, name, password}};
    if (password !== passwordConfirm) return {error: "passwords fields do not match", values: {username, name, password}};
    if (!username || username.length < 4) return {error: "username must be atleast 4 characters long", values: {username, name, password}};

    const usernameExists = await getUserByUsername(username);
    if (usernameExists) return {error: "username already exists", values: {username, name, password}}

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({ username, name, passwordHash });

    redirect("/login");
}