interface Certificate {
  _id: string;
  name: string;
  slug: string;
  shortDescriptionEN: string;
  descriptionEN: string;
  shortDescriptionID: string;
  descriptionID: string;
  views: number;
  likes: number;
  loadingImage?: string;
  image: string;
  categoryIds: string[];
  madeAt: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  certificateLink: string;
}
export default Certificate;
