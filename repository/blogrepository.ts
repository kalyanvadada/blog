import Blog from "./models/blog";

interface BlogRepository {
    getAllBlogs(pageNumber: number, pageSize: number): Promise<Blog[]>;
    getBlogById(id: string): Promise<Blog>;
    createBlog(title: string, content: string): Promise<Blog>;
    // Add other methods for CRUD operations
}

export default BlogRepository;
