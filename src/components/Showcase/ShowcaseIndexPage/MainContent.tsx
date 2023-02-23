import type { ShowcaseType } from "interfaces/showcase.interface";
import type ShowcaseItem from "interfaces/showcase.interface";
import Show from "utils/client/jsx/Show";
import ItemCard from "components/Cards/ItemCard";
import type Category from "interfaces/category.interface";
import dynamic from "next/dynamic";
import ShowcaseCategorySection from "../ShowcaseCategorySection";

type PageBodyProps = {
  showcaseType: ShowcaseType;
  activeShowcaseIndex: number[];
  currentSearchQuery: string;
  showcaseItems: ShowcaseItem[];
  categories: Category[];
};

const SearchNotFound = dynamic(() => import("components/SearchNotFound"), {
  ssr: false,
});

export default function MainContent({
  showcaseType,
  showcaseItems,
  categories,
  activeShowcaseIndex,
  currentSearchQuery,
}: PageBodyProps) {
  return (
    <>
      <Show when={currentSearchQuery === ""}>
        <div className="space-y-10">
          {categories.map(category => (
            <ShowcaseCategorySection
              showcaseType={showcaseType}
              key={category._id}
              category={category}
              categoryItems={showcaseItems}
            />
          ))}
        </div>
      </Show>

      {/* search results */}
      <Show when={activeShowcaseIndex.length > 0 && currentSearchQuery !== ""}>
        <ul className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3">
          {activeShowcaseIndex.map(idx => (
            <li key={showcaseItems[idx]._id}>
              <ItemCard data={showcaseItems[idx]} type={showcaseType} />
            </li>
          ))}
        </ul>
      </Show>

      {/* for empty search result */}
      <Show when={activeShowcaseIndex.length === 0}>
        <SearchNotFound />
      </Show>
    </>
  );
}
