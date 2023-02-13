import Scrollbars, { ScrollbarProps } from "react-custom-scrollbars-2";
import R from "react";

const classes =
  "z-[70] rounded-full bg-indigo-300/60 hover:bg-indigo-300 active:bg-indigo-300 dark:bg-white/30 dark:hover:bg-white/80 dark:active:bg-white/80";

const StyledScrollbar = R.forwardRef<Scrollbars, ScrollbarProps>(
  ({ children, ...props }, forwardedRef) => (
    <Scrollbars
      {...props}
      universal
      autoHide
      renderThumbHorizontal={thumbProps => (
        <div {...thumbProps} className={classes} />
      )}
      renderThumbVertical={thumbProps => (
        <div {...thumbProps} className={classes} />
      )}
      ref={forwardedRef}
    >
      {children}
    </Scrollbars>
  ),
);

export default StyledScrollbar;
