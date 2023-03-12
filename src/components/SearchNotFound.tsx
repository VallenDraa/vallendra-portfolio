export default function SearchNotFound() {
  return (
    <div className="relative h-52">
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 animate-fade-in space-y-2 px-8 text-center lg:px-0">
        <h4 className="text-zinc-700 dark:text-zinc-300">
          Sorry, Can&apos;t Find Anything 😕
        </h4>
        <h6 className="text-zinc-500 dark:text-zinc-300">
          Try searching for something else.
        </h6>
      </div>
    </div>
  );
}
