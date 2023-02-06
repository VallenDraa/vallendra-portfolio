import {
  SiC,
  SiCsharp,
  SiCss3,
  SiHtml5,
  SiJava,
  SiJavascript,
  SiJquery,
  SiMongodb,
  SiNextdotjs,
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
    <SiHtml5 className="text-white/50 transition-colors duration-200 group-hover:text-deep-orange-400 hover:text-deep-orange-400" />
  ),
  css: (
    <SiCss3 className="text-white/50 transition-colors duration-200 group-hover:text-blue-600 hover:text-blue-600" />
  ),
  "tailwind css": (
    <SiTailwindcss className="text-white/50 transition-colors duration-200 group-hover:text-cyan-400 hover:text-cyan-400" />
  ),
  javascript: (
    <SiJavascript className="text-white/50 transition-colors duration-200 group-hover:text-yellow-600 hover:text-yellow-600" />
  ),
  jquery: (
    <SiJquery className="text-white/50 transition-colors duration-200 group-hover:text-blue-700 hover:text-blue-700" />
  ),
  typescript: (
    <SiTypescript className="text-white/50 transition-colors duration-200 group-hover:text-blue-700 hover:text-blue-700" />
  ),
  react: (
    <SiReact className="text-white/50 transition-colors duration-200 group-hover:text-light-blue-200 hover:text-light-blue-200" />
  ),
  "node.js": (
    <SiNodedotjs className="text-white/50 transition-colors duration-200 group-hover:text-green-400 hover:text-green-400" />
  ),
  mongodb: (
    <SiMongodb className="text-white/50 transition-colors duration-200 group-hover:text-green-600 hover:text-green-600" />
  ),
  "socket.io": (
    <SiSocketdotio className="text-white/50 transition-colors duration-200 group-hover:text-white hover:text-white" />
  ),
  c: (
    <SiC className="text-white/50 transition-colors duration-200 group-hover:text-blue-700 hover:text-blue-700" />
  ),
  "c#": (
    <SiCsharp className="text-white/50 transition-colors duration-200 group-hover:text-purple-400 hover:text-purple-400" />
  ),
  unity: (
    <SiUnity className="text-white/50 transition-colors duration-200 group-hover:text-gray-300 hover:text-gray-300" />
  ),
  java: (
    <SiJava className="text-white/50 transition-colors duration-200 group-hover:text-red-700 hover:text-red-700" />
  ),
  "next.js": (
    <SiNextdotjs className="text-white/50 transition-colors duration-200 group-hover:text-gray-100 hover:text-gray-100" />
  ),
  ejs: null,
};

export default techIcons;
