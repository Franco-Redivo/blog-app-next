"use client"

import { createBlog } from "../../actions/blogs";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "@/app/components/NotificationContext";

const NewBlog = () => {
    const [state, formAction] = useActionState(createBlog, {error: "",success: false, values: {title: "", author: "", url: "", likes: 0}});
    const { showNotification } = useNotification();
    const router = useRouter();

    useEffect(() => {
        if(state.success) {
            showNotification("blog created");
            router.push("/blogs")
        }
    }, [state, showNotification, router]);

    return (
        <div className="max-w-2xl mx-auto p-6 border-2 border-gray-300 shadow-md rounded mt-6">
            <h2 className="text-2xl font-bold text-blue-500 mx-auto">Create a new blog</h2>
            <form action={formAction} className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col gap-1">
                    <label className="font-semibold">
                        Title
                        <input type="text" name="title" className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2 w-full" required minLength={5} defaultValue={state.values?.title}/>
                    </label>
                </div>
                <div>
                    <label className="font-semibold">
                        Author
                        <input type="text" name="author" className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2 w-full" required minLength={5} defaultValue={state.values?.author}/>
                    </label>
                </div>
                <div>
                    <label className="font-semibold">
                        URL
                        <input type="text" name="url" className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2 w-full" required minLength={5} defaultValue={state.values?.url}/>
                    </label>
                </div>
                <div>
                    <label className="font-semibold">
                        Likes
                        <input type="number" name="likes" className="border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2 w-full" required defaultValue={state.values?.likes}/>
                    </label>
                </div>
                <button type="submit" className="bg-blue-500 text-white text-lg hover:bg-blue-600 px-4 py-2 rounded">
                    Create
                </button>
                {state.error && <p style={{color: "red"}}>{state.error}</p>}
            </form>
        </div>
    )
}

export default NewBlog;