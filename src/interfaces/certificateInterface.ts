interface ICertificate {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  views: number;
  likes: number;
  loadingImage?: string;
  image: string;
  categoryIds: string[];
  createdAt: Date | string;
  certificateLink: string;
}
export default ICertificate;
