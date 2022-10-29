import NavbarComponent from "../Navbar/Navbar";
import VallenIcon from "../../images/vallen-icon.png";
import { Typography } from "@material-tailwind/react";

const Hero = () => {
  return (
    <>
      <NavbarComponent />
      <div aria-label="hero-section" className="mt-8">
        <div className="max-w-screen-lg mx-auto flex items-center">
          {/* photo */}
          <div>
            <img
              src={VallenIcon}
              alt="Jestine Vallendra Dwi Putra"
              className="relative -left-8"
            />
          </div>

          {/* my name */}
          <div aria-label="name-section" className="text-gray-200">
            <Typography as="span" variant="h3" className="font-bold ">
              Hello, I'm
            </Typography>
            <Typography
              as="h1"
              variant="h1"
              className="text-8xl font-bold p-2 text-white"
            >
              VallenDra
            </Typography>
            <Typography
              as="h2"
              variant="h4"
              className="font-bold text-right text-gray-200/70"
            >
              A Full-Stack Web Developer
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
