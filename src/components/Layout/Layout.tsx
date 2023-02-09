import { ReactNode } from "react";
import NavbarComponent from "../Navbar/Navbar";
import BreathingBackground from "../BreathingBackground";
import GoToTopBtn from "../GoToTopBtn";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <NavbarComponent />
      <BreathingBackground />

      {children}

      {/* back to top button */}
      <GoToTopBtn />
    </div>
  );
}
