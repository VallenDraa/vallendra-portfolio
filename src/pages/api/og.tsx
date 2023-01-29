import { ImageResponse } from "@vercel/og";
import { NextApiHandler } from "next";
import Showcase from "../../server/ogComponents/showcase.og";

const handler: NextApiHandler = (req) => {
  try {
    const { searchParams } = new URL(req.url as string);

    const title = searchParams.get("title") ?? "Default title";
    const shortDesc =
      searchParams.get("short-desc") ?? "Default short description";
    const imgLink =
      searchParams.get("cld-img") ??
      `${process.env.URL}/images/vallen-icon.png`;
    const imgIsCloudinary = searchParams.has("img") ? true : false;

    return new ImageResponse(
      (
        <Showcase
          title={title}
          shortDesc={shortDesc}
          imgLink={imgLink}
          imgIsCloudinary={imgIsCloudinary}
        />
      ),
      { width: 1280, height: 720 }
    );
  } catch (error) {
    console.error(error);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
};

export const config = { runtime: "edge" };

export default handler;
