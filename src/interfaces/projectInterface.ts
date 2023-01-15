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
}

export interface IProjectCategory {
  _id: string;
  name: string;
  projects: string[];
}
