import type { NextApiRequest, NextApiResponse } from "next";

import {
  internalServerErrorRes,
  invalidHttpMethodRes,
} from "server/error/response.error";

import {
  incBlogStat,
  selectStatsFromBlog,
} from "server/service/blog/blog.service";

/* this handles operation on views for a single project
====================================================== */
export default async function idPageBlogViewsHandler(
  slug: string,
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    /* Check the http method
      ======================= */
    switch (req.method) {
      case "GET": {
        const views = await selectStatsFromBlog(slug, ["views"]);
        return res.status(200).json(views);
      }

      case "PUT": {
        await incBlogStat(slug, "views");
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
