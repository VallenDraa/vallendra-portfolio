import { NextApiHandler } from "next";
import idPageBlogViewsHandler from "server/handler/blog/blogViews.handler";
import idPageShowcaseViewsHandler from "server/handler/showcase/showcaseViews.handler";
import CertificateModel from "server/mongo/model/certificate.model";
import ProjectModel from "server/mongo/model/project.model";

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
      return idPageBlogViewsHandler(id as string, req, res);

    default:
      return res.redirect("/404").end();
  }
};

export default handler;
