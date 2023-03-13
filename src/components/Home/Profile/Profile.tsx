import { IoSchool, IoCodeSlash } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa";
import R from "react";
import Observe from "components/Observe";
import fadeIn from "utils/client/helpers/animateOnObserved";
import StyledScrollbar from "components/StyledComponents/StyledScrollbar";
import techsWithTooltip, {
  myTechStack,
} from "components/MappedComponents/TechsWithTooltip";
import SectionHeading from "components/Typography/SectionHeading";

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
      className="relative z-10 scroll-m-20 space-y-8 bg-indigo-50 dark:bg-zinc-900"
    >
      <div
        id="skip-to-content"
        className="layout relative mx-auto flex scroll-m-20 flex-col gap-8 overflow-y-hidden pt-8 pb-16 xl:flex-row"
      >
        {/* left side */}
        <div className="relative mt-4 flex flex-col xl:basis-2/3">
          <SectionHeading
            title="Profile"
            animation={{ title: "animate-fade-in-top" }}
            duration={{ title: 0 }}
            willFade
          />

          {/* small paragraph and tech stack */}
          <div className="relative z-40 mt-2 flex grow flex-col gap-5">
            {/* small paragraph about me */}
            <Observe
              freezeOnceVisible
              onEnter={ref => fadeIn(ref, "animate-fade-in-top", 100)}
            >
              <div className="opacity-0 xl:mb-0 xl:basis-2/3">
                <p className="pl-0.5 text-justify font-normal leading-loose text-zinc-700 dark:text-zinc-300">
                  My name is Jestine Vallendra Dwi Putra. I started my coding
                  journey in Game Development using Unity but soon diverted to
                  Web Dev which I still pursue to this day. I mainly use React
                  when developing and I look forward to improving my skill as a
                  Front-End Developer.
                </p>
              </div>
            </Observe>

            {/* techs */}
            <Observe
              freezeOnceVisible
              onEnter={ref => {
                setTechCardIsVisible(true);
                fadeIn(ref, "animate-fade-in-top", 200);
              }}
            >
              <div className="card-colors rounded-md opacity-0 shadow-md">
                <div className="p-6">
                  <h2 className="mb-2 flex items-center gap-2 bg-gradient-to-tr from-green-500 to-green-300 bg-clip-text text-2xl uppercase text-transparent dark:bg-gradient-to-tr dark:from-green-500 dark:to-white md:text-3xl">
                    <IoCodeSlash className="rounded-lg bg-indigo-100 p-1 text-3xl text-green-400 dark:bg-zinc-700/90" />
                    Technologies
                  </h2>

                  <p className="mb-1 font-normal text-zinc-600 dark:text-zinc-400">
                    Languages and frameworks that I use for projects and college
                    !
                  </p>

                  <StyledScrollbar
                    autoHeight
                    autoHeightMin="100%"
                    autoHeightMax="100%"
                    renderView={props => (
                      <ul {...props} className="flex md:!overflow-auto" />
                    )}
                  >
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
                            {techsWithTooltip[key]()}
                          </li>
                        </Observe>
                      ))}
                  </StyledScrollbar>
                </div>
                <div className="gradient-underline gradient-underline--primary relative px-6 py-3 before:top-0">
                  <span className="block text-right text-sm text-zinc-600 dark:text-zinc-400">
                    And Learning More
                  </span>
                </div>
              </div>
            </Observe>
          </div>
        </div>

        {/* right side */}
        <aside className="flex flex-col gap-8 md:flex-row xl:mt-6 xl:basis-1/3 xl:flex-col">
          {/* education */}
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 300)}
          >
            <div className="card-colors grow basis-1/2 rounded-md opacity-0 shadow-md xl:basis-auto">
              <div className="p-6">
                <h3 className="mb-2 flex items-center gap-2 bg-gradient-to-tr from-cyan-500 to-cyan-300 bg-clip-text text-xl uppercase text-transparent md:text-2xl">
                  <IoSchool className="rounded-lg bg-indigo-100 p-1 text-3xl text-cyan-400 dark:bg-zinc-700/90" />
                  EDUCATION
                </h3>
                <p className="font-normal text-zinc-600 dark:text-zinc-400">
                  Majoring in Informatics at UIN Syarif Hidayatullah Jakarta.
                </p>
              </div>
              <div className="gradient-underline gradient-underline--primary relative px-6 py-3 before:top-0">
                <span className="block text-right text-sm text-zinc-600 dark:text-zinc-400">
                  2022 - 2026
                </span>
              </div>
            </div>
          </Observe>

          {/* activity */}
          <Observe
            freezeOnceVisible
            onEnter={ref => fadeIn(ref, "animate-fade-in-top", 400)}
          >
            <div className="card-colors grow basis-1/2 rounded-md opacity-0 shadow-md xl:basis-auto">
              <div className="p-6">
                <h3 className="mb-2 flex items-center gap-2 bg-gradient-to-br from-pink-500 to-pink-300 bg-clip-text text-xl uppercase text-transparent md:text-2xl">
                  <FaGoogle className="rounded-lg bg-indigo-100 p-1 text-3xl text-pink-500 dark:bg-zinc-700/90" />
                  ACTIVITY
                </h3>
                <p className="font-normal text-zinc-600 dark:text-zinc-400">
                  An active member of GDSC UIN Syarif Hidayatullah Jakarta.
                </p>
              </div>
              <div className="gradient-underline gradient-underline--primary relative px-6 py-3 before:top-0">
                <span className="block text-right text-sm text-zinc-600 dark:text-zinc-400">
                  2022 - 2023
                </span>
              </div>
            </div>
          </Observe>
        </aside>
      </div>
    </section>
  );
}
