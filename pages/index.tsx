import Hero from "../components/Main/Hero/Hero";
import NavbarComponent from "../components/Navbar/Navbar";
import Profile from "../components/Main/Profile/Profile";
import ProjectsSection from "../components/Main/Projects/ProjectsSection";
import Redirect from "../components/Main/Redirect/Redirect";

const MainPage = () => {
  return (
    <>
      {/* hero section */}
      <header className="basis-[10%] relative z-20 bg-gradient bg-main-gradient animate-main-gradient">
        <Hero />
      </header>
      <main>
        <Profile />
        <ProjectsSection />
        <Redirect />
      </main>
      <footer></footer>
    </>
  );
};

export default MainPage;
