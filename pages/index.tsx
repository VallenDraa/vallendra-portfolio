import Hero from "../components/Main/Hero/Hero";
import Profile from "../components/Main/Profile/Profile";
import TopPicksSection from "../components/Main/ProjectTopPicks/TopPicksSection";
import Redirect from "../components/Main/Redirect/Redirect";
import Head from "next/head";
import SiteFooter from "../components/SiteFooter";

const MainPage = () => {
  return (
    <>
      <Head>
        <title>VallenDra | Home</title>
      </Head>

      {/* hero section */}
      <header className="relative z-30">
        <Hero />
      </header>
      <main>
        <Profile />
        <TopPicksSection />
        <Redirect />
      </main>
      <SiteFooter />
    </>
  );
};

export default MainPage;
