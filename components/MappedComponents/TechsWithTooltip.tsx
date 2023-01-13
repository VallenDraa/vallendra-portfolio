import {
  SiC,
  SiCsharp,
  SiCss3,
  SiHtml5,
  SiJava,
  SiJavascript,
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
      Icon={<SiHtml5 className="text-deep-orange-400 text-[2.5rem]" />}
      text="HTML 5"
    />
  ),
  css: (
    <IconWithTooltip
      Icon={<SiCss3 className="text-blue-600 text-[2.5rem]" />}
      text="CSS 3"
    />
  ),
  "tailwind css": (
    <IconWithTooltip
      Icon={<SiTailwindcss className="text-cyan-400 text-[2.5rem]" />}
      text="Tailwind CSS"
    />
  ),
  javascript: (
    <IconWithTooltip
      Icon={<SiJavascript className="text-yellow-600 text-[2.5rem]" />}
      text="Javascript"
    />
  ),
  typescript: (
    <IconWithTooltip
      Icon={<SiTypescript className="text-blue-700 text-[2.5rem]" />}
      text="Typescript"
    />
  ),
  react: (
    <IconWithTooltip
      Icon={<SiReact className="text-light-blue-200 text-[2.5rem]" />}
      text="React"
    />
  ),
  "node.js": (
    <IconWithTooltip
      Icon={<SiNodedotjs className="text-green-400 text-[2.5rem]" />}
      text="Node.js"
    />
  ),
  mongodb: (
    <IconWithTooltip
      Icon={<SiMongodb className="text-green-600 text-[2.5rem]" />}
      text="MongoDB"
    />
  ),
  "socket.io": (
    <IconWithTooltip
      Icon={<SiSocketdotio className="text-white text-[2.5rem]" />}
      text="Socket.io"
    />
  ),
  c: (
    <IconWithTooltip
      Icon={<SiC className="text-blue-700 text-[2.5rem]" />}
      text="C"
    />
  ),
  "c#": (
    <IconWithTooltip
      Icon={<SiCsharp className="text-purple-300 text-[2.5rem]" />}
      text="C#"
    />
  ),
  unity: (
    <IconWithTooltip
      Icon={<SiUnity className="text-gray-300 text-[2.5rem]" />}
      text="Unity"
    />
  ),
  java: (
    <IconWithTooltip
      Icon={<SiJava className="text-red-700 text-[2.5rem]" />}
      text="Java"
    />
  ),
  "next.js": (
    <IconWithTooltip
      Icon={<SiNextdotjs className="text-gray-100 text-[2.5rem]" />}
      text="Next.js"
    />
  ),
  ejs: null,
};

export default techsWithTooltip;
