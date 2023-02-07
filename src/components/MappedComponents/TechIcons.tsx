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
import { TextSize, technologies } from "../../types/types";

const techIcons: {
  [key in technologies]: (size: TextSize, isColorOn?: boolean) => JSX.Element;
} = {
  html: (size, isColorOn = true) => (
    <SiHtml5
      className={`${size} ${
        isColorOn
          ? "text-deep-orange-400"
          : "text-white/50 transition-colors duration-200 group-hover:text-deep-orange-400 hover:text-deep-orange-400"
      }`}
    />
  ),
  css: (size, isColorOn = true) => (
    <SiCss3
      className={`${size} ${
        isColorOn
          ? "text-blue-600"
          : "text-white/50 transition-colors duration-200 group-hover:text-blue-600 hover:text-blue-600"
      }`}
    />
  ),
  "tailwind css": (size, isColorOn = true) => (
    <SiTailwindcss
      className={`${size} ${
        isColorOn
          ? "text-cyan-400"
          : "text-white/50 transition-colors duration-200 group-hover:text-cyan-400 hover:text-cyan-400"
      }`}
    />
  ),
  javascript: (size, isColorOn = true) => (
    <SiJavascript
      className={`${size} ${
        isColorOn
          ? "text-yellow-600"
          : "text-white/50 transition-colors duration-200 group-hover:text-yellow-600 hover:text-yellow-600"
      }`}
    />
  ),
  jquery: (size, isColorOn = true) => (
    <SiJquery
      className={`${size} ${
        isColorOn
          ? "text-blue-700"
          : "text-white/50 transition-colors duration-200 group-hover:text-blue-700 hover:text-blue-700"
      }`}
    />
  ),
  typescript: (size, isColorOn = true) => (
    <SiTypescript
      className={`${size} ${
        isColorOn
          ? "text-blue-700"
          : "text-white/50 transition-colors duration-200 group-hover:text-blue-700 hover:text-blue-700"
      }`}
    />
  ),
  react: (size, isColorOn = true) => (
    <SiReact
      className={`${size} ${
        isColorOn
          ? "text-light-blue-200"
          : "text-white/50 transition-colors duration-200 group-hover:text-light-blue-200 hover:text-light-blue-200"
      }`}
    />
  ),
  "node.js": (size, isColorOn = true) => (
    <SiNodedotjs
      className={`${size} ${
        isColorOn
          ? "text-green-400"
          : "text-white/50 transition-colors duration-200 group-hover:text-green-400 hover:text-green-400"
      }`}
    />
  ),
  mongodb: (size, isColorOn = true) => (
    <SiMongodb
      className={`${size} ${
        isColorOn
          ? "text-green-600"
          : "text-white/50 transition-colors duration-200 group-hover:text-green-600 hover:text-green-600"
      }`}
    />
  ),
  "socket.io": (size, isColorOn = true) => (
    <SiSocketdotio
      className={`${size} ${
        isColorOn
          ? "text-gray-900 dark:text-gray-100"
          : "text-white/50 transition-colors duration-200 group-hover:text-gray-100 hover:text-gray-100 dark:group-hover:text-gray-900 dark:hover:text-gray-900"
      }`}
    />
  ),
  c: (size, isColorOn = true) => (
    <SiC
      className={`${size} ${
        isColorOn
          ? "text-blue-700"
          : "text-white/50 transition-colors duration-200 group-hover:text-blue-700 hover:text-blue-700"
      }`}
    />
  ),
  "c#": (size, isColorOn = true) => (
    <SiCsharp
      className={`${size} ${
        isColorOn
          ? "text-purple-400"
          : "text-white/50 transition-colors duration-200 group-hover:text-purple-400 hover:text-purple-400"
      }`}
    />
  ),
  unity: (size, isColorOn = true) => (
    <SiUnity
      className={`${size} ${
        isColorOn
          ? "text-gray-900 dark:text-gray-100"
          : "text-white/50 transition-colors duration-200 group-hover:text-gray-100 hover:text-gray-100 dark:group-hover:text-gray-900 dark:hover:text-gray-900"
      }`}
    />
  ),
  java: (size, isColorOn = true) => (
    <SiJava
      className={`${size} ${
        isColorOn
          ? "text-red-700"
          : "text-white/50 transition-colors duration-200 group-hover:text-red-700 hover:text-red-700"
      }`}
    />
  ),
  "next.js": (size, isColorOn = true) => (
    <SiNextdotjs
      className={`${size} ${
        isColorOn
          ? "text-gray-900 dark:text-gray-100"
          : "text-white/50 transition-colors duration-200 group-hover:text-gray-100 hover:text-gray-100 dark:group-hover:text-gray-900 dark:hover:text-gray-900"
      }`}
    />
  ),
  ejs: (size, isColorOn = true) => <></>,
};

export default techIcons;
