import { IProject } from "../../../../interfaces/projectInterface";

const cliProjects: IProject[] = [
  {
    _id: "10",
    name: "Bus Primajasa",
    slug: "bus-primajasa",
    shortDescriptionEN:
      "A CLI based bus booking app made with the C programming language",
    descriptionEN: `A CLI based bus booking app made with the C programming language.`,
    shortDescriptionID:
      "A CLI based bus booking app made with the C programming language",
    descriptionID: `A CLI based bus booking app made with the C programming language.`,
    views: 69420,
    likes: 1231,
    image: "/images/projects/bus-primajasa.png",
    tech: ["c"],
    categoryIds: ["3"],
    createdAt: new Date("Nov 12, 2022").toISOString(),
    gitLink: "https://github.com/VallenDraa/bus-primajasa",
    isTopPick: false,
  },
  {
    _id: "11",
    name: "Perkutut Airlines",
    slug: "perkutut-airlines",
    shortDescriptionEN:
      "A CLI based airplane ticket booking app made with the C programming language",
    descriptionEN: `A CLI based based airplane ticket booking app made with the C programming language.`,
    shortDescriptionID:
      "A CLI based airplane ticket booking app made with the C programming language",
    descriptionID: `A CLI based based airplane ticket booking app made with the C programming language.`,
    views: 69420,
    likes: 1231,
    image: "/images/projects/perkutut-airlines.png",
    tech: ["c"],
    categoryIds: ["3"],
    createdAt: new Date("Nov 10, 2022").toISOString(),
    gitLink: "https://github.com/VallenDraa/perkutut-airlines",
    isTopPick: false,
  },
];

export default cliProjects;
