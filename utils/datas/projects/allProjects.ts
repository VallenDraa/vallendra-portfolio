import { IProject } from "../../../interfaces/projectInterfaces";
import cliProjects from "./cli/cliProjects";
import desktopProjects from "./dekstop/desktopProjects";
import gameProjects from "./games/gameProjects";
import websiteProjects from "./websites/websiteProjects";

const allProjects: IProject[] = [
  ...websiteProjects,
  ...cliProjects,
  ...gameProjects,
  ...desktopProjects,
];

export default allProjects;
