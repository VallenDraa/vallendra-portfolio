import {
  SiC,
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import TechListItem from "../Main/Profile/TechListItem";

const TECHS: { [key: string]: JSX.Element } = {
  html: (
    <TechListItem
      Icon={<SiHtml5 className="text-deep-orange-400 text-5xl" />}
      text="HTML 5"
    />
  ),
  css: (
    <TechListItem
      Icon={<SiCss3 className="text-blue-600 text-5xl" />}
      text="CSS 3"
    />
  ),
  "tailwind css": (
    <TechListItem
      Icon={<SiTailwindcss className="text-cyan-400 text-5xl" />}
      text="Tailwind CSS"
    />
  ),
  javascript: (
    <TechListItem
      Icon={<SiJavascript className="text-yellow-600 text-5xl" />}
      text="Javascript"
    />
  ),
  typescript: (
    <TechListItem
      Icon={<SiTypescript className="text-blue-700 text-5xl" />}
      text="Typescript"
    />
  ),
  react: (
    <TechListItem
      Icon={<SiReact className="text-light-blue-200 text-5xl" />}
      text="React"
    />
  ),

  "node.js": (
    <TechListItem
      Icon={<SiNodedotjs className="text-green-400 text-5xl" />}
      text="Node.js"
    />
  ),
  mongodb: (
    <TechListItem
      Icon={<SiMongodb className="text-green-600 text-5xl" />}
      text="MongoDB"
    />
  ),
  "socket.io": (
    <TechListItem
      Icon={<SiSocketdotio className="text-white text-5xl" />}
      text="Socket.IO"
    />
  ),
  c: (
    <TechListItem Icon={<SiC className="text-blue-700 text-5xl" />} text="C" />
  ),
};

export default TECHS;
