import Hero from "../components/Home/Hero/Hero";
import Profile from "../components/Home/Profile/Profile";
import Redirect from "../components/Home/Redirect/Redirect";
import Head from "next/head";
import SiteFooter from "../components/SiteFooter";
import { Project } from "../interfaces/project.interface";
import Quotes from "../components/Home/ProjectTopPicks/Quote";
import NewTopPickSection from "../components/Home/ProjectTopPicks/NewTopPickSection";
import { GetStaticProps } from "next";
import { getTopPickedProjects } from "../server/service/projects/projects.service";

interface Props {
  topPickedProjects: Project[];
}

export default function Home({ topPickedProjects }: Props) {
  return (
    <>
      <Head>
        <title>VallenDra | Home</title>
      </Head>

      {/* hero section */}
      <header className="fade-bottom relative z-30 after:bottom-0 after:z-0">
        <Hero />
      </header>
      <main>
        <Profile />
        <section aria-label="quote-section" id="quote" className="pt-12 pb-20">
          <div className="mx-0 sm:mx-4 xl:mx-0">
            <Quotes />
          </div>
        </section>
        <NewTopPickSection topPickedProjects={topPickedProjects} />
        <Redirect />
      </main>
      <SiteFooter />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await getTopPickedProjects();

  if (res) {
    const topPickedProjects = JSON.parse(res) as Project[];

    return { props: { topPickedProjects } };
  } else {
    return { notFound: true };
  }
};
