import R from "react";

interface Props
  extends R.DetailedHTMLProps<
    R.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  scale?: string;
}

const Line = R.forwardRef<HTMLDivElement, Props>(
  ({ ref: normalRef, style, className, scale, ...props }, forwardRef) => {
    return (
      <div
        ref={forwardRef}
        className={`${className} h-10 w-[2px] bg-indigo-300/50 dark:bg-white/30`}
        style={{ scale }}
        {...props}
      />
    );
  },
);

export default Line;
