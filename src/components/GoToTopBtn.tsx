import clsx from "clsx";
import { VscTriangleUp } from "react-icons/vsc";
import StyledButton from "./StyledComponents/StyledButton";

export default function GoToTopBtn({
  isVisible,
  callback,
}: {
  isVisible: boolean;
  callback: () => void;
}) {
  return (
    <StyledButton
      aria-label="Go to top button"
      onClick={callback}
      className={clsx(
        "bg-indigo-500",
        "text-white",
        "fixed bottom-5 right-10 z-50 inline-block translate-x-0 rounded-md p-3 opacity-30 duration-500 hover:opacity-100",
        !isVisible && "translate-y-[200%]",
      )}
    >
      <VscTriangleUp className="text-2xl" />
    </StyledButton>
  );
}
