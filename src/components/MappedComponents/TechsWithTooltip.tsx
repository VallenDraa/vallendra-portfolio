import IconWithTooltip from "../IconWithTooltip";
import { technologies } from "../../types/types";
import techIcons from "./TechIcons";

const techsWithTooltip: {
  [key in technologies]: (isColorOn?: boolean) => React.ReactElement | null;
} = {
  html: (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["html"]("text-4xl", isColorOn)}
      text="HTML 5"
    />
  ),
  css: (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["css"]("text-4xl", isColorOn)}
      text="CSS 3"
    />
  ),
  "tailwind css": (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["tailwind css"]("text-4xl", isColorOn)}
      text="Tailwind CSS"
    />
  ),
  javascript: (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["javascript"]("text-4xl", isColorOn)}
      text="Javascript"
    />
  ),
  jquery: (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["jquery"]("text-4xl", isColorOn)}
      text="JQuery"
    />
  ),
  typescript: (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["typescript"]("text-4xl", isColorOn)}
      text="Typescript"
    />
  ),
  react: (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["react"]("text-4xl", isColorOn)}
      text="React"
    />
  ),
  "node.js": (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["node.js"]("text-4xl", isColorOn)}
      text="Node.js"
    />
  ),
  mongodb: (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["mongodb"]("text-4xl", isColorOn)}
      text="MongoDB"
    />
  ),
  "socket.io": (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["socket.io"]("text-4xl", isColorOn)}
      text="Socket.io"
    />
  ),
  c: (isColorOn = true) => (
    <IconWithTooltip icon={techIcons["c"]("text-4xl", isColorOn)} text="C" />
  ),
  "c#": (isColorOn = true) => (
    <IconWithTooltip icon={techIcons["c#"]("text-4xl", isColorOn)} text="C#" />
  ),
  unity: (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["unity"]("text-4xl", isColorOn)}
      text="Unity"
    />
  ),
  java: (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["java"]("text-4xl", isColorOn)}
      text="Java"
    />
  ),
  "next.js": (isColorOn = true) => (
    <IconWithTooltip
      icon={techIcons["next.js"]("text-4xl", isColorOn)}
      text="Next.js"
    />
  ),
  ejs: (isColorOn = true) => null,
};

export default techsWithTooltip;

export const myTechStack: technologies[] = [
  "html",
  "css",
  "tailwind css",
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node.js",
];
