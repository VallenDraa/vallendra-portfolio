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

const Profile: FC = () => {
  return (
    <section
      aria-label="profile-section"
      id="profile"
      className="bg-gray-900 relative z-10 pb-32"
    >
      {/* main content */}
      <div className="max-w-screen-xl mx-auto pt-16 relative flex gap-10">
        <Line className="scale-y-[18.8] bg-white/30 absolute right-[673px] top-1 z-20 rotate-90" />
        <Line className="scale-y-75 bg-white/30 absolute left-[91px] top-5 z-20" />

        {/* left side */}
        <div className="basis-2/3 mt-4 flex flex-col">
          <header className="relative">
            <Typography
              as="h2"
              variant="h2"
              className=" w-max text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-indigo-200 capitalize"
            >
              Hello World !
            </Typography>
            <Line className="bg-gradient-to-r from-indigo-100 to-indigo-300 rotate-90 scale-y-[5] left-[103px] -bottom-6 absolute" />
          </header>

          {/* small paragraph and tech stack */}
          <footer className="mt-9 flex flex-col grow gap-2">
            {/* small paragraph about me */}
            <div className="basis-2/3">
              <Typography
                as="p"
                variant="paragraph"
                className="text-gray-300 font-medium leading-loose"
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
                  variant="h4"
                  className="uppercase flex items-center gap-2 mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-green-500 to-white"
                >
                  <IoCodeSlash className="text-green-400 bg-gray-700/90 p-1 rounded-lg text-3xl" />
                  Technologies
                </Typography>
                <Typography as="p" className="text-gray-400 font-medium">
                  Languanges / Frameworks That I Use For Projects And College !
                </Typography>
                <ul className="flex items-center mt-4 relative gap-1">
                  <TechListItem
                    Icon={<SiHtml5 className="text-deep-orange-400 text-5xl" />}
                    text="HTML 5"
                  />
                  <TechListItem
                    Icon={<SiCss3 className="text-blue-600 text-5xl" />}
                    text="CSS 3"
                  />
                  <TechListItem
                    Icon={<SiTailwindcss className="text-cyan-400 text-5xl" />}
                    text="Tailwind CSS"
                  />
                  <TechListItem
                    Icon={<SiJavascript className="text-yellow-600 text-5xl" />}
                    text="Javascript"
                  />
                  <TechListItem
                    Icon={<SiTypescript className="text-blue-700 text-5xl" />}
                    text="Typescript"
                  />
                  <TechListItem
                    Icon={<SiReact className="text-light-blue-200 text-5xl" />}
                    text="React"
                  />
                  <TechListItem
                    Icon={<SiNodedotjs className="text-green-400 text-5xl" />}
                    text="Node.js"
                  />
                  <TechListItem
                    Icon={<SiC className="text-blue-700 text-5xl" />}
                    text="C"
                  />
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
          <Card className="bg-gray-800/40 shadow-md shadow-gray-800/60 duration-200 hover:shadow-light-blue-800 hover:shadow-lg">
            <CardBody>
              <Typography
                variant="h4"
                className="uppercase flex items-center gap-2 mb-2 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-light-blue-500 to-white"
              >
                <IoSchool className="text-light-blue-400 bg-gray-700/90 p-1 rounded-lg text-3xl" />
                EDUCATION
              </Typography>
              <Typography as="p" className="text-gray-400 font-medium">
                A Passionate First Year Computer Science Undergraduate Student
                at
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

          <Card className="bg-gray-800/40 shadow-md shadow-gray-800/60 duration-200 hover:shadow-pink-500 hover:shadow-lg">
            <CardBody>
              <Typography
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
