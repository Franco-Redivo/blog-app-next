import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "../../services/users";

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
    const { username } = await params;
    console.log("Username:", username); // Debugging line to check the username
    const user = await getUserWithBlogs(username);

    if(!user){
        notFound()
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <p>Username: {user.username}</p>
            <p>Name: {user.name}</p>
            <h3>Blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>
                        <Link href={`/blogs/${blog.id}`}>
                            {blog.title}
                        </Link>
                        <p>url: {blog.url}</p>
                        <p>likes: {blog.likes}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserPage