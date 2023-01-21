import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Comment from "./Comment";
import LinkWithUnderline from "./LinkWithUnderline";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface IProps {
  prevLink: string;
  prevTitle: string;
  nextLink: string;
  nextTitle: string;
}

export default function DetailFooter({
  prevLink,
  prevTitle,
  nextLink,
  nextTitle,
}: IProps) {
  const { asPath } = useRouter();
  const [commentIsVisible, setCommentIsVisible] = useState(true);

  useEffect(() => {
    setCommentIsVisible(false);
    setCommentIsVisible(true);
  }, [asPath]);

  return (
    <section className="mb-5">
      {commentIsVisible ? <Comment /> : null}
      {/* links to previous and next projects */}
      <div className="mt-5 flex w-full justify-between gap-8 text-base">
        {/* link to previous listed projects */}
        <LinkWithUnderline className="grow md:flex-grow-0" href={prevLink}>
          <BsArrowLeft />
          {prevTitle}
        </LinkWithUnderline>

        {/* link to next listed projects */}
        <LinkWithUnderline
          className="grow justify-end md:flex-grow-0"
          href={nextLink}
        >
          {nextTitle}
          <BsArrowRight />
        </LinkWithUnderline>
      </div>
    </section>
  );
}
