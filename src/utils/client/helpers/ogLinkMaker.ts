import OgComponent from "interfaces/ogComponent.interface";

// eslint-disable-next-line import/prefer-default-export
export function ogLinkMaker({ title, shortDesc }: OgComponent) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${title}&short-desc=${shortDesc}`;
}
