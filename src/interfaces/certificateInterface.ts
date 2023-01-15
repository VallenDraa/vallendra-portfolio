interface ICertificate {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  views: number;
  likes: number;
  image: string;
  categoryIds: string[];
  createdAt: Date | string;
  certificateLink: string;
}

export interface ICertificateCategory {
  _id: string;
  name: string;
  certificates: string[];
}

export default ICertificate;
