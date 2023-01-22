import { Project } from "../../../../interfaces/project.interface";
import topPickedProjects from "./topPickedProjects";

const webProjects: Project[] = [
  ...topPickedProjects,
  {
    _id: "5",
    name: "Devil's Burger",
    slug: "devils-burger",
    shortDescriptionEN:
      "A static restaurant website made with HTML, CSS, and vanilla JS",
    descriptionEN: `A static restaurant website made with HTML, CSS, and vanilla JS. This was a small project especially made to complete Dicoding's "Dasar Pemrograman Web" final project which I complete with flying colors.`,
    shortDescriptionID: "awikwok",
    descriptionID: `Deskripsi dalam bahasa indonesia.`,
    views: 69420,
    likes: 1231,
    image: "/images/projects/devils-burger.png",
    tech: ["html", "css", "javascript"],
    categoryIds: ["1"],

    createdAt: new Date("Dec 25, 2022").toISOString(),
    siteLink: "https://vallendraa.github.io/devils-burger",
    gitLink: "https://github.com/VallenDraa/devils-burger",
    isTopPick: false,
  },
  {
    _id: "6",
    name: "Typelist",
    slug: "typelist",
    shortDescriptionEN:
      "A todo list web app made with Tailwind CSS and Typescript",
    descriptionEN: `A todo list web app made with Tailwind CSS and Typescript. Learning Typescript has always been in my bucket list, as I'm sick of Javascript and its undefined errors. This project was my first attempt in using Typescript as a scripting languange. Lemme tell you, it was great 👍`,
    shortDescriptionID: "awikwok",
    descriptionID: `Deskripsi dalam bahasa indonesia.`,
    views: 69420,
    likes: 1231,
    image: "/images/projects/typelist.png",
    tech: ["html", "tailwind css", "typescript"],
    categoryIds: ["1"],

    createdAt: new Date("Oct 14, 2022").toISOString(),
    siteLink: "https://vallendraa.github.io/typelist",
    gitLink: "https://github.com/VallenDraa/typelist",
    isTopPick: false,
  },
  {
    _id: "7",
    name: "Tailwind Book Site",
    slug: "tailwind-book-site",
    shortDescriptionEN:
      "A UI Slicing project made using Tailwind CSS and React",
    descriptionEN: `A UI Slicing project made using Tailwind CSS and React. This project was my second attempt on UI Slicing. The design was made by an indonesian youtuber whose channel is named array.id. Props to that guy, such a good programmer 🤩.`,
    shortDescriptionID: "awikwok",
    descriptionID: `Deskripsi dalam bahasa indonesia.`,
    views: 69420,
    likes: 1231,
    image: "/images/projects/typelist.png",
    tech: ["react", "tailwind css", "typescript"],
    categoryIds: ["1"],

    createdAt: new Date("Mar 23, 2022").toISOString(),
    siteLink: null,
    gitLink: "https://github.com/VallenDraa/tailwind-book",
    isTopPick: false,
  },
  {
    _id: "8",
    name: "Nucleic Acid Converter",
    slug: "nucleic-acid-converter",
    shortDescriptionEN:
      "A converter to help me study biology. Made using vanilla JS",
    descriptionEN: `A converter to help me study biology. Made using vanilla JS. It works by taking an nucleic acid sequence and converts it into four different results. Just check it out for yourself, I already forgot how it works 😅.`,
    shortDescriptionID: "awikwok",
    descriptionID: `Deskripsi dalam bahasa indonesia.`,
    views: 69420,
    likes: 1231,
    image: "/images/projects/nucleic-acid-converter.png",
    tech: ["html", "css", "javascript"],
    categoryIds: ["1"],

    createdAt: new Date("Dec 25, 2021").toISOString(),
    siteLink: "https://vallendraa.github.io/nucleic-acid-converter",
    gitLink: "https://github.com/VallenDraa/nucleic-acid-converter",
    isTopPick: false,
  },
  {
    _id: "9",
    name: "Old Portfolio",
    slug: "old-portfolio",
    shortDescriptionEN:
      "My old portfolio I made back in 2021 using HTML, vanilla CSS and JS",
    descriptionEN: `My old portfolio I made back in 2021 using HTML, vanilla CSS and JS.`,
    shortDescriptionID: "awikwok",
    descriptionID: `Deskripsi dalam bahasa indonesia.`,
    views: 69420,
    likes: 1231,
    image: "/images/projects/old-portfolio.png",
    tech: ["html", "css", "javascript"],
    categoryIds: ["1"],
    createdAt: new Date("Dec 25, 2021").toISOString(),
    siteLink: "https://vallendraa.github.io/old-portfolio",
    gitLink: "https://github.com/VallenDraa/old-portfolio",
    isTopPick: false,
  },
];

export default webProjects;
