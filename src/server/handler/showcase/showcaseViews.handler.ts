import type { NextApiRequest, NextApiResponse } from "next";
import type { CertificateDocument } from "server/mongo/model/certificate.model";
import type { ProjectDocument } from "server/mongo/model/project.model";
import type { Model } from "mongoose";

import {
  internalServerErrorRes,
  invalidHttpMethodRes,
} from "server/error/response.error";

import {
  incItemStat,
  selectStatsFromItem,
} from "server/service/showcase/showcaseStats.service";
import { BlogPostDocument } from "server/mongo/model/blogPost.model";

/* this handles operation on views for a single project
====================================================== */
export default async function idPageShowcaseViewsHandler<
  T extends ProjectDocument | CertificateDocument | BlogPostDocument,
>(model: Model<T>, id: string, req: NextApiRequest, res: NextApiResponse) {
  try {
    /* Check the http method
      ======================= */
    switch (req.method) {
      case "GET": {
        const views = await selectStatsFromItem(model, id, ["views"]);
        return res.status(200).json(views);
      }

      case "PUT": {
        await incItemStat(model, id, "views");
        return res.status(204).end();
      }

      default: {
        return invalidHttpMethodRes(res);
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return internalServerErrorRes(res);
  }
}
