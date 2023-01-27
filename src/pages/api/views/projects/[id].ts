import { NextApiHandler } from "next";
import {
  getProjectStats,
  incProjectStat,
} from "../../../../server/service/projects/projectStats.service";

/* this handles operation on views for a single project
====================================================== */
const handler: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query;
    if (typeof id !== "string" || !id) throw new Error();

    /* Check the http method
    ======================= */
    switch (req.method) {
      case "GET": {
        const views = await getProjectStats(id, ["views"]);

        res.json(views);
        break;
      }

      case "PUT": {
        await incProjectStat(id, "views");

        res.json(204);
        break;
      }

      default: {
        res.status(405).json({ message: "Invalid method for the request" });
        break;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default handler;
