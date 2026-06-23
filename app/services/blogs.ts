import { eq, desc, like, sql} from "drizzle-orm";
import { db } from "../../db";
import { blogs, readingList } from "../../db/schema";
import { getCurrentUser } from "./session";

export const getBlogs = async (filter?: string) => {
    if (filter) {
        return filterBlogsByTitle(filter);
    }
    return db.query.blogs.findMany({
            orderBy: (blogs, { desc }) => [desc(blogs.likes)]        
    });
}

export const addBlogs = async (title: string, author: string, url: string, likes: number) => {
    const user = await getCurrentUser();
    
    if (!user) {
        throw new Error("Not logged in");
    }

    await db.insert(blogs).values({
        title,
        author,
        url,
        likes,
        userId: user.id
    });
}

export const getBlogIdByInfo = async (title: string, author: string, url: string) => {
    const blog = await db.query.blogs.findFirst({
        where: (b) => sql`${b.title} = ${title} AND ${b.author} = ${author} AND ${b.url} = ${url}`
    });

    return blog?.id;
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

export const addToReadingList = async (blogId: number) => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("Not logged in");
    }

    await db.insert(readingList).values({
        userId: user.id,
        blogId
    });
}

export const toggleReadStatus = async (blogId: number) => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("Not logged in");
    }

    const entry = await db.query.readingList.findFirst({
        where: sql`${readingList.userId} = ${user.id} AND ${readingList.blogId} = ${blogId}`
    });

    if (entry) {
        await db.update(readingList).set({ read: !entry.read }).where(sql`${readingList.userId} = ${user.id} AND ${readingList.blogId} = ${blogId}`);
    }
}

export const getReadingList = async () => {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Not logged in");
    }
    
    const entries = await db.query.readingList.findMany({
        where: eq(readingList.userId, user.id),
        with: {
            blog: true,
        }
    });

    return entries.map(entry => ({
        ...entry.blog,
        read: entry.read,
        entryId: entry.id,
    }));
}

export const getReadingListEntry = async (blogId: number) => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error("Not logged in");
    }

    return db.query.readingList.findFirst({
        where: sql`${readingList.userId} = ${user.id} AND ${readingList.blogId} = ${blogId}`
    });
}

export const dropAllBlogs = async () => {
    await db.delete(readingList).execute();
    await db.delete(blogs).execute();
}