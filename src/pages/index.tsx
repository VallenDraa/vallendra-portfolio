import type { GetStaticProps } from "next/types";
import Hero from "components/Home/Hero/Hero";
import type Project from "interfaces/project.interface";
import TopPickSection from "components/Home/TopProjects/TopProjectsSection";
import { JSONSerialize } from "utils/server/serialize";
import Seo from "seo/Seo";
import defaultSeo from "seo/default.seo";
import { getTopPickedProjects } from "server/service/showcase/showcase.service";
import Profile from "components/Home/Profile/Profile";
import Redirect from "components/Home/Redirect/Redirect";

type HomeProps = {
  topPickedProjects: Project[];
};

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
