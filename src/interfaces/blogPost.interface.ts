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

const BLOG_TAGS = ["life"] as const;

export type BlogTags = (typeof BLOG_TAGS)[number];

export type BlogLang = "en-" | "id-";

export type BlogType = "article" | "project" | "certificate" | "code-snippet";
