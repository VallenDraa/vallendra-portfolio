import Observe from "components/Observe";
import Image from "next/image";
import fadeIn from "utils/client/helpers/animateOnObserved";
import myPic from "@/public/images/vallen-icon.png";

export default function Hero() {
  return (
    <section
      id="home"
      aria-label="hero-section"
      className="relative z-10 scroll-mt-44 pb-24 xl:pb-8"
    >
      <div className="layout flex flex-col items-center justify-center xl:flex-row xl:justify-between">
        {/* left side */}
        <Observe
          freezeOnceVisible
          onEnter={ref => fadeIn(ref, "animate-fade-in-left")}
        >
          <div className="relative w-2/3 grow opacity-0 md:w-fit">
            {/* my photo */}
            <Image
              src={myPic}
              alt="Jestine Vallendra Dwi Putra"
              className="relative w-full xl:-left-8"
              width={800}
              height={800}
              priority
              loading="eager"
            />
          </div>
        </Observe>

        {/* Right Side */}
        <div className="relative">
          {/* my name */}
          <div aria-label="name-section">
            <Observe
              freezeOnceVisible
              onEnter={ref => fadeIn(ref, "animate-fade-in-top", 50)}
            >
              <span className="invisible absolute text-2xl font-bold text-white/80 opacity-0 md:text-3xl xl:visible xl:relative">
                Stuff about
              </span>
            </Observe>
            <Observe
              freezeOnceVisible
              onEnter={ref => fadeIn(ref, "animate-fade-in-top", 350)}
            >
              <h1 className="p-2 text-center text-7xl font-bold text-white opacity-0 md:text-8xl xl:text-start xl:text-9xl">
                VallenDra
              </h1>
            </Observe>
            <Observe
              freezeOnceVisible
              onEnter={ref => fadeIn(ref, "animate-fade-in-top", 650)}
            >
              <span className="block text-center text-2xl font-bold text-white/80 opacity-0 md:text-3xl xl:text-right">
                <span className="hidden xl:inline">The</span> Front-End Web
                Developer {"</>"}
              </span>
            </Observe>
          </div>
        </div>
      </div>
    </section>
  );
}
