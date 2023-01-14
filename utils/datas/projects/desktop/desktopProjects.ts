import { IProject } from "../../../../interfaces/projectInterface";

const desktopProjects: IProject[] = [
  {
    _id: "13",
    name: "Turu List",
    slug: "turu-list",
    shortDescription:
      "A todo list made using Java and Swing with MongoDB as the database.",
    description:
      "A todo list made using Java and Swing with MongoDB as the database.",
    views: 69420,
    likes: 1231,
    image: "/images/projects/turu-list.png",
    tech: ["java", "mongodb"],
    categoryIds: ["2"],
    createdAt: new Date("Dec 10, 2022").toISOString(),
    downloadLink: "https://github.com/VallenDraa/turu-list",
    gitLink: "https://github.com/VallenDraa/turu-list",
  },
  {
    _id: "14",
    name: "Calculator Pro",
    slug: "calculator-pro",
    shortDescription: "A calculator app made using Java and Swing.",
    description: "A calculator app made using Java and Swing.",
    views: 69420,
    likes: 1231,
    image: "/images/projects/calculator-pro.png",
    tech: ["java"],
    categoryIds: ["2"],
    createdAt: new Date("Nov 28, 2022").toISOString(),
    downloadLink: "https://github.com/VallenDraa/kalkulator-pro",
    gitLink: "https://github.com/VallenDraa/kalkulator-pro",
  },
];

export default desktopProjects;
