import FloatingSquares from "../FloatingSquares/FloatingSquares";
import Hero from "./Hero/Hero";
import NavbarComponent from "../Navbar/Navbar";
import Profile from "./Profile/Profile";
import Projects from "./Projects/Projects";
import Services from "./Services/Services";

const MainPage = () => {
  return (
    <section aria-label="main-window" className="min-h-screen  flex flex-col">
      <NavbarComponent />
      {/* hero section */}
      <header
        style={{ backgroundSize: "1000% 1000%" }}
        className="basis-[10%] relative z-20 breathing"
      >
        <Hero />
      </header>
      <main>
        <Profile />
        <Services />
        <Projects />
      </main>
      <footer></footer>
    </section>
  );
};

export default MainPage;
