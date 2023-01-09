import { IProject } from "../../../../interfaces/projectInterfaces";

const gameProjects: IProject[] = [
  {
    _id: "12",
    name: "Spinning Cell",
    slug: "spinning-cell",
    shortDescription:
      "A game that was developed using Unity and C# with some friends for an event.",
    description:
      "A game that was developed using Unity and C# with some friends for an event. Originally this game was never supposed to be presented in this event, but since I was a bit cocky at the time I pushed it into production so that it'll ready for that event. The game is about a cell and a virus, in which the objective for the player is to collect as many oxygen orbs that are scattered throughout the level. It combines both rage inducing aspect and educational aspect, which may sound weird for a combination but it turned out to be a very unique experience. The game is available for Windows and Android",
    views: 69420,
    likes: 1231,
    image: "/images/projects/spinning-cell.png",
    tech: ["c#", "unity"],
    categoryIds: ["games"],
    comments: [],
    createdAt: new Date("Sep 1, 2021").toISOString(),
    downloadLink: "https://github.com/VallenDraa/spinning-cell",
    gitLink: "https://github.com/VallenDraa/spinning-cell",
  },
];

export default gameProjects;
