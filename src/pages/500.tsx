export default function ServerErrorPage() {
  return (
    <div className="fade-bottom relative flex min-h-[75vh] translate-y-20 flex-col items-center justify-center gap-3 px-8 after:-top-20">
      <div className="flex flex-col items-start space-y-2">
        <h3 className="relative z-10 font-bold text-zinc-700 dark:text-zinc-300">
          Error 500 😕
        </h3>
        <h4 className="text-zinc-500 dark:text-zinc-300">
          Please try reloading the page or come again later.
        </h4>
      </div>
    </div>
  );
}
