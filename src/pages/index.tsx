import type { GetStaticProps } from "next/types";
import dynamic from "next/dynamic";
import Hero from "components/Home/Hero/Hero";
import type Project from "interfaces/project.interface";
import TopPickSection from "components/Home/TopProjects/TopProjectsSection";
import { JSONSerialize } from "utils/server/serialize";
import Seo from "seo/Seo";
import defaultSeo from "seo/default.seo";
import { getTopPickedProjects } from "server/service/showcase/showcase.service";

type HomeProps = {
  topPickedProjects: Project[];
};

const Profile = dynamic(() => import("components/Home/Profile/Profile"), {
  ssr: false,
  loading: () => (
    <div className="bg--indigo-50 relative z-10 h-screen w-screen scroll-m-12 space-y-8 dark:bg-zinc-900" />
  ),
});

const Redirect = dynamic(() => import("components/Home/Redirect/Redirect"), {
  ssr: false,
});

export default function Home({ topPickedProjects }: HomeProps) {
  return (
    <>
      <Seo {...defaultSeo} />

      {/* hero section */}
      <header className="fade-bottom relative z-30 after:bottom-0 after:z-0">
        <Hero />
      </header>
      <main>
        <Profile />
        <TopPickSection topPickedProjects={topPickedProjects} />
        <Redirect />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const topPickedProjects = await JSONSerialize(await getTopPickedProjects());

  return { props: { topPickedProjects } };
};
