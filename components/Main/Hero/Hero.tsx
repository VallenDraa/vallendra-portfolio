import { Typography } from "@material-tailwind/react";
import Line from "../../Line/Line";
import FloatingSquares from "../../FloatingSquares/FloatingSquares";
import Image from "next/image";
import myPic from "../../../public/images/vallen-icon.png";

export default function Hero() {
  return (
    <>
      <FloatingSquares />
      <section
        aria-label="hero-section"
        id="home"
        className="mt-10 mb-24 xl:mb-16 relative z-10"
      >
        <div className="max-w-screen-2xl px-8 mx-auto flex flex-col xl:flex-row justify-center xl:justify-between items-center">
          {/* left side */}
          <div className="grow relative">
            {/* my photo */}
            <Image
              src={myPic}
              alt="Jestine Vallendra Dwi Putra"
              className="relative xl:-left-8 w-full"
              unoptimized
              width={600}
              height={600}
              priority
              loading="eager"
            />
          </div>

          {/* Right Side */}
          <div className="relative">
            {/* my name */}
            <div aria-label="name-section">
              <Typography
                as="span"
                variant="h3"
                className="font-bold hidden xl:inline text-white/80"
              >
                Hello, I'm
              </Typography>
              <Typography
                as="h1"
                variant="h1"
                className="text-7xl md:text-8xl xl:text-9xl font-bold p-2 text-white text-center xl:text-start"
              >
                VallenDra
              </Typography>
              <Typography
                as="span"
                variant="h3"
                className="text-2xl md:text-3xl font-bold text-center xl:text-right text-white/80"
              >
                Front-End Web Developer
              </Typography>
            </div>

            {/* Line to next section */}
          </div>
        </div>
        <Line className="scale-y-[3] xl:scale-y-[6] bg-white/70 absolute left-1/2 -translate-x-1/2 bottom-[-100px] xl:bottom-[-50px] z-20" />
      </section>

      {/* bottom fade to profile*/}
      <div className="h-12 w-full bg-gradient-to-b from-transparent to-gray-900 absolute bottom-0" />
    </>
  );
}
