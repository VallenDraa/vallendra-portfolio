import {
  Typography,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { IoSchool, IoCodeSlash } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import R from "react";
import TechsWithTooltip, {
  myTechStack,
} from "../../MappedComponents/TechsWithTooltip";
import Observe from "../../Observe";
import fadeIn from "../../../utils/client/helpers/animateOnObserved";

export default function Profile() {
  const animationTechDelay = R.useMemo(() => {
    let delay = 0;
    const delayArray: number[] = [];

    for (let i = 0; i < myTechStack.length; i += 1) {
      delayArray[i] = delay;

      delay += 75;
    }

    return delayArray;
  }, []);
  const [techCardIsVisible, setTechCardIsVisible] = R.useState(false);

  return (
    <section
      aria-label="profile-section"
      id="profile"
      className="relative z-10 space-y-8 bg-indigo-50 dark:bg-gray-900"
    >
      <div className="relative mx-auto flex max-w-screen-xl flex-col gap-8 px-8 py-16 overflow-x-hidden xl:flex-row 2xl:px-2">
        {/* left side */}
        <div className="relative mt-4 flex flex-col xl:basis-2/3">
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-left", 0)}
          >
            <header className="gradient-underline gradient-underline--primary relative flex w-fit items-center gap-1 opacity-0">
              <Typography
                as="h2"
                variant="h2"
                className="primary-gradient relative z-40 animate-breathing bg-gradient-to-r bg-gradient bg-clip-text text-start text-5xl font-bold capitalize text-transparent"
              >
                Hello World
              </Typography>
              <span className="text-5xl">👋</span>
            </header>
          </Observe>

          {/* small paragraph and tech stack */}
          <footer className="relative z-40 mt-5 flex grow flex-col gap-5">
            {/* small paragraph about me */}
            <Observe
              freezeOnceVisible
              onEnter={ref => fadeIn(ref, "animate-fade-in-left", 0)}
            >
              <div className="mb-8 opacity-0 xl:mb-0 xl:basis-2/3">
                <Typography
                  as="p"
                  variant="paragraph"
                  className="pl-0.5 text-justify font-normal leading-loose text-indigo-700/80 dark:text-gray-300"
                >
                  My name is Jestine Vallendra Dwi Putra. I started my coding
                  journey in Game Development using Unity but soon realized that
                  I have a potato PC, so I diverted my attention to Web
                  Development. I mainly use React and its tech stacks when
                  making stuff now.
                </Typography>
              </div>
            </Observe>

            {/* techs */}
            <Observe
              freezeOnceVisible
              onEnter={ref => {
                setTechCardIsVisible(true);
                fadeIn(ref, "animate-fade-in-left", 200);
              }}
            >
              <Card className="indigo-pink-gradient card-colors rounded-md opacity-0 shadow-md duration-200">
                <CardBody>
                  <Typography
                    as="h3"
                    variant="h3"
                    className="mb-2 flex items-center gap-2 bg-gradient-to-tr from-green-500 to-green-200 bg-clip-text text-2xl font-bold uppercase text-transparent dark:bg-gradient-to-tr dark:from-green-500 dark:to-white md:text-3xl"
                  >
                    <IoCodeSlash className="icon-with-bg-colors rounded-lg p-1 text-3xl text-green-400" />
                    Technologies
                  </Typography>
                  <Typography
                    as="p"
                    variant="paragraph"
                    className="font-normal text-indigo-600 dark:text-gray-400"
                  >
                    Languages and frameworks that I use for projects and college
                    !
                  </Typography>
                  <ul className="scrollbar-kece relative mt-4 flex items-center gap-1 overflow-x-auto overflow-y-hidden">
                    {techCardIsVisible &&
                      myTechStack.map((key, i) => (
                        <Observe
                          key={key}
                          freezeOnceVisible
                          onEnter={ref =>
                            fadeIn(
                              ref,
                              "animate-fade-in-left",
                              animationTechDelay[i],
                            )
                          }
                        >
                          <li className="opacity-0">
                            {TechsWithTooltip[key]()}
                          </li>
                        </Observe>
                      ))}
                  </ul>
                </CardBody>
                <CardFooter
                  divider
                  className="border-indigo-400 py-3 text-indigo-500 dark:border-gray-600 dark:text-gray-500"
                >
                  <Typography variant="small" className="text-right">
                    And Learning More 😎
                  </Typography>
                </CardFooter>
              </Card>
            </Observe>
          </footer>
        </div>

        {/* right side */}
        <aside className="flex flex-col gap-8 md:flex-row xl:mt-6 xl:basis-1/3 xl:flex-col">
          {/* education */}
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-right", 300)}
          >
            <Card className="card-colors grow basis-1/2 rounded-md opacity-0 shadow-md duration-200 xl:basis-auto">
              <CardBody>
                <Typography
                  as="h3"
                  variant="h4"
                  className="mb-2 flex items-center gap-2 bg-gradient-to-tr from-light-blue-500 to-light-blue-200 bg-clip-text font-bold uppercase text-transparent"
                >
                  <IoSchool className="icon-with-bg-colors rounded-lg p-1 text-3xl text-light-blue-400" />
                  EDUCATION
                </Typography>
                <Typography
                  variant="paragraph"
                  as="p"
                  className="font-normal text-indigo-600 dark:text-gray-400"
                >
                  Majoring in Informatics / Computer Science at UIN Syarif
                  Hidayatullah Jakarta.
                </Typography>
              </CardBody>
              <CardFooter
                divider
                className="border-indigo-400 py-3 text-indigo-500 dark:border-gray-600 dark:text-gray-500"
              >
                <Typography variant="small" className="text-right">
                  EST. 2022 - 2026
                </Typography>
              </CardFooter>
            </Card>
          </Observe>

          {/* activity */}
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-right", 300)}
          >
            <Card className="card-colors grow basis-1/2 rounded-md opacity-0 shadow-md duration-200 xl:basis-auto">
              <CardBody>
                <Typography
                  as="h3"
                  variant="h4"
                  className="mb-2 flex items-center gap-2 bg-gradient-to-br from-pink-300 to-pink-100 bg-clip-text font-bold uppercase text-transparent"
                >
                  <FaGoogle className="icon-with-bg-colors rounded-lg p-1 text-3xl text-pink-300" />
                  ACTIVITY
                </Typography>
                <Typography
                  variant="paragraph"
                  as="p"
                  className="font-normal text-indigo-600 dark:text-gray-400"
                >
                  An active member of Google Developer Students Club UIN Syarif
                  Hidayatullah Jakarta.
                </Typography>
              </CardBody>
              <CardFooter
                divider
                className="border-indigo-400 py-3 text-indigo-500 dark:border-gray-600 dark:text-gray-500"
              >
                <Typography variant="small" className="text-right">
                  EST. 2022 - 2023
                </Typography>
              </CardFooter>
            </Card>
          </Observe>
        </aside>
      </div>
    </section>
  );
}
