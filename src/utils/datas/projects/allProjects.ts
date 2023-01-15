import { IProject } from "../../../interfaces/projectInterface";
import consoleProjects from "./console/consoleProjects";
import desktopProjects from "./desktop/desktopProjects";
import gameProjects from "./games/gameProjects";
import webProjects from "./web/webProjects";

const allProjects: IProject[] = [
  ...webProjects,
  ...consoleProjects,
  ...gameProjects,
  ...desktopProjects,
];

export default allProjects;
