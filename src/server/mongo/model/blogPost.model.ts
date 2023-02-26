import m from "mongoose";

export type BlogPostDocument = {
  slug: string;
  likers: string[];
  likes: number;
  views: number;
} & m.Document;

const BlogPostSchema = new m.Schema<BlogPostDocument>(
  {
    slug: { type: String },
    views: { type: Number },
    likes: { type: Number },
    likers: [{ type: String, default: [] }],
  },
  { timestamps: true },
);

const BlogPostModel: m.Model<BlogPostDocument> =
  m.models["blog-posts"] ||
  m.model<BlogPostDocument>("blog-posts", BlogPostSchema);

export default BlogPostModel;
