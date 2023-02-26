import type { NextApiRequest, NextApiResponse } from "next";
import getUniqueIpId from "utils/server/getUniqueIpId";
import {
  internalServerErrorRes,
  invalidBodyRes,
  invalidHttpMethodRes,
} from "server/error/response.error";
import { LikesOperationBody } from "types/api.types";
import { ProjectDocument } from "server/mongo/model/project.model";
import { CertificateDocument } from "server/mongo/model/certificate.model";
import { Model } from "mongoose";
import {
  decItemStat,
  editItemLikersList,
  getHasLiked,
  incItemStat,
  selectStatsFromItem,
} from "server/service/universal/showcaseStats.service";

/* this handles operation on likes for a single project
====================================================== */
export default async function idPageShowcaseLikesHandler<
  T extends ProjectDocument | CertificateDocument,
>(model: Model<T>, id: string, req: NextApiRequest, res: NextApiResponse) {
  try {
    if (typeof id !== "string" || !id) {
      invalidBodyRes(res);
      return;
    }

    const uniqueIpId = getUniqueIpId(req);
    const hasLiked = await getHasLiked(model, id, uniqueIpId);

    /* Check the http method
    ======================= */
    switch (req.method) {
      case "GET": {
        const likes = await selectStatsFromItem(model, id, ["likes"]);

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
            await editItemLikersList(model, id, uniqueIpId, "add");
            await incItemStat(model, id, "likes");
          }
        } else if (hasLiked) {
          await editItemLikersList(model, id, uniqueIpId, "remove");
          await decItemStat(model, id, "likes");
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
    // eslint-disable-next-line no-console
    console.error(error);
    internalServerErrorRes(res);
  }
}
