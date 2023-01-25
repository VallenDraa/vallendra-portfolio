import { NextApiHandler } from "next";
import {
  getProjectViews,
  incProjectStat,
} from "../../../../server/service/projects/projectViewsAndLikes.service";

const handler: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query;
    if (typeof id !== "string" || !id) throw new Error();

    /* Check the http method
    ======================= */
    if (req.method === "GET") {
      const views = await getProjectViews(id);

      res.json(views);
    } else if (req.method === "PUT") {
      await incProjectStat(id, "views");

      res.json(204);
    } else {
      res.status(405).json({ message: "Invalid method for the request" });
    }
  } catch (error) {
    console.error(error);
  }
};

export default handler;
