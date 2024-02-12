"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Blog = /** @class */ (function () {
    function Blog(id, title, content, createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
    return Blog;
}());
exports.default = Blog;
