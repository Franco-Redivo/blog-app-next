import { getBlogs, filterBlogsByTitle } from "../services/blogs";
import { filterBlogs } from "../actions/blogs";
import Link from "next/link";

const Blogs = async ({ searchParams, }: {searchParams: Promise<{ filter?: string }>}) => {
    const { filter } = await searchParams;
    const blogs = filter ? await filterBlogsByTitle(filter) : await getBlogs();

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Blogs</h2>
            <div className="mb-4 flex items-center gap-4">
                <form action={filterBlogs} className="flex items-center gap-2 w-full">
                    <input type="text" name="filter" placeholder="Filter by title" defaultValue={filter} className="border rounded p-2 border-blue-600 w-full" />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Apply
                    </button>
                </form>
            </div>
            <div>
                <ul className="space-y-2">
                    {blogs.map(blog => (
                        <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
                            <Link href={`/blogs/${blog.id}`} className="text-blue-600 hover:underline text-lg font-semibold">
                                <h3>{blog.title}</h3>
                            </Link>
                            <div className="text-sm text-gray-600">
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
    