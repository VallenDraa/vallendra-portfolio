import FloatingSquares from "../FloatingSquares/FloatingSquares";
import Hero from "../Hero/Hero";
import NavbarComponent from "../Navbar/Navbar";
import Profile from "./Profile/Profile";
import Projects from "./Projects/Projects";
import Services from "./Services/Services";

const Main = () => {
  return (
    <section
      aria-label="main-window"
      className="min-h-screen breathing flex flex-col"
      style={{ backgroundSize: "1000% 1000%" }}
    >
      <FloatingSquares />
      {/* hero section */}
      <header className="basis-[10%] relative z-20">
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

export default Main;
