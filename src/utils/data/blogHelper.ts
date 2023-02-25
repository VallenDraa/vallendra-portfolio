/* eslint-disable import/prefer-default-export */

export type BlogLang = "en-" | "id-";

export const parsePostSlug = (slug: string) => ({
  slugPrefix: slug.slice(0, 3) as BlogLang,
  parsedSlug: slug.slice(3, slug.length),
});
