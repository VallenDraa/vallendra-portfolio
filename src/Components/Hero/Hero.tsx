import VallenIcon from "../../../Images/vallen-icon.png";
import { Typography } from "@material-tailwind/react";
import Line from "../Line/Line";
import FloatingSquares from "../FloatingSquares/FloatingSquares";

const Hero = () => {
  return (
    <>
      <FloatingSquares />
      <div aria-label="hero-section" id="home" className="my-24 relative z-10">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          {/* left side */}
          <div className="grow">
            {/* my photo */}
            <img
              src={VallenIcon}
              alt="Jestine Vallendra Dwi Putra"
              className="relative -left-8 w-full"
            />
          </div>

          {/* Right Side */}
          <div className="relative">
            {/* my name */}
            <div aria-label="name-section">
              <Typography
                as="span"
                variant="h3"
                className="font-bold text-gray-200"
              >
                Hello, I'm
              </Typography>
              <Typography
                as="h1"
                variant="h1"
                className="text-9xl font-bold p-2 text-white"
              >
                VallenDra
              </Typography>
              <Typography
                as="h2"
                variant="h3"
                className="font-bold text-right text-gray-200"
              >
                A Full-Stack Web Developer 🖥
              </Typography>
            </div>

            {/* Line to next section */}
            <Line className="scale-y-[6.5] bg-white/30 absolute left-1/2 -translate-x-1/2 top-[360px] z-20" />
          </div>
        </div>

        {/* bottom fade to profile*/}
      </div>
      <div className="h-12 w-full bg-gradient-to-b from-transparent to-gray-900 absolute bottom-0" />
    </>
  );
};

export default Hero;
