import { NextApiHandler } from "next";
import {
  getProjectStats,
  incProjectStat,
} from "server/service/projects/projectStats.service";
import {
  internalServerErrorRes,
  invalidBodyRes,
  invalidHttpMethodRes,
} from "server/error/response.error";

/* this handles operation on views for a single project
====================================================== */
const handler: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query;
    if (typeof id !== "string" || !id) {
      invalidBodyRes(res);
      return;
    }

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

        res.status(204).end();
        break;
      }

      default: {
        invalidHttpMethodRes(res);
        break;
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    internalServerErrorRes(res);
  }
};

export default handler;
