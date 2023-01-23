import { Project } from "../../../../interfaces/project.interface";

const desktopProjects: Project[] = [
  {
    _id: "13",
    name: "Turu List",
    slug: "turu-list",
    shortDescriptionEN:
      "A todo list made using Java and Swing with MongoDB as the database.",
    descriptionEN:
      "A todo list made using Java and Swing with MongoDB as the database.",
    shortDescriptionID:
      "A todo list made using Java and Swing with MongoDB as the database.",
    descriptionID:
      "A todo list made using Java and Swing with MongoDB as the database.",
    views: 69420,
    likes: 1231,
    image: "/images/projects/turu-list.png",
    tech: ["java", "mongodb"],
    categoryIds: ["2"],
    madeAt: new Date("Dec 10, 2022").toISOString(),
    downloadLink: "https://github.com/VallenDraa/turu-list",
    gitLink: "https://github.com/VallenDraa/turu-list",
    isTopPick: false,
  },
  {
    _id: "14",
    name: "Calculator Pro",
    slug: "calculator-pro",
    shortDescriptionEN: "A calculator app made using Java and Swing.",
    descriptionEN: "A calculator app made using Java and Swing.",
    shortDescriptionID: "A calculator app made using Java and Swing.",
    descriptionID: "A calculator app made using Java and Swing.",
    views: 69420,
    likes: 1231,
    image: "/images/projects/calculator-pro.png",
    tech: ["java"],
    categoryIds: ["2"],
    madeAt: new Date("Nov 28, 2022").toISOString(),
    downloadLink: "https://github.com/VallenDraa/kalkulator-pro",
    gitLink: "https://github.com/VallenDraa/kalkulator-pro",
    isTopPick: false,
  },
];

export default desktopProjects;
