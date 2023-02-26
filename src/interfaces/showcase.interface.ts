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

export const SHOWCASE_TYPES = ["projects", "certificates"] as const;

export type ShowcaseType = (typeof SHOWCASE_TYPES)[number];

export type ShowcaseDetailRedirect = {
  slug: string;
  name: string;
};
