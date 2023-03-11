import clsx from "clsx";
import StyledButton from "components/StyledComponents/StyledButton";
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
        <StyledButton
          onClick={onClick}
          data-tooltip-content={
            hasLikedShowcase ? "Thank you so much !" : "Likes are appreciated !"
          }
          className={clsx(
            "icon-tooltip",
            "flex animate-fade-in flex-col items-center gap-1 overflow-hidden py-3 px-6",
            hasLikedShowcase
              ? "text-red-400 hover:bg-red-500/10"
              : "text-zinc-400 hover:bg-zinc-500/10",
          )}
        >
          <AiFillHeart className="text-5xl" />
          <span className="text-sm">{formattedLikes}</span>
        </StyledButton>
      </Show>
    </>
  );
}
