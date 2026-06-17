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
        <div>
            <h2>Create a new blog</h2>
            <form action={formAction}>
                <div>
                    <label>
                        Title
                        <input type="text" name="title" required minLength={5} defaultValue={state.values?.title}/>
                    </label>
                </div>
                <div>
                    <label>
                        Author
                        <input type="text" name="author" required minLength={5} defaultValue={state.values?.author}/>
                    </label>
                </div>
                <div>
                    <label>
                        URL
                        <input type="text" name="url" required minLength={5} defaultValue={state.values?.url}/>
                    </label>
                </div>
                <div>
                    <label>
                        Likes
                        <input type="number" name="likes" required defaultValue={state.values?.likes}/>
                    </label>
                </div>
                <button type="submit">Create</button>
                {state.error && <p style={{color: "red"}}>{state.error}</p>}
            </form>
        </div>
    )
}

export default NewBlog;