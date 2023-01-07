export interface IUser {
  _id: string;
  username: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface IComment {
  _id: string;
  user: IUser;
  content: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

export interface IProject {
  _id: string;
  name: string;
  shortDescription: string;
  description: string;
  rating: number | null;
  image: string;
  tech: string[];
  categories: string[];
  comments: IComment[];
  createdAt: Date | string;
  updatedAt?: Date | string;
  siteLink: string;
  gitLink: string;
}

export interface IIntersectingProjectHistory {
  prevId: string | null;
  currentId: string | null;
}
