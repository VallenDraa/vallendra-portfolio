import OgComponent from "../../../interfaces/ogComponent.interface";

export function ogLinkMaker({ title, shortDesc, imgLink }: OgComponent) {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${title}&short-desc=${shortDesc}&cld-img=${imgLink}`;
}
