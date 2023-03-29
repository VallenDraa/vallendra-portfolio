import { Fragment, useMemo } from "react";
import clsx from "clsx";

type SectionHeadings = {
  name: string;
  hash: string;
  children: SectionHeadings[];
};

type ItemProps = {
  name: string;
  hash: string;
  type: "h2" | "h3" | "h4";
};

function ContentItem({ name, hash, type }: ItemProps) {
  return (
    <a
      href={`#${hash}`}
      className={clsx(
        "inline-block w-fit p-1 text-base font-medium text-zinc-400 underline-offset-2 hover:underline",
        type === "h2" && "pl-0",
        type === "h3" && "pl-3",
        type === "h4" && "pl-6",
      )}
    >
      {name}
    </a>
  );
}

export default function TableOfContents({ slug }: { slug: string }) {
  const sectionHeadings = useMemo(() => {
    // the last indexes of headings inside of the results array
    let lastH2 = 0;
    let lastH3 = 0;

    const results: SectionHeadings[] = [];

    const headings = Array.from(
      document.querySelectorAll(
        ".blog-content h2, .blog-content h3, .blog-content h4",
      ),
    );

    headings.forEach((elem, i) => {
      const { tagName } = elem;
      const parsedHeading = {
        name: elem.textContent as string,
        hash: elem.id,
        children: [],
      };

      if (tagName === "H2") {
        lastH2 = i;

        results.push(parsedHeading);
      } else if (tagName === "H3") {
        lastH3 = i;
        results[lastH2].children.push(parsedHeading);
      } else {
        results[lastH2].children[lastH3].children.push(parsedHeading);
      }
    });

    return results;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <section className="not-prose">
      <span className="h3 mb-4 block">Table Of Contents</span>
      <div className="flex flex-col gap-2">
        {sectionHeadings.map(parent => (
          <Fragment key={parent.name}>
            <ContentItem name={parent.name} hash={parent.hash} type="h2" />
            {parent.children.map(itemChildren => (
              <Fragment key={itemChildren.name}>
                <ContentItem
                  name={itemChildren.name}
                  hash={itemChildren.hash}
                  type="h3"
                />

                {itemChildren.children.map(itemGrandChildren => (
                  <ContentItem
                    key={itemGrandChildren.name}
                    name={itemGrandChildren.name}
                    hash={itemGrandChildren.hash}
                    type="h4"
                  />
                ))}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
