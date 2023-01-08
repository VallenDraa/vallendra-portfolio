import { ICategory } from "./../../../interfaces/projectInterfaces";

const projectCategories: ICategory[] = [
  {
    _id: "1",
    name: "website",
    projects: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  },
  {
    _id: "2",
    name: "cli",
    projects: ["10", "11"],
  },
  {
    _id: "3",
    name: "games",
    projects: ["12"],
  },
  {
    _id: "4",
    name: "desktop app",
    projects: ["13", "14"],
  },
];

export default projectCategories;
