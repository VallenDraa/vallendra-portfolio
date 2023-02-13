import { IconButton } from "@material-tailwind/react";
import { useRef } from "react";
import { VscTriangleUp } from "react-icons/vsc";

export default function GoToTopBtn({
  isVisible,
  callback,
}: {
  isVisible: boolean;
  callback: () => void;
}) {
  const goUpBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <IconButton
      aria-label="Go to top button"
      ref={goUpBtnRef}
      size="lg"
      ripple={false}
      variant="filled"
      color="deep-purple"
      onClick={callback}
      className={`fixed bottom-5 right-10 z-50 inline-block translate-x-0 p-2 opacity-30 duration-500 hover:opacity-100 ${
        isVisible ? "" : "translate-y-[200%]"
      }`}
    >
      <VscTriangleUp className="text-xl" />
    </IconButton>
  );
}
