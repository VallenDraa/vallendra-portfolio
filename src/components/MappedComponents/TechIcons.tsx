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
import type { TextSize, Technologies } from "types/types";

const techIcons: {
  [key in Technologies]: (
    size: TextSize,
    isColorOn?: boolean,
  ) => JSX.Element | null;
} = {
  html: (size, isColorOn = true) => (
    <SiHtml5
      className={`${size} ${
        isColorOn
          ? "text-orange-500"
          : "text-white/50 transition-colors duration-200 hover:text-orange-500 group-hover:text-orange-500"
      }`}
    />
  ),
  css: (size, isColorOn = true) => (
    <SiCss3
      className={`${size} ${
        isColorOn
          ? "text-blue-600"
          : "text-white/50 transition-colors duration-200 hover:text-blue-600 group-hover:text-blue-600"
      }`}
    />
  ),
  "tailwind css": (size, isColorOn = true) => (
    <SiTailwindcss
      className={`${size} ${
        isColorOn
          ? "text-cyan-400"
          : "text-white/50 transition-colors duration-200 hover:text-cyan-400 group-hover:text-cyan-400"
      }`}
    />
  ),
  javascript: (size, isColorOn = true) => (
    <SiJavascript
      className={`${size} ${
        isColorOn
          ? "bg-zinc-900 text-yellow-400 dark:bg-transparent"
          : "text-white/50 transition-colors duration-200 hover:bg-zinc-900 hover:text-yellow-400 group-hover:text-yellow-400 dark:hover:bg-transparent"
      }`}
    />
  ),
  jquery: (size, isColorOn = true) => (
    <SiJquery
      className={`${size} ${
        isColorOn
          ? "text-blue-500"
          : "text-white/50 transition-colors duration-200 hover:text-blue-500 group-hover:text-blue-500"
      }`}
    />
  ),
  typescript: (size, isColorOn = true) => (
    <SiTypescript
      className={`rounded ${size} ${
        isColorOn
          ? "bg-white text-blue-500"
          : "text-white/50 transition-colors duration-200 hover:bg-white hover:text-blue-500 group-hover:text-blue-500"
      }`}
    />
  ),
  react: (size, isColorOn = true) => (
    <SiReact
      className={`${size} ${
        isColorOn
          ? "text-cyan-300"
          : "text-white/50 transition-colors duration-200 hover:text-cyan-300 group-hover:text-cyan-300"
      }`}
    />
  ),
  "node.js": (size, isColorOn = true) => (
    <SiNodedotjs
      className={`${size} ${
        isColorOn
          ? "text-green-500"
          : "text-white/50 transition-colors duration-200 hover:text-green-500 group-hover:text-green-500"
      }`}
    />
  ),
  mongodb: (size, isColorOn = true) => (
    <SiMongodb
      className={`${size} ${
        isColorOn
          ? "text-green-600"
          : "text-white/50 transition-colors duration-200 hover:text-green-600 group-hover:text-green-600"
      }`}
    />
  ),
  "socket.io": (size, isColorOn = true) => (
    <SiSocketdotio
      className={`${size} ${
        isColorOn
          ? "text-zinc-900 dark:text-zinc-100"
          : "text-white/50 transition-colors duration-200 hover:text-zinc-900 group-hover:text-zinc-900 dark:hover:text-zinc-100 dark:group-hover:text-zinc-100"
      }`}
    />
  ),
  c: (size, isColorOn = true) => (
    <SiC
      className={`${size} ${
        isColorOn
          ? "text-blue-700"
          : "text-white/50 transition-colors duration-200 hover:text-blue-700 group-hover:text-blue-700"
      }`}
    />
  ),
  "c#": (size, isColorOn = true) => (
    <SiCsharp
      className={`${size} ${
        isColorOn
          ? "text-purple-400"
          : "text-white/50 transition-colors duration-200 hover:text-purple-400 group-hover:text-purple-400"
      }`}
    />
  ),
  unity: (size, isColorOn = true) => (
    <SiUnity
      className={`${size} ${
        isColorOn
          ? "text-zinc-900 dark:text-zinc-100"
          : "text-white/50 transition-colors duration-200 hover:text-zinc-900 group-hover:text-zinc-900 dark:hover:text-zinc-100 dark:group-hover:text-zinc-100"
      }`}
    />
  ),
  java: (size, isColorOn = true) => (
    <SiJava
      className={`${size} ${
        isColorOn
          ? "text-red-700"
          : "text-white/50 transition-colors duration-200 hover:text-red-700 group-hover:text-red-700"
      }`}
    />
  ),
  "next.js": (size, isColorOn = true) => (
    <SiNextdotjs
      className={`${size} ${
        isColorOn
          ? "text-zinc-900 dark:text-zinc-100"
          : "text-white/50 transition-colors duration-200 hover:text-zinc-900 group-hover:text-zinc-900 dark:hover:text-zinc-100 dark:group-hover:text-zinc-100"
      }`}
    />
  ),
  ejs: () => null,
};

export default techIcons;
