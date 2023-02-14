import { ImageResponse } from "@vercel/og";
import { NextApiHandler } from "next";
import Showcase from "../../server/ogComponents/showcase.og";

export const config = { runtime: "edge" };

const handler: NextApiHandler = req => {
  try {
    const { searchParams } = new URL(req.url as string);

    const title = searchParams.get("title") ?? "Default title";
    const shortDesc =
      searchParams.get("short-desc") ?? "Default short description";
    const imgLink =
      searchParams.get("cld-img") ??
      `${process.env.URL}/images/vallen-icon.png`;

    return new ImageResponse(
      <Showcase title={title} shortDesc={shortDesc} imgLink={imgLink} />,
      { width: 960, height: 540 },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
};

export default handler;
