import { IProjectCategory } from "../../../interfaces/projectInterface";

const projectCategories: IProjectCategory[] = [
  {
    _id: "1",
    name: "website",
    projects: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  },
  {
    _id: "2",
    name: "desktop app",
    projects: ["13", "14"],
  },
  {
    _id: "3",
    name: "console app",
    projects: ["10", "11"],
  },
  {
    _id: "4",
    name: "games",
    projects: ["12"],
  },
];

export default projectCategories;
