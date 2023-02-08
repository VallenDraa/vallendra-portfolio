import { IconButton } from "@material-tailwind/react";
import { useEffect, useRef } from "react";
import { VscTriangleUp } from "react-icons/vsc";

export default function GoToTopBtn() {
  const goUpBtnRef = useRef<HTMLButtonElement>(null);
  const scrollPercentage = useRef<number>(0);

  /* For showing and hiding go up button
  ===================================== */
  useEffect(() => {
    const height = document.documentElement;

    function goUpBtnViewHandler() {
      scrollPercentage.current =
        (height.scrollTop / (height.scrollHeight - height.clientHeight)) * 100;

      scrollPercentage.current > 5
        ? goUpBtnRef.current?.classList.remove("translate-y-[200%]")
        : goUpBtnRef.current?.classList.add("translate-y-[200%]");
    }

    window.addEventListener("scroll", goUpBtnViewHandler);

    return () => {
      window.removeEventListener("scroll", goUpBtnViewHandler);
    };
  }, []);
  return (
    <a
      aria-label="Go to top link"
      href="#"
      className="fixed bottom-5 right-10 z-50 inline-block translate-x-0 opacity-30 hover:opacity-100"
    >
      <IconButton
        aria-label="Go to top button"
        ref={goUpBtnRef}
        size="lg"
        ripple={false}
        variant="filled"
        color="deep-purple"
        className="p-2"
      >
        <VscTriangleUp className="text-xl" />
      </IconButton>
    </a>
  );
}
