import fadeIn from "utils/client/helpers/animateOnObserved";
import Observe from "components/Observe";

export default function ServerErrorPage() {
  return (
    <div className="fade-bottom relative flex min-h-[75vh] w-full flex-col items-center justify-center gap-3 pt-20 after:top-16">
      <div className="flex flex-col items-start space-y-2">
        <Observe
          freezeOnceVisible
          onEnter={ref => fadeIn(ref, "animate-fade-in-top", 150)}
        >
          <span className="relative z-10 text-2xl font-bold text-white/80 opacity-0">
            Error 500 😕
          </span>
        </Observe>

        <Observe
          freezeOnceVisible
          onEnter={ref => fadeIn(ref, "animate-fade-in-top", 350)}
        >
          <span className="text-xl font-medium text-white/60 opacity-0">
            Please try reloading the page or come again later.
          </span>
        </Observe>
      </div>
    </div>
  );
}
