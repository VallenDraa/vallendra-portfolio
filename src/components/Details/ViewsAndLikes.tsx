import { Typography } from "@material-tailwind/react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";

export default function ViewsAndLikes({
  views,
  likes,
  hasLiked,
}: {
  views: number;
  likes: number;
  hasLiked: boolean;
}) {
  return (
    <div className="mt-2.5 flex gap-3 text-indigo-300 dark:text-gray-400">
      <Typography
        variant="paragraph"
        as="span"
        className="flex items-center gap-1 text-sm font-bold"
      >
        <AiFillEye />
        {views} views
      </Typography>

      <span>&bull;</span>

      <Typography
        variant="paragraph"
        as="span"
        className={`flex items-center gap-1 text-sm font-bold ${
          hasLiked ? "text-red-300" : "text-inherit"
        }`}
      >
        <AiFillHeart />
        {likes} likes
      </Typography>
    </div>
  );
}
