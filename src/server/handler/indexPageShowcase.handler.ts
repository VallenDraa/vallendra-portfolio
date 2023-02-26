import type { NextApiRequest, NextApiResponse } from "next";
import type { ProjectDocument } from "server/mongo/model/project.model";
import type { CertificateDocument } from "server/mongo/model/certificate.model";
import type { Model } from "mongoose";

import {
  internalServerErrorRes,
  invalidHttpMethodRes,
} from "server/error/response.error";
import { selectStatsFromAllItems } from "server/service/universal/showcaseStats.service";

/* This handles getting all the project views */
export default async function IndexPageShowcaseHandler<
  T extends ProjectDocument | CertificateDocument,
>(model: Model<T>, req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case "GET": {
        const items = await selectStatsFromAllItems(model, ["views", "likes"]);

        res
          .status(200)
          .setHeader("Content-Type", "application/json")
          .end(JSON.stringify(items));
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
