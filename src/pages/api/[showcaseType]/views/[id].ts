/* eslint-disable @typescript-eslint/return-await */
import { NextApiHandler } from "next";
import idPageShowcaseViewsHandler from "server/handler/showcase/showcaseViews.handler";
import BlogPostModel from "server/mongo/model/blogPost.model";
import CertificateModel from "server/mongo/model/certificate.model";
import ProjectModel from "server/mongo/model/project.model";
import { checkIfBlogExist } from "server/service/blog/blog.service";

const handler: NextApiHandler = async (req, res) => {
  const { showcaseType, id } = req.query;

  switch (showcaseType) {
    case "projects":
      return idPageShowcaseViewsHandler(ProjectModel, id as string, req, res);

    case "certificates":
      return idPageShowcaseViewsHandler(
        CertificateModel,
        id as string,
        req,
        res,
      );

    case "blogs":
      return await checkIfBlogExist(
        id as string,
        async () =>
          await idPageShowcaseViewsHandler(
            BlogPostModel,
            id as string,
            req,
            res,
          ),
      );

    default:
      return res.redirect("/404").end();
  }
};

export default handler;
