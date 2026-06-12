import { getBlogs, filterBlogsByTitle } from "../services/blogs";
import { filterBlogs } from "../actions/blogs";
import Link from "next/link";

const Blogs = async ({ searchParams, }: {searchParams: Promise<{ filter?: string }>}) => {
    const { filter } = await searchParams;
    const blogs = filter ? await filterBlogsByTitle(filter) : await getBlogs();

    return (
        <div>
            <h2>Blogs</h2>
            <div>
                <form action={filterBlogs}>
                    <input type="text" name="filter" placeholder="Filter by title" defaultValue={filter} />
                    <button type="submit">Apply</button>
                </form>
            </div>
            <div>
                <ul>
                    {blogs.map(blog => (
                        <li key={blog.id}>
                            <Link href={`/blogs/${blog.id}`}>
                                <h3>{blog.title}</h3>
                            </Link>
                            <div>
                                <p>Author: {blog.author}</p>
                                <p>URL: {blog.url}</p>
                                <p>Likes: {blog.likes}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Blogs;
    