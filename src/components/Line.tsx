const Line = ({ className, scale }: { className?: string; scale?: string }) => {
  return (
    <div
      className={`${className} h-10 w-[1px] bg-indigo-500/40 dark:bg-white/40`}
      style={{ scale }}
    />
  );
};

export default Line;
