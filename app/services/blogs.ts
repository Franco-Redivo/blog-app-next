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