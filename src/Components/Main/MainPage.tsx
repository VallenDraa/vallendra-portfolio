import Hero from "./Hero/Hero";
import NavbarComponent from "../Navbar/Navbar";
import Profile from "./Profile/Profile";
import Projects from "./Projects/Projects";
import { IconButton } from "@material-tailwind/react";
import { VscTriangleUp } from "react-icons/vsc";

const MainPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <NavbarComponent />
      {/* hero section */}
      <header className="basis-[10%] relative z-20 bg-gradient bg-main-gradient animate-main-gradient">
        <Hero />
      </header>
      <main>
        <Profile />
        <Projects />
      </main>
      <footer></footer>

      {/* back to top button */}
      <IconButton
        size="lg"
        ripple={false}
        variant="filled"
        color="deep-purple"
        className="fixed bottom-5 right-10 z-50"
      >
        <a href="#home" className="w-full h-full">
          <VscTriangleUp className="text-xl" />
        </a>
      </IconButton>
    </main>
  );
};

export default MainPage;
