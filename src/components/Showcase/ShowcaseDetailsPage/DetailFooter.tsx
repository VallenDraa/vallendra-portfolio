import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import type {
  ShowcaseDetailRedirect,
  ShowcaseType,
} from "interfaces/showcase.interface";
import clsx from "clsx";
import Comment from "./Comment";
import LinkWithUnderline from "./LinkWithUnderline";

type DetailFooterProps = {
  showcaseType: ShowcaseType;
  prevShowcase: ShowcaseDetailRedirect;
  nextShowcase: ShowcaseDetailRedirect;
  className?: string;
};

export default function DetailFooter({
  showcaseType,
  nextShowcase,
  prevShowcase,
  className,
}: DetailFooterProps) {
  return (
    <section className={clsx("mb-5", className)}>
      <Comment />

      {/* links to previous and next projects */}
      <div className="mt-5 flex w-full justify-between gap-8 text-base">
        {/* link to previous listed projects */}
        <LinkWithUnderline
          className="grow sm:flex-grow-0"
          href={`/${showcaseType}/${prevShowcase.slug}`}
        >
          <BsArrowLeft />
          {prevShowcase.name}
        </LinkWithUnderline>

        {/* link to next listed projects */}
        <LinkWithUnderline
          className="grow justify-end sm:flex-grow-0"
          href={`/${showcaseType}/${nextShowcase.slug}`}
        >
          {nextShowcase.name}
          <BsArrowRight />
        </LinkWithUnderline>
      </div>
    </section>
  );
}
