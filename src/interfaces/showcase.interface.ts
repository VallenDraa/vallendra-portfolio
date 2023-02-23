export default interface ShowcaseItem {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  shortDescriptionEN: string;
  descriptionEN: string;
  shortDescriptionID: string;
  descriptionID: string;
  views: number;
  likes: number;
  likers: string[];
  image: string;
  categoryIds: string[];
  madeAt: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type ShowcaseType = "projects" | "certificates";

export type ShowcaseDetailRedirect = {
  slug: string;
  name: string;
};
