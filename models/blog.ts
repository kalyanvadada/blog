class Blog {
    id: number;
    title: string;
    content: string;
    createdAt: Date;

    constructor(id: number, title: string, content: string, createdAt: Date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}

export default Blog;
