import type { GetStaticPaths, GetStaticProps } from "next/types";
import type { FrontMatter } from "interfaces/blogPost.interface";

import R from "react";
import { getAllPostSlugs, getPostData } from "utils/server/posts";
import { getMDXComponent } from "mdx-bundler/client";

type BlogPostProps = {
  code: string;
  frontmatter: FrontMatter;
};

export default function BlogPost({ code, frontmatter }: BlogPostProps) {
  const Component = R.useMemo(() => getMDXComponent(code), []);

  return (
    <>
      <header className="flex flex-col gap-2">
        <span>{frontmatter.title}</span>
        <span>{frontmatter.date}</span>
        <span>{frontmatter.description}</span>
      </header>
      <main className="prose mx-auto my-4 md:prose-lg lg:prose-xl">
        <Component />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostSlugs();

  return { fallback: false, paths };
};
export const getStaticProps: GetStaticProps = async ctx => {
  const postData = await getPostData(ctx.params?.slug as string);

  return { props: { ...postData } };
};
