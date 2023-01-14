import { Typography } from "@material-tailwind/react";
import FloatingSquares from "../../FloatingSquares";
import Image from "next/image";
import myPic from "../../../public/images/vallen-icon.png";
import FadeBottom from "../../FadePageTranstition/FadeBottom";
import Line from "../../Line";

export default function Hero() {
  return (
    <>
      <FloatingSquares />
      <section
        aria-label="hero-section"
        id="home"
        className="relative z-10 mt-10 mb-24 xl:mb-16"
      >
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center px-8 xl:min-h-[670px] xl:flex-row xl:justify-between">
          {/* left side */}
          <div className="relative grow">
            {/* my photo */}
            <Image
              src={myPic}
              alt="Jestine Vallendra Dwi Putra"
              className="relative w-full xl:-left-8"
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
                className="hidden font-bold text-white/80 xl:inline"
              >
                Hello, I'm
              </Typography>
              <Typography
                as="h1"
                variant="h1"
                className="p-2 text-center text-7xl font-bold text-white md:text-8xl xl:text-start xl:text-9xl"
              >
                VallenDra
              </Typography>
              <Typography
                as="span"
                variant="h3"
                className="text-center text-2xl font-bold text-white/80 md:text-3xl xl:text-right"
              >
                Front-End Web Developer 👨‍💻
              </Typography>
            </div>

            {/* Line to next section */}
          </div>
        </div>
        <Line className="absolute left-1/2 bottom-[-100px] z-20 -translate-x-1/2 scale-y-[3] bg-white/40 xl:bottom-[-50px] xl:scale-y-[6]" />
      </section>

      <FadeBottom position="bottom-0" />
    </>
  );
}
