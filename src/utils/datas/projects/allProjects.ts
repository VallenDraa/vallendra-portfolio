import { Project } from "../../../interfaces/project.interface";
import consoleProjects from "./console/consoleProjects";
import desktopProjects from "./desktop/desktopProjects";
import gameProjects from "./games/gameProjects";
import webProjects from "./web/webProjects";

const allProjects: Project[] = [
  ...webProjects,
  ...consoleProjects,
  ...gameProjects,
  ...desktopProjects,
];

export default allProjects;
