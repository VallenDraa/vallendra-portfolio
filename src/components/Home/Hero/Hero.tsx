import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import myPic from "../../../../public/images/vallen-icon.png";
import Line from "../../Line";
import Observe from "../../Observe";
import fadeIn from "../../../utils/client/helpers/animateOnObserved";

export default function Hero() {
  return (
    <>
      <section
        aria-label="hero-section"
        id="home"
        className="relative z-10 mb-24 scroll-mt-44 xl:mb-8"
      >
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center px-8 lg:px-2 xl:min-h-[650px] xl:flex-row xl:justify-between 2xl:px-2">
          {/* left side */}
          <Observe
            freezeOnceVisible
            onEnter={(ref) => fadeIn(ref, "animate-fade-in-left")}
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
                onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 50)}
              >
                <Typography
                  as="span"
                  variant="h3"
                  className="invisible absolute font-bold text-white/80 opacity-0 xl:visible xl:relative"
                >
                  Yes it's him.
                </Typography>
              </Observe>
              <Observe
                freezeOnceVisible
                onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 350)}
              >
                <Typography
                  as="h1"
                  variant="h1"
                  className="p-2 text-center text-7xl font-bold text-white opacity-0 md:text-8xl xl:text-start xl:text-9xl"
                >
                  VallenDra
                </Typography>
              </Observe>
              <Observe
                freezeOnceVisible
                onEnter={(ref) => fadeIn(ref, "animate-fade-in-top", 650)}
              >
                <Typography
                  as="span"
                  variant="h3"
                  className="text-center text-2xl font-bold text-white/80 opacity-0 md:text-3xl xl:text-right"
                >
                  <span className="hidden xl:inline">The</span> Front-End Web
                  Developer 👨‍💻
                </Typography>
              </Observe>
            </div>
          </div>
        </div>
        {/* Line to next section */}
        <Line className="absolute left-1/2 bottom-[-110px] z-20 -translate-x-1/2 scale-y-[3.5] xl:-bottom-3 xl:scale-y-[6]" />
      </section>
    </>
  );
}
