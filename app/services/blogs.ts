const blogs = [
    {
        id: 1, 
        title: "SQL vs NOSQL",
        author: "Tony Soprano",
        url: "randomurl.com",
        likes: 6
    },
    {
        id: 2,
        title: "react testing",
        author: "Bobby Bacala",
        url: "anotherurl.com",
        likes: 12
    },
    {
        id: 3,
        title: "tailwind tips",
        author: "Johnny Sacks",
        url: "Aurl.com",
        likes: 10
    }
];

let nextId = 4;

export const getBlogs = () => {
    return blogs;
}

export const addBlogs = (title: string, author: string, url: string, likes: number) => {
    blogs.push({id: nextId++, title, author, url, likes});
}

export const getBlogById = (id: number) => {
    return blogs.find((blog) => blog.id === id);
}

export const incrementBlogLikes = (id: number) => {
    const blog = blogs.find((blog) => blog.id === id);
    if(blog) {
        blog.likes += 1;
    }
}

export const filterBlogsByTitle = (filter: string) => {
    return blogs.filter(blog => blog.title.toLowerCase().includes(filter.toLowerCase()));
}