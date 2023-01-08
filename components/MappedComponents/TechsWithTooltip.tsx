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
import IconWithTooltip from "../IconWithTooltip/IconWithTooltip";
import { technologies } from "../../types/types";

const techsWithTooltip: { [key in technologies]: React.ReactElement | null } = {
  html: (
    <IconWithTooltip
      Icon={<SiHtml5 className="text-deep-orange-400 text-5xl" />}
      text="HTML 5"
    />
  ),
  css: (
    <IconWithTooltip
      Icon={<SiCss3 className="text-blue-600 text-5xl" />}
      text="CSS 3"
    />
  ),
  "tailwind css": (
    <IconWithTooltip
      Icon={<SiTailwindcss className="text-cyan-400 text-5xl" />}
      text="Tailwind CSS"
    />
  ),
  javascript: (
    <IconWithTooltip
      Icon={<SiJavascript className="text-yellow-600 text-5xl" />}
      text="Javascript"
    />
  ),
  typescript: (
    <IconWithTooltip
      Icon={<SiTypescript className="text-blue-700 text-5xl" />}
      text="Typescript"
    />
  ),
  react: (
    <IconWithTooltip
      Icon={<SiReact className="text-light-blue-200 text-5xl" />}
      text="React"
    />
  ),
  "node.js": (
    <IconWithTooltip
      Icon={<SiNodedotjs className="text-green-400 text-5xl" />}
      text="Node.js"
    />
  ),
  mongodb: (
    <IconWithTooltip
      Icon={<SiMongodb className="text-green-600 text-5xl" />}
      text="MongoDB"
    />
  ),
  "socket.io": (
    <IconWithTooltip
      Icon={<SiSocketdotio className="text-white text-5xl" />}
      text="Socket.IO"
    />
  ),
  c: (
    <IconWithTooltip
      Icon={<SiC className="text-blue-700 text-5xl" />}
      text="C"
    />
  ),
  "c#": (
    <IconWithTooltip
      Icon={<SiCsharp className="text-purple-300" />}
      text="C#"
    />
  ),
  unity: (
    <IconWithTooltip
      Icon={<SiUnity className="text-gray-300" />}
      text="Unity"
    />
  ),
  java: (
    <IconWithTooltip
      Icon={<SiJava className="text-red-700 text-5xl" />}
      text="Java"
    />
  ),
  ejs: null,
};

export default techsWithTooltip;
