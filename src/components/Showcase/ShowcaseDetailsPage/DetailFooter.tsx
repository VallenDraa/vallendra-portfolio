import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import type {
  ShowcaseDetailRedirect,
  ShowcaseType,
} from "interfaces/showcase.interface";
import Comment from "./Comment";
import LinkWithUnderline from "./LinkWithUnderline";

type DetailFooterProps = {
  showcaseType: ShowcaseType;
  prevShowcase: ShowcaseDetailRedirect;
  nextShowcase: ShowcaseDetailRedirect;
};

export default function DetailFooter({
  showcaseType,
  nextShowcase,
  prevShowcase,
}: DetailFooterProps) {
  return (
    <section className="mb-5">
      <Comment />
      {/* links to previous and next projects */}
      <div className="mt-5 flex w-full justify-between gap-8 text-base">
        {/* link to previous listed projects */}
        <LinkWithUnderline
          className="grow md:flex-grow-0"
          href={`/${showcaseType}/${prevShowcase.slug}`}
        >
          <BsArrowLeft />
          {prevShowcase.name}
        </LinkWithUnderline>

        {/* link to next listed projects */}
        <LinkWithUnderline
          className="grow justify-end md:flex-grow-0"
          href={`/${showcaseType}/${nextShowcase.slug}`}
        >
          {nextShowcase.name}
          <BsArrowRight />
        </LinkWithUnderline>
      </div>
    </section>
  );
}
