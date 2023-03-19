import Head from "next/head";
import fadeIn from "utils/client/helpers/animateOnObserved";
import BreathingBackground from "./BreathingBackground";
import Observe from "./Observe";

export default function OfflinePage() {
  return (
    <>
      <Head>
        <title>You Went Offline...</title>
      </Head>
      <BreathingBackground />

      <div className="bg--indigo-50/60 relative flex h-screen animate-fade-in flex-col items-center justify-center px-8 dark:bg-zinc-900/60">
        <div className="flex flex-col items-start space-y-2">
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 150)}
          >
            <span className="relative z-10 text-2xl font-bold text-white/80 opacity-0">
              Oops you went offline... 😕
            </span>
          </Observe>

          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 350)}
          >
            <span className="text-xl font-medium text-white/60 opacity-0">
              Come back later when you are reconnected to the network.
            </span>
          </Observe>
        </div>
      </div>
    </>
  );
}
