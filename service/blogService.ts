import MySQLRepository from '../repository/impl/mysqlrepository';
import Blog from '../models/blog';
import BlogDAO from '../repository/models/blog'
import BlogRequest from "../models/blogRequest";

class BlogService {
    private mysqlRepository: MySQLRepository;

    constructor() {
        this.mysqlRepository = new MySQLRepository();
    }

    async getAllBlogs(pageNumber: number, pageSize: number): Promise<Blog[]> {
        try {
            // Calculate the offset based on the page number and page size
            const offset = (pageNumber - 1) * pageSize;
            // Fetch blogs with pagination from the repository
            const DAOblogs = await this.mysqlRepository.getAllBlogs(offset, pageSize);
            var blogs: Blog[] = [];
            for (let i = 0; i < DAOblogs.length; i++) {
                blogs.push(BlogService.ToBlogFromBlogDAO(DAOblogs[i]));
            }
            return blogs;
        } catch (error) {
            throw new Error(`Error retrieving blogs: ${error.message}`);
        }
    }


    async getBlogById(id: string): Promise<Blog | null> {
        try {
            const blog = await this.mysqlRepository.getBlogById(id);
            console.log(blog);
            return BlogService.ToBlogFromBlogDAO(blog)
        } catch (error) {
            throw error;
        }
    }

    async createBlog(blogRequest: BlogRequest): Promise<Blog> {
        try {
            const newBlog = await this.mysqlRepository.createBlog(blogRequest.title, blogRequest.content);
            return BlogService.ToBlogFromBlogDAO(newBlog)
        } catch (error) {
            throw error;
        }
    }

    static ToBlogFromBlogDAO(blog: BlogDAO): Blog {
        return new Blog(blog.id, blog.title, blog.content, blog.createdAt)
    }
}


export default BlogService;
