import m, { ObjectId } from "mongoose";

export type BlogPostDocument = {
  _id: ObjectId;
  slug: string;
  likers: string[];
  likes: number;
  views: number;
} & m.Document;

const BlogPostSchema = new m.Schema<BlogPostDocument>(
  {
    _id: m.Schema.Types.ObjectId,
    slug: { type: String, unique: true },
    views: Number,
    likes: Number,
    likers: [{ type: String, default: [] }],
  },
  { timestamps: true },
);

const BlogPostModel: m.Model<BlogPostDocument> =
  m.models["blog-posts"] ||
  m.model<BlogPostDocument>("blog-posts", BlogPostSchema);

export default BlogPostModel;
