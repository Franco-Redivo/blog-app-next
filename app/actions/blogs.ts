"use server"

import { redirect } from "next/navigation"
import { addBlogs, incrementBlogLikes } from "../services/blogs"
import { revalidatePath } from "next/cache"

export const createBlog = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const url = formData.get("url") as string;
    const likes = parseInt(formData.get("likes") as string, 10);

    addBlogs(title, author, url, likes);
    revalidatePath("/blogs");
    redirect("/blogs");
}

export const likeBlog = async (formData: FormData) => {
    const id = Number(formData.get("id"));
    incrementBlogLikes(id);
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);

}