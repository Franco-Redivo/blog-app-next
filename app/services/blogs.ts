import { eq, desc, like, sql} from "drizzle-orm";
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
    const user = await db.query.users.findFirst({
        orderBy: sql`RANDOM()`,
    });
    
    if (!user) {
        throw new Error("No users found in the database");
    }

    await db.insert(blogs).values({
        title,
        author,
        url,
        likes,
        userId: user.id
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