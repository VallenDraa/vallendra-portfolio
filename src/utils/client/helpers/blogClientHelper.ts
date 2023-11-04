import type { Language } from "types/types";
import type { BlogLangPrefix, BlogTags } from "interfaces/blogPost.interface";
import type BlogPost from "interfaces/blogPost.interface";

/* eslint-disable import/prefer-default-export */
export function parsePostSlug(slug: string) {
  return {
    slugPrefix: slug.slice(0, 3) as BlogLangPrefix,
    parsedSlug: slug.slice(3, slug.length),
  };
}

export async function getAvailableTags(
  selectedTags: BlogTags[],
  allPostData: BlogPost[],
  activeLanguage: Language,
) {
  // only retun empty set when selectedTags are empty
  if (selectedTags.length === 0) return new Set<BlogTags>();

  const availableTags: BlogTags[] = [];
  const postsInActiveLang = allPostData.filter(p => {
    const { slugPrefix } = parsePostSlug(p.slug);

    return slugPrefix.includes(activeLanguage);
  });

  // check for posts that includes all the selected tags
  postsInActiveLang.forEach(post => {
    const hasAllSelectedTags = selectedTags.every(selectedTag =>
      post.tags.includes(selectedTag),
    );

    if (hasAllSelectedTags) {
      availableTags.push(...post.tags);
    }
  });

  // this set will automatically remove duplicate tags
  return new Set(availableTags);
}
