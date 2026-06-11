import { getBlogs } from "../services/blogs";
import Link from "next/link";

const Blogs = () => {
    const blogs = getBlogs();
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    return (
        <div>
            <h2>Blogs</h2>
            <ul>
                {sortedBlogs.map(blog => (
                    <li key={blog.id}>
                        <Link href={`/blogs/${blog.id}`}>
                            {blog.title}
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
    )
}

export default Blogs;
    