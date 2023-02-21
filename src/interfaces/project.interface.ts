import type { Technologies } from "types/types";
import type ShowcaseItem from "./showcase.interface";

export default interface Project extends ShowcaseItem {
  tech: Technologies[];
  siteLink?: string | null;
  downloadLink?: string | null;
  gitLink: string;
  isTopPick: boolean;
}
