// import type { GetStaticProps } from "next/types";
// import type { PostData } from "interfaces/blogPost.interface";

// import Link from "next/link";
// import { getBlogPostData } from "utils/server/posts";
// import Observe from "components/Observe";
// import SectionHeading from "components/Typography/SectionHeading";
// import fadeIn from "utils/client/helpers/animateOnObserved";
// import SearchInput from "components/SearchInput";

// type BlogsPageProps = {
//   allPostData: PostData[];
// };

// export default function BlogsPage({ allPostData }: BlogsPageProps) {
//   const [query, setQuery] = R.useState<string>("");

//   return (
//     <>
//       <header className="fade-bottom relative mt-6 mb-3 w-full after:-top-7">
//         <div className="mx-auto flex max-w-screen-xl flex-col px-8 pt-20 2xl:px-2">
//           {/* heading */}
//           <Observe
//             freezeOnceVisible
//             onEnter={ref => fadeIn(ref, "animate-fade-in-top", 0)}
//           >
//             <div className="opacity-0">
//               <SectionHeading
//                 title="Blogs"
//                 subTitle="The section where I express anything that comes in my mind."
//               />
//             </div>
//           </Observe>

//           {/* searchbar */}
//           <Observe
//             freezeOnceVisible
//             onEnter={ref => fadeIn(ref, "animate-fade-in-top", 200)}
//           >
//             <div className="opacity-0">
//               <SearchInput
//                 defaultValue=""
//                 placeholder="Search Projects"
//                 loadingCallback={isWaiting => setSearchIsLoading(isWaiting)}
//                 callback={newQuery => setQuery(newQuery)}
//               />
//             </div>
//           </Observe>
//         </div>
//       </header>

//       {/* the projects list */}
//       <main
//         className={`relative mx-auto w-full max-w-screen-xl grow px-10 pt-5 pb-10 2xl:px-2 ${
//           /* overlay for awaiting search results */
//           searchIsLoading
//             ? "cursor-not-allowed after:absolute after:inset-0 after:z-20"
//             : ""
//         }`}
//       >
//         {/* initial render for projects with categories */}
//         <Show when={projects.length > 0 && query === ""}>
//           <div className="space-y-10">
//             {categories.map((category, i) => (
//               // index is used for determining the image priority prop
//               <ShowcaseCategorySection
//                 showcaseType="projects"
//                 categoryIndex={i}
//                 key={category._id}
//                 category={category}
//                 categoryItems={projects}
//               />
//             ))}
//           </div>
//         </Show>

//         {/* search results */}
//         <Show
//           when={projects.length > 0 && showedIndex.length > 0 && query !== ""}
//         >
//           <ul className="grid grid-cols-1 gap-6 px-3 md:grid-cols-2 lg:grid-cols-3">
//             {showedIndex.map(idx => (
//               <li key={projects[idx]._id}>
//                 <ItemCard
//                   data={projects[idx]}
//                   type="projects"
//                   imgIsPriority={false}
//                 />
//               </li>
//             ))}
//           </ul>
//         </Show>

//         {/* for empty search result */}
//         <Show when={projects.length > 0 && showedIndex.length === 0}>
//           <SearchNotFound />
//         </Show>

//         {/* fallback for when the projects failed to load */}
//         <Show when={projects.length === 0 || !projects || isError}>
//           <FailToLoad />
//         </Show>
//       </main>
//     </>
//   );
// }

// export const getStaticProps: GetStaticProps = async () => {
//   const allPostData = await getBlogPostData();

//   return { props: { allPostData } };
// };
