import { technologies } from "./../types/types";
export interface IComment {
  _id: string;
  userId: string;
  content: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface IProject {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  views: number;
  likes: number;
  image: string;
  tech: technologies[];
  categoryIds: string[];
  comments: IComment[];
  createdAt: Date | string;
  updatedAt?: Date | string;
  siteLink?: string | null;
  downloadLink?: string | null;
  gitLink: string;
}

export interface ICategory {
  _id: string;
  name: string;
  projects: string[];
}
