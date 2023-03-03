import type { NextApiRequest, NextApiResponse } from "next";
import getUniqueIpId from "utils/server/getUniqueIpId";
import {
  internalServerErrorRes,
  invalidBodyRes,
  invalidHttpMethodRes,
} from "server/error/response.error";
import { LikesOperationBody } from "types/api.types";
import {
  decBlogStat,
  editBlogLikersList,
  getHasLiked,
  incBlogStat,
  selectStatsFromBlog,
} from "server/service/blog/blog.service";

/* this handles operation on likes for a single project
====================================================== */
export default async function idPageBlogLikesHandler(
  slug: string,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const uniqueIpId = getUniqueIpId(req);
    const hasLiked = await getHasLiked(slug, uniqueIpId);

    /* Check the http method
    ======================= */
    switch (req.method) {
      case "GET": {
        const likes = await selectStatsFromBlog(slug, ["likes"]);

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
            await editBlogLikersList(slug, uniqueIpId, "add");
            await incBlogStat(slug, "likes");
          }
        } else {
          if (hasLiked) {
            await editBlogLikersList(slug, uniqueIpId, "remove");
            await decBlogStat(slug, "likes");
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
