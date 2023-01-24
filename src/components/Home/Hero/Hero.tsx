import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import myPic from "../../../../public/images/vallen-icon.png";
import Line from "../../Line";

export default function Hero() {
  return (
    <>
      <section
        aria-label="hero-section"
        id="home"
        className="relative z-10 mb-24 xl:mb-8"
      >
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center px-8 lg:px-2 xl:min-h-[650px] xl:flex-row xl:justify-between 2xl:px-0">
          {/* left side */}
          <div className="relative grow">
            {/* my photo */}
            <Image
              src={myPic}
              alt="Jestine Vallendra Dwi Putra"
              className="relative w-full xl:-left-8"
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
                Yes it's him,
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
                <span className="hidden xl:inline">The</span> Front-End Web
                Developer 👨‍💻
              </Typography>
            </div>
          </div>
        </div>
        {/* Line to next section */}
        <Line className="absolute left-1/2 bottom-[-100px] z-20 -translate-x-1/2 scale-y-[3] xl:-bottom-3 xl:scale-y-[6]" />
      </section>
    </>
  );
}
