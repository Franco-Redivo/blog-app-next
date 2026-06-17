import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { likeBlog } from "../../actions/blogs";

const BlogPage = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    const blog = await getBlogById(Number(id));

    if(!blog) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto p-6 flex flex-col gap-4 border-2 border-gray-300 shadow-md rounded mt-6">
            <h2 className="text-3xl font-bold text-blue-500 mx-auto">{blog.title}</h2>
            <div className="text-gray-700 flex flex-col gap-2 text-lg">
                <p className="font-semibold">Author: {blog.author}</p>
                <p>URL: {blog.url}</p>
                <p>Likes: {blog.likes}</p>
            </div>
            <form action={likeBlog} className="self-end">
                <input type="hidden" name="id" value={blog.id} />
                <button type="submit" className="bg-blue-500 text-white text-lg hover:bg-blue-600 px-4 py-2 rounded">
                    Like
                </button>
            </form>
        </div>
    )
}

export default BlogPage;