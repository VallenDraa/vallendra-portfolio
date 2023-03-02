import type { BlogType, FrontMatter } from "interfaces/blogPost.interface";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
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
        rehypePrism,
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          { properties: { className: ["section-hash"] } },
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

export async function getPrevAndNextPosts(
  currentPostSlug: string,
  blogType: BlogType,
) {
  const { parsedSlug } = parsePostSlug(currentPostSlug);
  const allSlugs = (await getAllPostSlugs(blogType)).map(
    arg => arg.params.slug,
  );

  const currentPostIdx = allSlugs.findIndex(slug => slug === currentPostSlug);

  const isCurrentSlugFirst = currentPostIdx === 0;
  const isCurrentSlugLast = currentPostIdx === allSlugs.length - 1;

  // check if the next or previous is the same post different language
  return {
    prev: {
      englishOnly: true,
      slug: isCurrentSlugFirst
        ? allSlugs[allSlugs.length - 1]
        : allSlugs[currentPostIdx - 1],
    },
    next: {
      englishOnly: true,
      slug: isCurrentSlugLast ? allSlugs[0] : allSlugs[currentPostIdx + 1],
    },
  };
}
