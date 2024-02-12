"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var blogController = require('../controllers/blogController');
router.get('/', blogController.getAllBlogs);
router.post('/', blogController.createBlog);
router.get('/:id', blogController.getBlogById);
exports.default = router;
