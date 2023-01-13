import {
  Typography,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { IoSchool, IoCodeSlash } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import TECHS from "../../MappedComponents/TechsWithTooltip";
import Line from "../../Line";

export default function Profile() {
  return (
    <section
      aria-label="profile-section"
      id="profile"
      className="dark:bg-gray-900 relative z-10 pb-32"
    >
      {/* main content */}
      <div className="max-w-screen-xl px-8 mx-auto pt-16 relative flex flex-col xl:flex-row gap-10">
        {/* left side */}
        <div className="xl:basis-2/3 mt-4 flex flex-col relative">
          {/* blur */}
          <div className="h-80 w-80 scale-110 transition-transform duration-200 blur-3xl rounded-full skew-x-6 rotate-12 bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 absolute left-1/4 -translate-x-1/4 top-1/4 -translate-y-1/4 md:top-1/2 md:-translate-y-1/2"></div>

          <header className="flex items-center gap-1 relative w-fit gradient-underline gradient-underline--indigo-to-pink">
            <Typography
              as="h2"
              variant="h2"
              className={`animate-breathing bg-gradient bg-gradient-to-r from-indigo-300 to-pink-200 text-start text-5xl font-bold text-transparent bg-clip-text capitalize relative z-40`}
            >
              Hello World
            </Typography>
            <span className="text-5xl">👋</span>
          </header>

          {/* small paragraph and tech stack */}
          <footer className="mt-5 flex flex-col grow gap-5 relative z-40">
            {/* small paragraph about me */}
            <div className="xl:basis-2/3 mb-8 xl:mb-0">
              <Typography
                as="p"
                variant="paragraph"
                className="text-white/80 font-medium leading-loose pl-0.5 text-justify"
              >
                My name is Jestine Vallendra Dwi Putra, a Front-End Developer.
                With a year of experience in the field, I have gained a strong
                foundation in web technologies and have had the opportunity to
                work on numerous personal projects. I am constantly striving to
                learn and improve my skills, and also excited to thrive as a
                Front-End Developer.
              </Typography>
            </div>
            <Card className="dark:bg-gray-800/40 shadow-lg shadow-gray-800/60 duration-200 hover:shadow-green-800 hover:shadow-lg">
              <CardBody>
                <Typography
                  as="h3"
                  variant="h3"
                  className="text-2xl md:text-3xl uppercase flex items-center gap-2 mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-green-500 to-white"
                >
                  <IoCodeSlash className="text-green-400 bg-gray-700/90 p-1 rounded-lg text-3xl" />
                  Technologies
                </Typography>
                <Typography as="p" className="text-gray-400 font-medium">
                  Languages and frameworks that I use for projects and college !
                </Typography>
                <ul className="flex items-center mt-4 relative gap-1 overflow-auto">
                  <li>{TECHS.html}</li>
                  <li>{TECHS.css}</li>
                  <li>{TECHS["tailwind css"]}</li>
                  <li>{TECHS.javascript}</li>
                  <li>{TECHS.typescript}</li>
                  <li>{TECHS["node.js"]}</li>
                  <li>{TECHS.react}</li>
                  <li>{TECHS["next.js"]}</li>
                </ul>
              </CardBody>
              <CardFooter
                divider
                className="py-3 border-gray-600 text-gray-500"
              >
                <Typography variant="small" className="text-right">
                  And Learning More 😎
                </Typography>
              </CardFooter>
            </Card>
          </footer>
        </div>

        {/* right side */}
        <aside className="flex flex-col md:flex-row xl:flex-col gap-10 xl:basis-1/3 xl:mt-6">
          <Card className="dark:bg-gray-800/40 shadow-lg shadow-gray-800/60 duration-200 hover:shadow-light-blue-800 hover:shadow-lg basis-1/2 xl:basis-auto grow">
            <CardBody>
              <Typography
                as="h3"
                variant="h4"
                className="uppercase flex items-center gap-2 mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-light-blue-500 to-white"
              >
                <IoSchool className="text-light-blue-400 bg-gray-700/90 p-1 rounded-lg text-3xl" />
                EDUCATION
              </Typography>
              <Typography as="p" className="text-gray-400 font-medium">
                A First Year Computer Science Major student at Universitas Islam
                Negeri Syarif Hidayatullah Jakarta.
              </Typography>
            </CardBody>
            <CardFooter divider className="py-3 border-gray-600 text-gray-500">
              <Typography variant="small" className="text-right">
                EST. 2022 - 2026
              </Typography>
            </CardFooter>
          </Card>

          <Card className="dark:bg-gray-800/40 shadow-lg shadow-gray-800/60 duration-200 hover:shadow-pink-500 hover:shadow-lg basis-1/2 xl:basis-auto grow">
            <CardBody>
              <Typography
                as="h3"
                variant="h4"
                className="uppercase flex items-center gap-2 mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-pink-100"
              >
                <FaGoogle className="text-pink-300 bg-gray-700/90 p-1 rounded-lg text-3xl" />
                ACTIVITY
              </Typography>
              <Typography as="p" className="text-gray-400 font-medium">
                An active Member of Google Developer Students Club at
                Universitas Islam Negeri Syarif Hidayatullah Jakarta.
              </Typography>
            </CardBody>
            <CardFooter divider className="py-3 border-gray-600 text-gray-500">
              <Typography variant="small" className="text-right">
                EST. 2022 - 2023
              </Typography>
            </CardFooter>
          </Card>
        </aside>

        {/* transition from profile to projects */}
        <Line className="scale-y-[4] bg-gradient-to-b from-cyan-300/40 to-green-300/40 absolute left-1/2 -translate-x-1/2 bottom-[-145px] z-30" />
      </div>
    </section>
  );
}
