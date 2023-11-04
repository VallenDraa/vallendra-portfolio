import R from "react";

type LineProps = {
  scale?: string;
} & R.DetailedHTMLProps<R.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const Line = R.forwardRef<HTMLDivElement, LineProps>(
  ({ ref: normalRef, style, className, scale, ...props }, forwardRef) => (
    <div
      ref={forwardRef}
      className={`${className} h-10 w-[2px] bg-indigo-300/50 dark:bg-white/30`}
      style={{ scale }}
      {...props}
    />
  ),
);

export default Line;
