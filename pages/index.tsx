import Hero from "../components/Main/Hero/Hero";
import Profile from "../components/Main/Profile/Profile";
import ProjectsSection from "../components/Main/Projects/ProjectsSection";
import Redirect from "../components/Main/Redirect/Redirect";
import Head from "next/head";
import SiteFooter from "../components/Main/SiteFooter/SiteFooter";

const MainPage = () => {
  return (
    <>
      <Head>
        <title>VallenDra | Front-End Developer</title>
      </Head>

      {/* hero section */}
      <header className="basis-[10%] relative z-20 bg-gradient bg-main-gradient animate-main-gradient">
        <Hero />
      </header>
      <main>
        <Profile />
        <ProjectsSection />
        <Redirect />
      </main>
      <SiteFooter />
    </>
  );
};

export default MainPage;
