// import redis, {RedisClient}  from 'redis';
// import Blog from '../models/blog';
// import BlogRepository from '../blogrepository';
// import 'es6-promise/auto';
//
// class RedisRepository implements BlogRepository {
//     private client: RedisClient;
//
//     constructor() {
//         this.client = redis.createClient();
//     }
//
//     async getAllBlogs(): Promise<Blog[]> {
//         return new Promise<Blog[]>((resolve, reject) => {
//             this.client.get('blog_entries', (err, data) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     const blogs: Blog[] = JSON.parse(data).map((blogData: any) => new Blog(blogData.id, blogData.title, blogData.content, new Date(blogData.createdAt)));
//                     resolve(blogs);
//                 }
//             });
//         });
//     }
//
//     async getBlogById(id: string): Promise<Blog> {
//         return new Promise<Blog>((resolve, reject) => {
//             this.client.hget('blog_entries', id, (err, data) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     const blogData: any = JSON.parse(data);
//                     const blog: Blog = new Blog(blogData.id, blogData.title, blogData.content, new Date(blogData.createdAt));
//                     resolve(blog);
//                 }
//             });
//         });
//     }
//
//     async createBlog(title: string, content: string): Promise<Blog> {
//         return new Promise<Blog>((resolve, reject) => {
//             // Generate unique id for the new blog
//             const id: number = Math.floor(Math.random() * 1000000);
//             const createdAt: Date = new Date();
//             const blog: Blog = new Blog(id, title, content, createdAt);
//
//             // Store blog in Redis
//             this.client.hset('blog_entries', id.toString(), JSON.stringify(blog), (err) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(blog);
//                 }
//             });
//         });
//     }
// }
//
// export default RedisRepository;
