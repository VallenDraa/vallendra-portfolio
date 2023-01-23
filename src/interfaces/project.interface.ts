import { technologies } from "../types/types";

export interface Project {
  _id: string;
  icon?: string;
  name: string;
  slug: string;
  shortDescriptionEN: string;
  descriptionEN: string;
  shortDescriptionID: string;
  descriptionID: string;
  views: number;
  likes: number;
  image: string;
  tech: technologies[];
  categoryIds: string[];
  madeAt: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  siteLink?: string | null;
  downloadLink?: string | null;
  gitLink: string;
  isTopPick: boolean;
}
