import type { NextApiRequest, NextApiResponse } from "next";
import type { CertificateDocument } from "server/mongo/model/certificate.model";
import type { ProjectDocument } from "server/mongo/model/project.model";
import type { Model } from "mongoose";

import {
  internalServerErrorRes,
  invalidBodyRes,
  invalidHttpMethodRes,
} from "server/error/response.error";
import {
  incItemStat,
  selectStatsFromItem,
} from "server/service/universal/showcaseStats.service";

/* this handles operation on views for a single project
====================================================== */
export default async function idPageShowcaseViewsHandler<
  T extends ProjectDocument | CertificateDocument,
>(model: Model<T>, id: string, req: NextApiRequest, res: NextApiResponse) {
  try {
    if (typeof id !== "string" || !id) {
      invalidBodyRes(res);
      return;
    }

    /* Check the http method
    ======================= */
    switch (req.method) {
      case "GET": {
        const views = await selectStatsFromItem(model, id, ["views"]);

        res.json(views);
        break;
      }

      case "PUT": {
        await incItemStat(model, id, "views");

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
