import Hero from "./Hero/Hero";
import NavbarComponent from "../Navbar/Navbar";
import Profile from "./Profile/Profile";
import ProjectsSection from "./Projects/ProjectsSection";
import { IconButton } from "@material-tailwind/react";
import { VscTriangleUp } from "react-icons/vsc";
import { useState } from "react";

const MainPage = () => {
  const [isGoUpBtnActive, setIsGoUpBtnActive] = useState<boolean>(false);

  return (
    <main className="min-h-screen flex flex-col">
      <NavbarComponent />
      {/* hero section */}
      <header className="basis-[10%] relative z-20 bg-gradient bg-main-gradient animate-main-gradient">
        <Hero />
      </header>
      <main>
        <Profile />
        <ProjectsSection />
      </main>
      <footer></footer>

      {/* back to top button */}
      <IconButton
        onMouseEnter={() => setIsGoUpBtnActive(true)}
        onMouseLeave={() => setIsGoUpBtnActive(false)}
        size="lg"
        ripple={false}
        variant="filled"
        color="deep-purple"
        className={`fixed bottom-5 z-50 right-10 opacity-30 hover:opacity-100`}
      >
        <a href="#home" className="w-full h-full">
          <VscTriangleUp className="text-xl" />
        </a>
      </IconButton>
    </main>
  );
};

export default MainPage;
