import Hero from "../components/Home/Hero/Hero";
import Profile from "../components/Home/Profile/Profile";
import Redirect from "../components/Home/Redirect/Redirect";
import Head from "next/head";
import SiteFooter from "../components/SiteFooter";
import DashboardControllerProvider from "../context/TopPicksDashboardControllerCP";

export default function Home() {
  return (
    <>
      <Head>
        <title>VallenDra | Home</title>
      </Head>

      {/* hero section */}
      <header className="fade-bottom relative z-30 after:-bottom-2.5 after:z-0  xl:after:-bottom-3.5">
        <Hero />
      </header>
      <main>
        <Profile />

        <DashboardControllerProvider>
          <TopPicksSection />
        </DashboardControllerProvider>
        <Redirect />
      </main>
      <SiteFooter />
    </>
  );
}
