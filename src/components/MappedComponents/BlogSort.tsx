import { AiFillEye, AiFillHeart, AiFillCalendar } from "react-icons/ai";

export const BLOG_SORT_BY = ["date", "likes", "views"] as const;

export type BlogSortBy = (typeof BLOG_SORT_BY)[number];

export const BlogSortIcons: { [key in BlogSortBy]: () => JSX.Element } = {
  views: () => <AiFillEye />,
  likes: () => <AiFillHeart />,
  date: () => <AiFillCalendar />,
};
