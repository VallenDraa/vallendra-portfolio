import type { BlogType, FrontMatter } from "interfaces/blogPost.interface";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { parsePostSlug } from "utils/client/helpers/blogClientHelper";

function blogDirWithType(blogType: BlogType, ...args: string[]) {
  const dir = path.join(process.cwd(), "/src/posts/", blogType, ...args);

  return dir;
}

export async function getPostData(slug: string, blogType: BlogType) {
  const fullPath = blogDirWithType(blogType, `${slug}.mdx`);
  const mdxSource = fs.readFileSync(fullPath, "utf-8");

  const { code, frontmatter } = await bundleMDX({
    cwd: process.cwd(),
    source: mdxSource,
    esbuildOptions: options => ({ ...options, minify: true }),
    mdxOptions: options => ({
      ...options,
      remarkPlugins: [...(options.remarkPlugins ?? []), remarkGfm],
      rehypePlugins: [
        ...(options.rehypePlugins ?? []),
        rehypeCodeTitles,
        rehypePrism,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          { properties: { className: ["blog-section-hash"] } },
        ],
      ],
    }),
  });

  return { slug, code, frontmatter };
}

export async function getBlogPostData(blogType: BlogType) {
  const filenames = fs.readdirSync(blogDirWithType(blogType));

  const allPostData = filenames.map(filename => {
    const slug = filename.replace(/\.mdx$/, "");

    const fullPath = blogDirWithType(blogType, filename);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    return { slug, ...(matterResult.data as FrontMatter) };
  });

  // order the parsed post data by the newest post
  const result = allPostData.sort((a, b) => (a.date < b.date ? 1 : -1));

  return result;
}

export async function getAllPostSlugs(blogType: BlogType) {
  const filenames = fs.readdirSync(blogDirWithType(blogType));

  return filenames.map(filename => ({
    params: { slug: filename.replace(/\.mdx$/, "") },
  }));
}

export async function getAllSlugsGroupedByLang(blogType: BlogType) {
  const filenames = fs
    .readdirSync(blogDirWithType(blogType))
    .map(name => name.replace(/\.mdx$/, ""));

  const groupedSlugs = filenames.reduce<{ en: string[]; id: string[] }>(
    (prev, slug) => {
      const { slugPrefix } = parsePostSlug(slug);

      if (slugPrefix === "en-") {
        return { ...prev, en: [...prev.en, slug] };
      }

      return { ...prev, id: [...prev.id, slug] };
    },
    { en: [], id: [] },
  );

  return groupedSlugs;
}

export async function getPrevAndNextPosts(
  currentPostSlug: string,
  blogType: BlogType,
) {
  const allSlugs = await getAllSlugsGroupedByLang(blogType);
  const { slugPrefix } = parsePostSlug(currentPostSlug);
  const lang = slugPrefix === "en-" ? "en" : "id";
  const postsLastIdx = allSlugs[lang].length - 1;

  const currentSlugIdx = allSlugs[lang].findIndex(
    slug => slug === currentPostSlug,
  );
  const isCurrentSlugFirst = currentSlugIdx === 0;
  const isCurrentSlugLast = currentSlugIdx === postsLastIdx;

  // return the current post if there is only 1 post
  if (allSlugs[lang].length === 1) {
    return {
      prevPost: allSlugs[lang][0],
      nextPost: allSlugs[lang][0],
    };
  }

  // return the other only exisitng post if there is only 2 post
  if (allSlugs[lang].length === 2) {
    return {
      prevPost:
        allSlugs[lang][isCurrentSlugFirst ? postsLastIdx : currentSlugIdx - 1],
      nextPost: allSlugs[lang][isCurrentSlugLast ? 0 : currentSlugIdx + 1],
    };
  }

  // return the slugs adjacent to the current slug if there are > 2 post
  return {
    prevPost:
      allSlugs[lang][isCurrentSlugFirst ? postsLastIdx : currentSlugIdx - 1],
    nextPost: allSlugs[lang][isCurrentSlugLast ? 0 : currentSlugIdx + 1],
  };
}
