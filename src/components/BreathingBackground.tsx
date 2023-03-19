import { useRouter } from "next/router";
import PagesData from "utils/data/pages";
import fadeIn from "utils/client/helpers/animateOnObserved";
import useNetworkStatus from "utils/client/hooks/useNetworkStatus";
import clsx from "clsx";
import Observe from "./Observe";
import FloatingSquares from "./FloatingSquares";

export default function BreathingBackground() {
  const { route } = useRouter();
  const { isOnline } = useNetworkStatus();

  return (
    <Observe freezeOnceVisible onEnter={ref => fadeIn(ref, "animate-fade-in")}>
      <div className="absolute inset-x-0 opacity-0">
        <div
          className={clsx(
            "animate-main-gradient bg-main-gradient bg-gradient",
            !isOnline && "h-screen",
            isOnline && route === PagesData.index && "h-[750px] xl:h-[780px]",
            isOnline && route !== PagesData.index && "h-36",
          )}
        >
          <FloatingSquares />
        </div>
      </div>
    </Observe>
  );
}
