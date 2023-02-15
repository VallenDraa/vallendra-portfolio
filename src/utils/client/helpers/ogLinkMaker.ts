import OgComponent from "interfaces/ogComponent.interface";

// eslint-disable-next-line import/prefer-default-export
export function ogLinkMaker({ title, shortDesc }: OgComponent) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og`);

  url.searchParams.append("title", title);
  url.searchParams.append("short-desc", shortDesc);

  return url.href;
}
