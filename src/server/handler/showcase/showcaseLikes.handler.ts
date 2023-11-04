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
} from "server/service/showcase/showcaseStats.service";
import { BlogPostDocument } from "server/mongo/model/blogPost.model";

/* this handles operation on likes for a single project
====================================================== */
export default async function idPageShowcaseLikesHandler<
  T extends ProjectDocument | CertificateDocument | BlogPostDocument,
>(model: Model<T>, id: string, req: NextApiRequest, res: NextApiResponse) {
  try {
    const uniqueIpId = getUniqueIpId(req);
    const hasLiked = await getHasLiked(model, id, uniqueIpId);

    /* Check the http method
    ======================= */
    switch (req.method) {
      case "GET": {
        const likes = await selectStatsFromItem(model, id, ["likes"]);

        const response = { ...likes, hasLiked };

        return res.status(200).json(response);
      }

      case "PUT": {
        const { operation } = req.body as LikesOperationBody;

        if (!operation) {
          return invalidBodyRes(res);
        }
        /* Check the operation type
            =========================== */
        if (operation === "increment") {
          if (!hasLiked) {
            await editItemLikersList(model, id, uniqueIpId, "add");
            await incItemStat(model, id, "likes");
          }
        } else {
          if (hasLiked) {
            await editItemLikersList(model, id, uniqueIpId, "remove");
            await decItemStat(model, id, "likes");
          }
        }

        return res.status(204).end();
      }
      default:
        return invalidHttpMethodRes(res);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return internalServerErrorRes(res);
  }
}
