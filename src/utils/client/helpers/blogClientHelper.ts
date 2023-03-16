import type { BlogLangPrefix } from "interfaces/blogPost.interface";

/* eslint-disable import/prefer-default-export */
export function parsePostSlug(slug: string) {
  return {
    slugPrefix: slug.slice(0, 3) as BlogLangPrefix,
    parsedSlug: slug.slice(3, slug.length),
  };
}
