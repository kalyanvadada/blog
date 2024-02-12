"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = exports.BlogRequest = exports.AllBlogsResponse = void 0;
var allBlogsResponse_1 = require("./allBlogsResponse");
Object.defineProperty(exports, "AllBlogsResponse", { enumerable: true, get: function () { return __importDefault(allBlogsResponse_1).default; } });
var blogRequest_1 = require("./blogRequest");
Object.defineProperty(exports, "BlogRequest", { enumerable: true, get: function () { return __importDefault(blogRequest_1).default; } });
var blog_1 = require("./blog");
Object.defineProperty(exports, "Blog", { enumerable: true, get: function () { return __importDefault(blog_1).default; } });
