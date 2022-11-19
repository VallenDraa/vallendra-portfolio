export interface IUser {
  _id: string;
  username: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IComment {
  _id: string;
  user: IUser;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IProject {
  _id: string;
  name: string;
  description: string;
  rating: number | null;
  image: string;
  tech: string[];
  categories: string[];
  comments: IComment[];
  createdAt: Date;
  updatedAt?: Date;
  link: string;
}

export interface IIntersectingProjectHistory {
  prevId: string | null;
  currentId: string | null;
}
