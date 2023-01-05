import { ReactNode, useState } from "react";
import NavbarComponent from "../Navbar/Navbar";
import { IconButton } from "@material-tailwind/react";
import { VscTriangleUp } from "react-icons/vsc";

export default function Layout({ children }: { children: ReactNode }) {
  const [isGoUpBtnActive, setIsGoUpBtnActive] = useState(false);

  return (
    <div className="min-h-screen flex flex-col dark">
      <NavbarComponent />
      {children}

      {/* back to top button */}
      <IconButton
        onMouseEnter={() => setIsGoUpBtnActive(true)}
        onMouseLeave={() => setIsGoUpBtnActive(false)}
        size="lg"
        ripple={false}
        variant="filled"
        color="deep-purple"
        className={`fixed bottom-5 z-40 right-10 opacity-30 hover:opacity-100`}
      >
        <a href="#home" className="w-full h-full">
          <VscTriangleUp className="text-xl" />
        </a>
      </IconButton>
    </div>
  );
}
