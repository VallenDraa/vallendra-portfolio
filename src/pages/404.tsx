import LinkWithUnderline from "components/Showcase/ShowcaseDetailsPage/LinkWithUnderline";
import fadeIn from "utils/client/helpers/animateOnObserved";
import Observe from "components/Observe";

export default function NotFoundPage() {
  return (
    <div className="fade-bottom relative flex min-h-[75vh] w-full flex-col items-center justify-center gap-3 pt-20 after:top-16">
      <div className="flex flex-col items-start space-y-2">
        <Observe
          freezeOnceVisible
          onEnter={ref => fadeIn(ref, "animate-fade-in-top", 150)}
        >
          <span className="h4 relative z-10 font-bold text-white/80 opacity-0">
            Error 404 😕
          </span>
        </Observe>

        <Observe
          freezeOnceVisible
          onEnter={ref => fadeIn(ref, "animate-fade-in-top", 350)}
        >
          <span className="h5 font-medium text-white/60 opacity-0">
            Can&apos;t seem to find the page you are looking for.
          </span>
        </Observe>
      </div>

      <Observe
        freezeOnceVisible
        onEnter={ref => fadeIn(ref, "animate-fade-in-top", 550)}
      >
        <div className="relative z-10 opacity-0">
          <LinkWithUnderline href="/">Back To Home Page</LinkWithUnderline>
        </div>
      </Observe>
    </div>
  );
}
