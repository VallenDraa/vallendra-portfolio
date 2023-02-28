import { Button } from "@material-tailwind/react";
import clsx from "clsx";
import { AiFillHeart } from "react-icons/ai";
import Show from "utils/client/jsx/Show";

type LikeButtonProps = {
  showSkeleton: boolean;
  revealButton: boolean;
  hasLikedShowcase: boolean;
  formattedLikes: string;
  onClick: () => void;
};

export default function LikeButton({
  showSkeleton,
  hasLikedShowcase,
  formattedLikes,
  revealButton,
  onClick,
}: LikeButtonProps) {
  return (
    <>
      <Show when={showSkeleton}>
        <div className="flex h-24 w-24 animate-pulse flex-col gap-2">
          <div className="basis-3/4 rounded-lg bg-white/20" />
          <div className="basis-1/4 rounded-lg bg-white/20" />
        </div>
      </Show>
      <Show when={revealButton}>
        <Button
          onClick={onClick}
          variant="text"
          color={hasLikedShowcase ? "red" : "gray"}
          data-tooltip-content={
            hasLikedShowcase ? "Thank you so much !" : "Likes are appreciated !"
          }
          className={clsx(
            "icon-tooltip",
            "flex animate-fade-in flex-col items-center gap-1 overflow-hidden text-5xl",
            hasLikedShowcase && "text-red-400",
          )}
        >
          <AiFillHeart />
          <span className="text-sm">{formattedLikes}</span>
        </Button>
      </Show>
    </>
  );
}
