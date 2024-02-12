import mysql from 'mysql';
import Blog from '../models/blog';
import BlogRepository from '../blogrepository';
import 'es6-promise/auto';


class MySQLRepository implements BlogRepository {
    private connection: mysql.Connection;

    constructor() {
        const config: mysql.ConnectionConfig = {
            host: 'localhost',
            user: 'root',
            password: 'new_password',
            database: 'ziffichess',
            port: 3306 // MySQL default port
        };
        this.connection = mysql.createConnection(config);
    }

    async getAllBlogs(pageNumber: number, pageSize: number): Promise<Blog[]> {
        const offset = (pageNumber - 1) * pageSize;
        const query = `SELECT id, title,LEFT(content, 100) AS content, createdAt FROM blogs LIMIT ${pageSize} OFFSET ${pageNumber} `;
        const queryParams = [pageSize, offset];

        return new Promise((resolve, reject) => {
            this.connection.query(query, queryParams, (error, results) => {
                if (error) {
                    reject(new Error('Error executing query: ' + error.message));
                } else {
                    const blogs: Blog[] = results.map((row: any) => new Blog(row.id, row.title, row.content, row.createdAt));
                    resolve(blogs);
                }
            });
        });
    }

    async getBlogById(id: string): Promise<Blog> {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM blogs WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(new Error('Error executing query: ' + error.message));
                } else {
                    if (results.length === 0) {
                        resolve(null);
                    } else if (results.length > 1) {
                        reject(new Error('Multiple blogs cannot exist with the same id'));
                    } else {
                        const blogRow = results[0];
                        const blog: Blog = new Blog(blogRow.id, blogRow.title, blogRow.content, blogRow.createdAt);
                        resolve(blog);
                    }
                }
            });
        });
    }

    async createBlog(title: string, content: string): Promise<Blog> {
        return new Promise((resolve, reject) => {
            this.connection.query('INSERT INTO blogs (title, content) VALUES (?, ?)', [title, content], (error, results) => {
                if (error) {
                    reject(new Error('Error executing query: ' + error.message));
                } else {
                    const newBlogId = results.insertId;
                    const newBlog = new Blog(newBlogId, title, content, results.createdAt);
                    resolve(newBlog);
                }
            });
        });
    }

    async close(): Promise<void> {
        this.connection.end();
    }
}

export default MySQLRepository;
