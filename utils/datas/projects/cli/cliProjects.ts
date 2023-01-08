import { IProject } from "../../../../interfaces/projectInterfaces";

const cliProjects: IProject[] = [
  {
    _id: "10",
    name: "Bus Primajasa",
    shortDescription:
      "A CLI based bus booking app made with the C programming language",
    description: `A CLI based bus booking app made with the C programming language.`,
    rating: null,
    image: "/images/projects/bus-primajasa.png",
    tech: ["c"],
    categoryIds: ["cli"],
    comments: [],
    createdAt: new Date("Nov 12, 2022").toISOString(),
    gitLink: "https://github.com/VallenDraa/bus-primajasa",
  },
  {
    _id: "11",
    name: "Perkutut Airlines",
    shortDescription:
      "A CLI based airplane ticket booking app made with the C programming language",
    description: `A CLI based based airplane ticket booking app made with the C programming language.`,
    rating: null,
    image: "/images/projects/perkutut-airlines.png",
    tech: ["c"],
    categoryIds: ["cli"],
    comments: [],
    createdAt: new Date("Nov 10, 2022").toISOString(),
    gitLink: "https://github.com/VallenDraa/perkutut-airlines",
  },
];

export default cliProjects;
