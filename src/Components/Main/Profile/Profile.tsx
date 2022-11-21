import {
  Typography,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { FC } from "react";
import Line from "../../Line/Line";
import { IoSchool, IoCodeSlash } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiReact,
  SiC,
} from "react-icons/si";
import TechListItem from "./TechListItem";
import TECHS from "../../MappedComponents/Techs";

const Profile: FC = () => {
  return (
    <section
      aria-label="profile-section"
      id="profile"
      className="bg-gray-900 relative z-10 pb-32"
    >
      {/* main content */}
      <div className="max-w-screen-xl mx-auto pt-16 relative flex gap-10">
        <Line className="scale-y-[18.8] bg-indigo-300/60 absolute right-[673px] top-1 z-20 rotate-90" />
        <Line className="scale-y-75 bg-indigo-300/60 absolute left-[91px] top-5 z-20" />

        {/* left side */}
        <div className="basis-2/3 mt-4 flex flex-col">
          <header className="relative">
            <Typography
              as="h2"
              variant="h2"
              className="animate-breathing bg-gradient w-max text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-pink-200 capitalize"
            >
              Hello World !
            </Typography>
            <Line className="animate-breathing bg-gradient bg-gradient-to-r from-indigo-300 to-pink-200 rotate-90 scale-y-[5] left-[103px] -bottom-6 absolute" />
          </header>

          {/* small paragraph and tech stack */}
          <footer className="mt-5 flex flex-col grow gap-5">
            {/* small paragraph about me */}
            <div className="basis-2/3">
              <Typography
                as="p"
                variant="paragraph"
                className="text-gray-300 font-medium leading-loose pl-0.5"
              >
                My Name is Jestine Vallendra Dwi Putra, an upcoming Full-Stack
                Web Developer. I've been pursuing the field since 2021 which has
                made me able to gain some valuable experiences on web
                technologies.
              </Typography>
            </div>
            <Card className="bg-gray-800/40 shadow-md shadow-gray-800/60 duration-200 hover:shadow-green-800 hover:shadow-lg">
              <CardBody>
                <Typography
                  as="h3"
                  variant="h3"
                  className="uppercase flex items-center gap-2 mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-green-500 to-white"
                >
                  <IoCodeSlash className="text-green-400 bg-gray-700/90 p-1 rounded-lg text-3xl" />
                  Technologies
                </Typography>
                <Typography as="p" className="text-gray-400 font-medium">
                  Languanges / Frameworks That I Use For Projects And College !
                </Typography>
                <ul className="flex items-center mt-4 relative gap-1">
                  {TECHS.html}
                  {TECHS.css}
                  {TECHS["tailwind css"]}
                  {TECHS.javascript}
                  {TECHS.typescript}
                  {TECHS["node.js"]}
                  {TECHS.react}
                  {TECHS.c}
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
        <aside className="flex flex-col gap-10 basis-1/3 mt-6">
          <Card className="bg-gray-800/40 shadow-md shadow-gray-800/60 duration-200 hover:shadow-light-blue-800 hover:shadow-lg grow">
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
                A First Year Computer Science Major at
                <strong className="text-gray-300">
                  {" "}
                  UIN Syarif Hidayatullah Jakarta.
                </strong>
              </Typography>
            </CardBody>
            <CardFooter divider className="py-3 border-gray-600 text-gray-500">
              <Typography variant="small" className="text-right">
                EST. 2022 - 2026
              </Typography>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800/40 shadow-md shadow-gray-800/60 duration-200 hover:shadow-pink-500 hover:shadow-lg grow">
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
                A Member of{" "}
                <strong className="text-gray-300">
                  Google Developer Students Club
                </strong>{" "}
                at UIN Syarif Hidayatullah Jakarta.
              </Typography>
            </CardBody>
            <CardFooter divider className="py-3 border-gray-600 text-gray-500">
              <Typography variant="small" className="text-right">
                EST. 2022 - 2023
              </Typography>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </section>
  );
};

export default Profile;
