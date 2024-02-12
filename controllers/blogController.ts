import {Request, Response} from 'express';
import {AllBlogsResponse, BlogRequest, Blog} from '../models';
import BlogService from '../service/blogService';

const blogService: BlogService = new BlogService();

export const getAllBlogs = (req: Request, res: Response): void => {
    try {
        const {pageNumber, pageSize} = req.query;

        // Convert the parameters to numbers (they are initially strings)
        // If pageNumber is empty or undefined, use a default value of 1
        const pageNumberInt = pageNumber ? parseInt(pageNumber as string, 10) : 1;

        // If pageSize is empty or undefined, use a default value of 10
        const pageSizeInt = pageSize ? parseInt(pageSize as string, 10) : 10;

        blogService.getAllBlogs(pageNumberInt, pageSizeInt)
            .then((blogs) => {
                const response = new AllBlogsResponse(blogs);
                res.status(200).json(response);
            });


    } catch (error) {
        console.error('Error getting blogs', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

export const createBlog = (req: Request, res: Response) => {
    try {
        const {title, content} = req.body;
        const newBlogRequest = new BlogRequest(title, content);
        blogService.createBlog(newBlogRequest)
            .then(newBlog => {
                const response = new Blog(newBlog.id, newBlog.title, newBlog.content, newBlog.createdAt);
                res.status(201).json(response);
            });

    } catch (error) {
        console.error('Error creating blog', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

export const getBlogById = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        blogService.getBlogById(id).then(
            blog => {
                if (!blog) {
                    res.status(404).json({error: 'Blog not found'});
                } else {
                    const response = new Blog(blog.id, blog.title, blog.content, blog.createdAt);
                    res.status(200).json(response);
                }
            }
        );

    } catch (error) {
        console.error('Error getting blog by ID', error);
        res.status(500).json({error: 'Internal server error'});
    }
};
