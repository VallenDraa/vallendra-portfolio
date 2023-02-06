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
import IconWithTooltip from "../IconWithTooltip";
import { technologies } from "../../types/types";

const techsWithTooltip: { [key in technologies]: React.ReactElement | null } = {
  html: (
    <IconWithTooltip
      icon={
        <SiHtml5 className="text-[2.3rem] text-deep-orange-500 dark:text-deep-orange-400" />
      }
      text="HTML 5"
    />
  ),
  css: (
    <IconWithTooltip
      icon={<SiCss3 className="text-[2.3rem] text-blue-600" />}
      text="CSS 3"
    />
  ),
  "tailwind css": (
    <IconWithTooltip
      icon={<SiTailwindcss className="text-[2.3rem] text-cyan-400" />}
      text="Tailwind CSS"
    />
  ),
  javascript: (
    <IconWithTooltip
      icon={
        <SiJavascript className="text-[2.3rem] text-yellow-600 dark:bg-transparent" />
      }
      text="Javascript"
    />
  ),
  jquery: (
    <IconWithTooltip
      icon={
        <SiJquery className="text-[2.3rem] text-blue-700 dark:bg-transparent" />
      }
      text="JQuery"
    />
  ),
  typescript: (
    <IconWithTooltip
      icon={<SiTypescript className="text-[2.3rem] text-blue-700" />}
      text="Typescript"
    />
  ),
  react: (
    <IconWithTooltip
      icon={
        <SiReact className="text-[2.3rem] text-light-blue-300 dark:text-light-blue-200" />
      }
      text="React"
    />
  ),
  "node.js": (
    <IconWithTooltip
      icon={<SiNodedotjs className="text-[2.3rem] text-green-400" />}
      text="Node.js"
    />
  ),
  mongodb: (
    <IconWithTooltip
      icon={<SiMongodb className="text-[2.3rem] text-green-600" />}
      text="MongoDB"
    />
  ),
  "socket.io": (
    <IconWithTooltip
      icon={
        <SiSocketdotio className="text-[2.3rem] text-white dark:text-gray-100" />
      }
      text="Socket.io"
    />
  ),
  c: (
    <IconWithTooltip
      icon={<SiC className="text-[2.3rem] text-blue-700" />}
      text="C"
    />
  ),
  "c#": (
    <IconWithTooltip
      icon={<SiCsharp className="text-[2.3rem] text-purple-300" />}
      text="C#"
    />
  ),
  unity: (
    <IconWithTooltip
      icon={<SiUnity className="text-[2.3rem] text-gray-300" />}
      text="Unity"
    />
  ),
  java: (
    <IconWithTooltip
      icon={<SiJava className="text-[2.3rem] text-red-700" />}
      text="Java"
    />
  ),
  "next.js": (
    <IconWithTooltip
      icon={
        <SiNextdotjs className="text-[2.3rem] text-white dark:text-gray-100" />
      }
      text="Next.js"
    />
  ),
  ejs: null,
};

export default techsWithTooltip;

export const myTechStack: technologies[] = [
  "html",
  "css",
  "tailwind css",
  "javascript",
  "react",
  "next.js",
  "node.js",
];
