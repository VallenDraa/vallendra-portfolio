import { NextApiHandler } from "next";
import { getAllProjectStats } from "../../../../server/service/projects/projectStats.service";
import {
  internalServerErrorRes,
  invalidHttpMethodRes,
} from "../../../../server/error/response.error";

/* This handles getting all the project likes */
const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET": {
        const projects = await getAllProjectStats(["likes"]);

        res.json(projects);
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
