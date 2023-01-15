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
      className="relative z-10 pb-32 dark:bg-gray-900"
    >
      {/* main content */}
      <div className="relative mx-auto flex max-w-screen-xl flex-col gap-8 px-8 pt-16 lg:px-0 xl:flex-row">
        {/* left side */}
        <div className="relative mt-4 flex flex-col xl:basis-2/3">
          {/* blur */}
          <div className="absolute left-1/4 top-1/4 h-80 w-80 -translate-x-1/4 -translate-y-1/4 rotate-12 skew-x-6 scale-110 rounded-full bg-gradient-to-br from-indigo-700 to-pink-700 opacity-50 blur-3xl transition-transform duration-200 md:top-1/2 md:-translate-y-1/2"></div>

          <header className="gradient-underline gradient-underline--indigo-to-pink relative flex w-fit items-center gap-1">
            <Typography
              as="h2"
              variant="h2"
              className={`relative z-40 animate-breathing bg-gradient-to-r from-indigo-300 to-pink-200 bg-gradient bg-clip-text text-start text-5xl font-bold capitalize text-transparent`}
            >
              Hello World
            </Typography>
            <span className="text-5xl">👋</span>
          </header>

          {/* small paragraph and tech stack */}
          <footer className="relative z-40 mt-5 flex grow flex-col gap-5">
            {/* small paragraph about me */}
            <div className="mb-8 xl:mb-0 xl:basis-2/3">
              <Typography
                as="p"
                variant="paragraph"
                className="pl-0.5 text-justify font-medium leading-loose text-white/80"
              >
                My name is Jestine Vallendra Dwi Putra, a Front-End Developer.
                With a year of experience in the field, I have gained a strong
                foundation in web technologies and have had the opportunity to
                work on numerous personal projects. I am constantly striving to
                learn and improve my skills, and also excited to thrive as a
                Front-End Developer.
              </Typography>
            </div>
            <Card className="rounded-md shadow-md shadow-gray-800/60 duration-200 hover:shadow-lg hover:shadow-green-800 dark:bg-gray-800/40">
              <CardBody>
                <Typography
                  as="h3"
                  variant="h3"
                  className="mb-2 flex items-center gap-2 bg-gradient-to-tr from-green-500 to-white bg-clip-text text-2xl font-bold uppercase text-transparent md:text-3xl"
                >
                  <IoCodeSlash className="rounded-lg bg-gray-700/90 p-1 text-3xl text-green-400" />
                  Technologies
                </Typography>
                <Typography as="p" className="font-medium text-gray-400">
                  Languages and frameworks that I use for projects and college !
                </Typography>
                <ul className="relative mt-4 flex items-center gap-1 overflow-auto">
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
                className="border-gray-600 py-3 text-gray-500"
              >
                <Typography variant="small" className="text-right">
                  And Learning More 😎
                </Typography>
              </CardFooter>
            </Card>
          </footer>
        </div>

        {/* right side */}
        <aside className="flex flex-col gap-8 md:flex-row xl:mt-6 xl:basis-1/3 xl:flex-col">
          <Card className="grow basis-1/2 rounded-md shadow-md shadow-gray-800/60 duration-200 hover:shadow-lg hover:shadow-light-blue-800 dark:bg-gray-800/40 xl:basis-auto">
            <CardBody>
              <Typography
                as="h3"
                variant="h4"
                className="mb-2 flex items-center gap-2 bg-gradient-to-tr from-light-blue-500 to-white bg-clip-text font-bold uppercase text-transparent"
              >
                <IoSchool className="rounded-lg bg-gray-700/90 p-1 text-3xl text-light-blue-400" />
                EDUCATION
              </Typography>
              <Typography as="p" className="font-medium text-gray-400">
                A First Year Computer Science Major student at Universitas Islam
                Negeri Syarif Hidayatullah Jakarta.
              </Typography>
            </CardBody>
            <CardFooter divider className="border-gray-600 py-3 text-gray-500">
              <Typography variant="small" className="text-right">
                EST. 2022 - 2026
              </Typography>
            </CardFooter>
          </Card>

          <Card className="grow basis-1/2 rounded-md shadow-md shadow-gray-800/60 duration-200 hover:shadow-lg hover:shadow-pink-500 dark:bg-gray-800/40 xl:basis-auto">
            <CardBody>
              <Typography
                as="h3"
                variant="h4"
                className="mb-2 flex items-center gap-2 bg-gradient-to-br from-pink-300 to-pink-100 bg-clip-text font-bold uppercase text-transparent"
              >
                <FaGoogle className="rounded-lg bg-gray-700/90 p-1 text-3xl text-pink-300" />
                ACTIVITY
              </Typography>
              <Typography as="p" className="font-medium text-gray-400">
                An active Member of Google Developer Students Club at
                Universitas Islam Negeri Syarif Hidayatullah Jakarta.
              </Typography>
            </CardBody>
            <CardFooter divider className="border-gray-600 py-3 text-gray-500">
              <Typography variant="small" className="text-right">
                EST. 2022 - 2023
              </Typography>
            </CardFooter>
          </Card>
        </aside>

        {/* transition from profile to projects */}
        <Line className="absolute left-1/2 bottom-[-145px] z-30 -translate-x-1/2 scale-y-[4] bg-gradient-to-b from-cyan-300/40 to-green-300/40" />
      </div>
    </section>
  );
}
