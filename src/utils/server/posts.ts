import type { FrontMatter } from "interfaces/blogPost.interface";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

const postDirectory = path.join(process.cwd(), "/src/posts");

export async function getPostData(slug: string) {
  const fullPath = path.join(postDirectory, `${slug}.mdx`);
  const mdxSource = fs.readFileSync(fullPath, "utf-8");

  const { code, frontmatter } = await bundleMDX({
    source: mdxSource,
    esbuildOptions: options => ({ ...options, minify: true }),
    mdxOptions: options => ({
      ...options,
      remarkPlugins: [...(options.remarkPlugins ?? []), remarkGfm],
      rehypePlugins: [...(options.rehypePlugins ?? []), rehypePrism],
    }),
  });

  return { slug, code, frontmatter };
}

export async function getBlogPostData() {
  const filenames = fs.readdirSync(postDirectory);
  const allPostData = filenames.map(filename => {
    const slug = filename.replace(/\.mdx$/, "");

    const fullPath = path.join(postDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);

    return { slug, ...(matterResult.data as FrontMatter) };
  });

  // order the parsed post data by the newest post
  const result = allPostData.sort((a, b) => (a.date < b.date ? 1 : -1));

  return result;
}

export async function getAllPostSlugs() {
  const filenames = fs.readdirSync(postDirectory);

  return filenames.map(filename => ({
    params: { slug: filename.replace(/\.mdx$/, "") },
  }));
}
