import { ImageResponse } from "@vercel/og";
import { NextApiHandler } from "next";
import Showcase from "server/ogComponents/showcase.og";

export const config = { runtime: "edge" };

const handler: NextApiHandler = req => {
  try {
    const { searchParams } = new URL(req.url as string);

    const title = searchParams.get("title") ?? "Default title";
    const shortDesc =
      searchParams.get("short-desc") ?? "Default short description";

    return new ImageResponse(<Showcase title={title} shortDesc={shortDesc} />, {
      width: 1200,
      height: 630,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
};

export default handler;
