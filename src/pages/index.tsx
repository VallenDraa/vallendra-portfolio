import Hero from "../components/Home/Hero/Hero";
import Profile from "../components/Home/Profile/Profile";
import TopPicksSection from "../components/Home/ProjectTopPicks/TopPicksSection";
import Redirect from "../components/Home/Redirect/Redirect";
import Head from "next/head";
import SiteFooter from "../components/SiteFooter";
import DashboardControllerProvider from "../context/TopPicksDashboardControllerCP";
import { GetStaticProps } from "next";
import { Project } from "../interfaces/project.interface";
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
        <DashboardControllerProvider>
          <TopPicksSection topPickedProjects={topPickedProjects} />
        </DashboardControllerProvider>
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
