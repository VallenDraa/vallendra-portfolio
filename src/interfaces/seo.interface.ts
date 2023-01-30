export interface BaseSeo {
  title: string;
  desc: string;
  robots?: string;
}

export interface OgSeo {
  siteName: string;
  siteUrl: string;
  contentType: string;
  imageUrl: string;
  imageAlt: string;
}

export interface SEO {
  base?: BaseSeo;
  og?: OgSeo;
}
