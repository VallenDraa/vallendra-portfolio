import type { GetStaticProps } from "next/types";
import type { PostData } from "interfaces/blogPost.interface";

import Link from "next/link";
import { getBlogPostData } from "utils/server/posts";

type BlogsPageProps = {
  allPostData: PostData[];
};

export default function BlogsPage({ allPostData }: BlogsPageProps) {
  return (
    <div className="flex flex-col gap-2 divide-y-2">
      {allPostData?.map(post => (
        <Link href={`/blog/${post.slug}`} key={post.slug}>
          {post.title}
        </Link>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostData = await getBlogPostData();

  return { props: { allPostData } };
};
