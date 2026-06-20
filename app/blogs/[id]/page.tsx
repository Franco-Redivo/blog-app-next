import { notFound } from "next/navigation";
import { getBlogById, getReadingListEntry } from "../../services/blogs";
import { likeBlog, addBlogToReadingList } from "../../actions/blogs";
import { getCurrentUser } from "../../services/session";

const BlogPage = async ({params}: {params: Promise<{id: string}>}) => {
    const {id} = await params;
    const blog = await getBlogById(Number(id));
    const user = await getCurrentUser();
    const readingListEntry = user ? await getReadingListEntry(Number(id)) : null;

    if(!blog) {
        notFound();
    }
    if (!user) {
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
            <div>
                <form action={likeBlog} className="self-end">
                    <input type="hidden" name="id" value={blog.id} />
                    <button type="submit" className="bg-blue-500 text-white text-lg hover:bg-blue-600 px-4 py-2 rounded">
                        Like
                    </button>
                </form>
                {user.id !== blog.userId && !readingListEntry && (
                    <form action={addBlogToReadingList} className="self-end mt-2">
                        <input type="hidden" name="id" value={blog.id} />
                        <button type="submit" className="bg-green-500 text-white text-lg hover:bg-green-600 px-4 py-2 rounded">
                            Add to Reading List
                        </button>
                    </form>
                )}
                {readingListEntry && (
                    <p className="mt-2 text-sm text-gray-600">This blog is in your reading list</p>
                )}

            </div>
        </div>
    )
}

export default BlogPage;