import OgComponent from "../../../interfaces/ogComponent.interface";

export function ogLinkMaker({ title, shortDesc, imgLink }: OgComponent) {
  return `${process.env.BASE_URL}/api/og?title=${title}&short-desc=${shortDesc}&cld-img=${imgLink}`;
}
