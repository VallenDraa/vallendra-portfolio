import { NextApiHandler } from "next";
import {
  incProjectStat,
  decProjectStat,
  getProjectStats,
  editLikersList,
  getHasLiked,
} from "../../../../server/service/projects/projectStats.service";
import getUniqueIpId from "../../../../utils/server/getUniqueIpId";
import { LikesOperationBody } from "../../../../types/types";
import {
  internalServerErrorRes,
  invalidBodyRes,
  invalidHttpMethodRes,
} from "../../../../server/error/response.error";

/* this handles operation on likes for a single project
====================================================== */
const handler: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query;
    if (typeof id !== "string" || !id) {
      invalidBodyRes(res);
      return;
    }

    const uniqueIpId = getUniqueIpId(req);
    const hasLiked = await getHasLiked(id, uniqueIpId);

    /* Check the http method
    ======================= */
    switch (req.method) {
      case "GET": {
        const likes = await getProjectStats(id, ["likes"]);

        const response = { ...likes, hasLiked };

        res.json(response);
        break;
      }

      case "PUT": {
        const { operation } = req.body as LikesOperationBody;

        if (!operation) {
          invalidBodyRes(res);
          return;
        }

        /* Check the operation type
        =========================== */
        if (operation === "increment") {
          if (!hasLiked) {
            await editLikersList(id, uniqueIpId, "add");
            await incProjectStat(id, "likes");
          }
        } else {
          if (hasLiked) {
            await editLikersList(id, uniqueIpId, "remove");
            await decProjectStat(id, "likes");
          }
        }

        res.status(204).end();
        break;
      }

      default: {
        invalidHttpMethodRes(res);
        break;
      }
    }
  } catch (error) {
    console.error(error);
    internalServerErrorRes(res);
  }
};

export default handler;

/* API Route config
=================== */
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100kb",
    },
  },
};
