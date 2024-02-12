"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogById = exports.createBlog = exports.getAllBlogs = void 0;
var models_1 = require("../models");
var blogService_1 = __importDefault(require("../service/blogService"));
var blogService = new blogService_1.default();
var getAllBlogs = function (req, res) {
    try {
        var _a = req.query, pageNumber = _a.pageNumber, pageSize = _a.pageSize;
        // Convert the parameters to numbers (they are initially strings)
        // If pageNumber is empty or undefined, use a default value of 1
        var pageNumberInt = pageNumber ? parseInt(pageNumber, 10) : 1;
        // If pageSize is empty or undefined, use a default value of 10
        var pageSizeInt = pageSize ? parseInt(pageSize, 10) : 10;
        blogService.getAllBlogs(pageNumberInt, pageSizeInt)
            .then(function (blogs) {
            var response = new models_1.AllBlogsResponse(blogs);
            res.status(200).json(response);
        });
    }
    catch (error) {
        console.error('Error getting blogs', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllBlogs = getAllBlogs;
var createBlog = function (req, res) {
    try {
        var _a = req.body, title = _a.title, content = _a.content;
        var newBlogRequest = new models_1.BlogRequest(title, content);
        blogService.createBlog(newBlogRequest)
            .then(function (newBlog) {
            var response = new models_1.Blog(newBlog.id, newBlog.title, newBlog.content, newBlog.createdAt);
            res.status(201).json(response);
        });
    }
    catch (error) {
        console.error('Error creating blog', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createBlog = createBlog;
var getBlogById = function (req, res) {
    try {
        var id = req.params.id;
        blogService.getBlogById(id).then(function (blog) {
            if (!blog) {
                res.status(404).json({ error: 'Blog not found' });
            }
            else {
                var response = new models_1.Blog(blog.id, blog.title, blog.content, blog.createdAt);
                res.status(200).json(response);
            }
        });
    }
    catch (error) {
        console.error('Error getting blog by ID', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getBlogById = getBlogById;
