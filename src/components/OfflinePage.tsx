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
            <h3 className="relative z-10 font-bold text-zinc-700 opacity-0 dark:text-zinc-300">
              Oops you went offline... 😕
            </h3>
          </Observe>

          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 350)}
          >
            <h4 className="text-zinc-500 opacity-0 dark:text-zinc-400">
              Come back later when you are reconnected to the network.
            </h4>
          </Observe>
        </div>
      </div>
    </>
  );
}
