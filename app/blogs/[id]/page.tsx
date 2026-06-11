import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";

const BlogPage = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    const blog = getBlogById(Number(id));

    if(!blog) {
        notFound();
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>Author: {blog.author}</p>
            <p>URL: {blog.url}</p>
            <p>Likes: {blog.likes}</p>
        </div>
    )
}

export default BlogPage;