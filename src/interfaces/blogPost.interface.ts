export type FrontMatter = {
  title: string;
  date: string;
  description: string;
  englishOnly: boolean;
  tags: BlogTags[];
  banner: string;
  bannerSrc: string;
};

export default interface BlogPost extends FrontMatter {
  slug: string;
}

export const BLOG_TAGS = [
  "life",
  "javascript",
  "typescript",
  "react",
  "css",
  "tailwindcss",
] as const;

export type BlogTags = (typeof BLOG_TAGS)[number];

export type BlogLangPrefix = "en-" | "id-";

export type BlogType = "article" | "project" | "certificate" | "code-snippet";
