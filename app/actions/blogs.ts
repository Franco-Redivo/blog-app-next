"use server"

import { redirect } from "next/navigation"
import { addBlogs } from "../services/blogs"

export const createBlog = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const url = formData.get("url") as string;
    const likes = parseInt(formData.get("likes") as string, 10);

    addBlogs(title, author, url, likes);
    redirect("/blogs");
}