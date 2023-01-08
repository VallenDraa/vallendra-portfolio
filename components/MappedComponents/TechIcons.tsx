import {
  SiC,
  SiCsharp,
  SiCss3,
  SiHtml5,
  SiJava,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiReact,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
} from "react-icons/si";
import { technologies } from "../../types/types";

const techIcons: { [key in technologies]: React.ReactElement | null } = {
  html: (
    <SiHtml5 className="transition-colors duration-200 text-white/50 group-hover:text-deep-orange-400 hover:text-deep-orange-400" />
  ),
  css: (
    <SiCss3 className="transition-colors duration-200 text-white/50 group-hover:text-blue-600 hover:text-blue-600" />
  ),
  "tailwind css": (
    <SiTailwindcss className="transition-colors duration-200 text-white/50 group-hover:text-cyan-400 hover:text-cyan-400" />
  ),
  javascript: (
    <SiJavascript className="transition-colors duration-200 text-white/50 group-hover:text-yellow-600 hover:text-yellow-600" />
  ),
  typescript: (
    <SiTypescript className="transition-colors duration-200 text-white/50 group-hover:text-blue-700 hover:text-blue-700" />
  ),
  react: (
    <SiReact className="transition-colors duration-200 text-white/50 group-hover:text-light-blue-200 hover:text-light-blue-200" />
  ),
  "node.js": (
    <SiNodedotjs className="transition-colors duration-200 text-white/50 group-hover:text-green-400 hover:text-green-400" />
  ),
  mongodb: (
    <SiMongodb className="transition-colors duration-200 text-white/50 group-hover:text-green-600 hover:text-green-600" />
  ),
  "socket.io": (
    <SiSocketdotio className="transition-colors duration-200 text-white/50 group-hover:text-white hover:text-white" />
  ),
  c: (
    <SiC className="transition-colors duration-200 text-white/50 group-hover:text-blue-700 hover:text-blue-700" />
  ),
  "c#": (
    <SiCsharp className="transition-colors duration-200 text-white/50 group-hover:text-purple-400 hover:text-purple-400" />
  ),
  unity: (
    <SiUnity className="transition-colors duration-200 text-white/50 group-hover:text-gray-300 hover:text-gray-300" />
  ),
  java: (
    <SiJava className="transition-colors duration-200 text-white/50 group-hover:text-red-700 hover:text-red-700" />
  ),
  ejs: null,
};

export default techIcons;
