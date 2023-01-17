import { technologies } from "../types/types";

export interface IProject {
  _id: string;
  icon?: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  views: number;
  likes: number;
  image: string;
  tech: technologies[];
  categoryIds: string[];
  createdAt: Date | string;
  updatedAt?: Date | string;
  siteLink?: string | null;
  downloadLink?: string | null;
  gitLink: string;
  isTopPick: boolean;
}
