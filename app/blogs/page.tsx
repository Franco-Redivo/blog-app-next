import { getBlogs } from "../services/blogs";

const Blogs = () => {
    const blogs = getBlogs();
    return (
        <div>
            <h2>Blogs</h2>
            <ul>
                {blogs.map(blog => (
                    <li key={blog.id}>
                        <div>
                            <h3>{blog.title}</h3>
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
    