import { IProject } from "../../../../interfaces/projectInterfaces";

const desktopProjects: IProject[] = [
  {
    _id: "13",
    name: "Calculator Pro",
    shortDescription: "A calculator app made using Java and JavaSwing.",
    description: "A calculator app made using Java and JavaSwing.",
    rating: null,
    image: "/images/projects/calculator-pro.png",
    tech: ["java"],
    categoryIds: ["desktop"],
    comments: [],
    createdAt: new Date("Nov 28, 2022").toISOString(),
    downloadLink: "https://github.com/VallenDraa/kalkulator-pro",
    gitLink: "https://github.com/VallenDraa/kalkulator-pro",
  },
  {
    _id: "14",
    name: "Turu List",
    shortDescription:
      "A todo list app made using Java and JavaSwing with MongoDB as the database.",
    description:
      "A todo list app made using Java and JavaSwing with MongoDB as the database.",
    rating: null,
    image: "/images/projects/turu-list.png",
    tech: ["java", "mongodb"],
    categoryIds: ["desktop"],
    comments: [],
    createdAt: new Date("Dec 10, 2022").toISOString(),
    downloadLink: "https://github.com/VallenDraa/turu-list",
    gitLink: "https://github.com/VallenDraa/turu-list",
  },
];

export default desktopProjects;
