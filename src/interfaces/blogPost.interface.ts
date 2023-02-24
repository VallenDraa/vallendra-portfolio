import { Language } from "types/types";

export type FrontMatter = {
  title: string;
  date: string;
  description: string;
  language: Language;
  tags: BlogTags;
  banner: string;
  bannerSrc: string;
};

export type PostData = {
  title: string;
  date: string;
  description: string;
  slug: string;
} & FrontMatter;

const BLOG_TAGS = ["life"] as const;

export type BlogTags = (typeof BLOG_TAGS)[number];
