"use server"
import { auth } from "@/auth"

import { redirect } from "next/navigation"
import { addBlogs, incrementBlogLikes} from "../services/blogs"
import { revalidatePath } from "next/cache"

export const createBlog = async (prevState: {error: string, success: boolean, values:{title: string, author: string, url: string, likes: number}}, formData: FormData) => {
    const session = await auth();
    if( !session) {
        redirect("/login");
    }
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const url = formData.get("url") as string;
    const likes = parseInt(formData.get("likes") as string, 10);

    if (!title || title.length < 5) return { error: "title must be at least 5 characters long",success: false, values:{title, author, url, likes} };
    if (!author || author.length < 5) return { error: "author must be at least 5 characters long",success: false, values:{title, author, url, likes}};
    if (!url || url.length < 5) return { error: "url must be at least 5 characters long",success: false, values:{title, author, url, likes} };

    await addBlogs(title, author, url, likes);
    revalidatePath("/blogs");
    //redirect("/blogs");
    return {error: "", success:true, values:{title, author, url, likes} };
}

export const likeBlog = async (formData: FormData) => {
    const id = Number(formData.get("id"));
    await incrementBlogLikes(id);
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${id}`);

}

export const filterBlogs = async (formData: FormData) => {
    const filter = formData.get("filter") as string;
    redirect(`/blogs?filter=${encodeURIComponent(filter)}`);

}