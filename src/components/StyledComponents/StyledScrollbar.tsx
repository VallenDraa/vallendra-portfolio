import Scrollbars, { ScrollbarProps } from "react-custom-scrollbars-2";

const classes =
  "z-[70] rounded-full bg-indigo-300/60 hover:bg-indigo-300 active:bg-indigo-300 dark:bg-white/30 dark:hover:bg-white/80 dark:active:bg-white/80";

export default function StyledScrollbar({
  children,
  ...props
}: ScrollbarProps) {
  return (
    <Scrollbars
      universal
      autoHide
      renderThumbHorizontal={thumbProps => (
        <div {...thumbProps} className={classes} />
      )}
      renderThumbVertical={thumbProps => (
        <div {...thumbProps} className={classes} />
      )}
      {...props}
    >
      {children}
    </Scrollbars>
  );
}
