export default function SearchNotFound() {
  return (
    <div className="flex min-h-[200px] w-full animate-fade-in flex-col items-center justify-center space-y-2 px-8 text-center lg:px-0">
      <span className="text-xl font-bold text-zinc-700 dark:text-zinc-300 md:text-2xl">
        Sorry, Can&apos;t Find Anything 😕
      </span>
      <span className="text-base font-medium text-zinc-500 dark:text-zinc-300 md:text-lg">
        Try searching for something else.
      </span>
    </div>
  );
}
