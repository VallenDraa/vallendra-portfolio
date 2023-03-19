import clsx from "clsx";
import { VscTriangleUp } from "react-icons/vsc";
import { useRef, useEffect } from "react";
import StyledButton from "./StyledComponents/StyledButton";

export default function GoToTopBtn() {
  const goUpBtnRef = useRef<HTMLDivElement>(null);
  const scrollPercentage = useRef<number>(0);

  /* For showing and hiding go up button
  ===================================== */
  useEffect(() => {
    const height = document.documentElement;

    function goUpBtnViewHandler() {
      scrollPercentage.current =
        (height.scrollTop / (height.scrollHeight - height.clientHeight)) * 100;

      if (scrollPercentage.current > 5) {
        goUpBtnRef.current?.classList.remove("translate-y-[200%]");
      } else {
        goUpBtnRef.current?.classList.add("translate-y-[200%]");
      }
    }

    window.addEventListener("scroll", goUpBtnViewHandler);

    return () => {
      window.removeEventListener("scroll", goUpBtnViewHandler);
    };
  }, []);

  return (
    <div
      ref={goUpBtnRef}
      className="fixed bottom-5 right-10 z-50 inline-block transition duration-200"
    >
      <StyledButton
        aria-label="Go to top button"
        onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
        className={clsx(
          "bg-indigo-500",
          "text-white",
          "rounded-md p-3 opacity-30 duration-300 hover:opacity-100",
        )}
      >
        <VscTriangleUp className="text-2xl" />
      </StyledButton>
    </div>
  );
}
