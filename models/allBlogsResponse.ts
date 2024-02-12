import Blog from './blog';

class AllBlogsResponse {
    blogs: Blog[];

    constructor(blogs: Blog[]) {
        this.blogs = blogs;
    }
}

export default AllBlogsResponse;
