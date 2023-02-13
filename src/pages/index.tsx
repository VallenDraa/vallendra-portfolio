import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Hero from "../components/Home/Hero/Hero";
import Project from "../interfaces/project.interface";
import { getTopPickedProjects } from "../server/service/projects/projects.service";
import TopPickSection from "../components/Home/ProjectTopPicks/TopPickSection";
import { JSONSerialize } from "../utils/server/serialize";
import Seo from "../seo/Seo";
import defaultSeo from "../seo/default.seo";

interface Props {
  topPickedProjects: Project[];
}

const Profile = dynamic(() => import("../components/Home/Profile/Profile"), {
  ssr: false,
  loading: () => (
    <div className="relative z-10 h-screen w-screen scroll-m-12 space-y-8 bg-indigo-50 dark:bg-gray-900" />
  ),
});

const SiteFooter = dynamic(() => import("../components/SiteFooter"), {
  ssr: false,
});
const Redirect = dynamic(() => import("../components/Home/Redirect/Redirect"), {
  ssr: false,
});

export default function Home({ topPickedProjects }: Props) {
  return (
    <>
      <Seo base={defaultSeo.base} og={defaultSeo.og} />

      {/* hero section */}
      <header className="fade-bottom relative z-30 after:bottom-0 after:z-0">
        <Hero />
      </header>
      <main>
        <Profile />
        <TopPickSection topPickedProjects={topPickedProjects} />
        <Redirect />
      </main>
      <SiteFooter />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const topPickedProjects = await JSONSerialize(await getTopPickedProjects());

  return { props: { topPickedProjects } };
};
