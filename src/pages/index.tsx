import Hero from "../components/Home/Hero/Hero";
import Profile from "../components/Home/Profile/Profile";
import TopPicksSection from "../components/Home/ProjectTopPicks/TopPicksSection";
import Redirect from "../components/Home/Redirect/Redirect";
import Head from "next/head";
import SiteFooter from "../components/SiteFooter";

export default function Home() {
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
}
