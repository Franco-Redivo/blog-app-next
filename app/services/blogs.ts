import { eq, desc, like} from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";

export const getBlogs = async (filter?: string) => {
    if (filter) {
        return filterBlogsByTitle(filter);
    }
    return db.query.blogs.findMany({
            orderBy: (blogs, { desc }) => [desc(blogs.likes)]        
    });
}

export const addBlogs = async (title: string, author: string, url: string, likes: number) => {
    await db.insert(blogs).values({
        title,
        author,
        url,
        likes
    });
}

export const getBlogById = async(id: number) => {
    return db.query.blogs.findFirst({
        where: eq(blogs.id, id)
    })
}

export const incrementBlogLikes = async (id: number) => {
    const blog = await getBlogById(id);
    if (blog) {
        await db.update(blogs).set({ likes: blog.likes + 1 }).where(eq(blogs.id, id));
    }
}

export const filterBlogsByTitle = async (filter: string) => {
    return db.query.blogs.findMany({
        where: (blog) => like(blog.title, `%${filter}%`),
        orderBy: (blogs, { desc }) => [desc(blogs.likes)]
    });
}