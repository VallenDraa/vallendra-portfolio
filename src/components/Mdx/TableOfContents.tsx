import R from "react";
import clsx from "clsx";
import { Disclosure } from "@headlessui/react";
import { IoChevronDown } from "react-icons/io5";

type HeadingTypes = "h2" | "h3" | "h4";

type SectionHeadings = {
  type: HeadingTypes;
  name: string;
  hash: string;
};

type ItemProps = {
  name: string;
  hash: string;
  type: HeadingTypes;
};

function ContentItem({ name, hash, type }: ItemProps) {
  return (
    <li
      className={clsx(
        type === "h2" && "ml-0",
        type === "h3" && "ml-3",
        type === "h4" && "ml-6",
      )}
    >
      <a
        href={`#${hash}`}
        className={clsx(
          "transition-colors",
          "inline-block w-fit py-1",
          "text-sm text-zinc-900 hover:text-pink-400 dark:border-zinc-300 dark:text-zinc-300 dark:hover:text-pink-300 md:text-base",
          "border-b border-dashed border-zinc-900 hover:border-solid hover:border-pink-400 dark:hover:border-pink-300",
        )}
      >
        {name}
      </a>
    </li>
  );
}

export default function TableOfContents({ slug }: { slug: string }) {
  const [isLoading, setIsLoading] = R.useState(true);
  const [sectionHeadings, setSectionHeadings] = R.useState<SectionHeadings[]>(
    [],
  );

  R.useEffect(() => {
    setIsLoading(true);

    const headings = Array.from(
      document.querySelectorAll(".blog-content :where(h2, h3, h4)"),
    );

    setSectionHeadings(
      headings.map(elem => ({
        type: elem.tagName.toLowerCase() as HeadingTypes,
        name: elem.textContent as string,
        hash: elem.id,
      })),
    );

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return isLoading ? (
    // skeleton
    <section className="h-96 w-full animate-pulse rounded-lg bg-white/20" />
  ) : (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <Disclosure.Button className="h4 flex items-center gap-2 font-bold transition hover:text-pink-400 dark:hover:text-pink-300">
            Table Of Contents
            <IoChevronDown
              className={clsx(open && "rotate-180", "transition",)}
            />
          </Disclosure.Button>

          <Disclosure.Panel as="blockquote" className="not-prose">
            <ul className="flex flex-col gap-3">
              {sectionHeadings.map(heading => (
                <ContentItem
                  key={heading.name}
                  name={heading.name}
                  hash={heading.hash}
                  type={heading.type}
                />
              ))}
            </ul>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
