import Hero from "../components/Home/Hero/Hero";
import Profile from "../components/Home/Profile/Profile";
import Redirect from "../components/Home/Redirect/Redirect";
import SiteFooter from "../components/SiteFooter";
import Project from "../interfaces/project.interface";
import Quotes from "../components/Home/ProjectTopPicks/Quote";
import { GetStaticProps } from "next";
import { getTopPickedProjects } from "../server/service/projects/projects.service";
import TopPickSection from "../components/Home/ProjectTopPicks/TopPickSection";
import { JSONSerialize } from "../utils/server/serialize";
import Seo from "../seo/Seo";
import defaultSeo from "../seo/default.seo";

interface Props {
  topPickedProjects: Project[];
}

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
        <section aria-label="quote-section" id="quote" className="pt-12 pb-20">
          <div className="mx-0 sm:mx-4 xl:mx-0">
            <Quotes />
          </div>
        </section>
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
