import { Typography } from "@material-tailwind/react";
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

      <div className="relative flex h-screen animate-fade-in flex-col items-center justify-center bg-indigo-50/60 px-8 dark:bg-gray-900/60">
        <div className="flex flex-col items-start space-y-2">
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 150)}
          >
            <Typography
              variant="h3"
              as="span"
              className="relative z-10 font-bold text-indigo-500 opacity-0 dark:text-gray-300"
            >
              Oops you went offline... 😕
            </Typography>
          </Observe>

          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 350)}
          >
            <Typography
              variant="h4"
              as="span"
              className="text-indigo-300 opacity-0 dark:text-gray-400"
            >
              Come back later when you are reconnected to the network.
            </Typography>
          </Observe>
        </div>
      </div>
    </>
  );
}
