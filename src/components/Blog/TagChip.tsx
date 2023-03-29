type TagChipProps = {
  tag: string;
};

export default function TagChip({ tag }: TagChipProps) {
  return (
    <span className="rounded-full bg-indigo-500/20 py-1 px-3 text-xs font-bold capitalize text-indigo-500 dark:bg-indigo-500/40 dark:text-indigo-400">
      #{tag}
    </span>
  );
}
