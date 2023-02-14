import Head from "next/head";
import defaultSeo from "./default.seo";
import { BaseSeo, OgSeo, SEO } from "../interfaces/seo.interface";

export default function Seo({
  base = defaultSeo.base as BaseSeo,
  og = defaultSeo.og as OgSeo,
}: SEO) {
  return (
    <Head>
      {/* base meta */}
      <title>{base.title}</title>
      <meta lang="en" />
      <meta name="description" content={base.desc} />
      <meta name="theme-color" content="#7986cb" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={base.robots || "follow, index"} />

      {/* open graph meta */}
      <meta property="og:title" content={base.title} />
      <meta property="og:site_name" content={og.siteName} />
      <meta property="og:type" content={og.contentType} />
      <meta property="og:url" content={og.siteUrl} />
      <meta property="og:image" content={og.imageUrl} />
      <meta property="og:image:alt" content={og.imageAlt} />
      <meta property="og:image:width" content="960" />
      <meta property="og:image:height" content="540" />

      {/* twitter meta */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={base.title} />
      <meta name="twitter:description" content={base.desc} />
      <meta name="twitter:image" content={og.imageUrl} />
      <meta name="twitter:image:alt" content={og.imageAlt} />
      <meta name="twitter:site" content="@Jestinevallen" />

      {/* microsoft icon */}
      <meta name="msapplication-TileColor" content="#7986cb" />
      <meta
        name="msapplication-TileImage"
        content="/images/icons/apple-touch-icon-144x144.png"
      />

      {/* web icons */}
      <link rel="icon" href="/images/icons/favicon.ico" />
      <link
        rel="shortcut icon"
        href="/images/icons/favicon.ico"
        type="image/x-icon"
      />

      {/* apple icons  */}
      <link rel="apple-touch-icon" href="/images/icons/apple-touch-icon.png" />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/images/icons/apple-touch-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/images/icons/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/images/icons/apple-touch-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/images/icons/apple-touch-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/images/icons/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/images/icons/apple-touch-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/images/icons/apple-touch-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/icons/apple-touch-icon-180x180.png"
      />
    </Head>
  );
}
