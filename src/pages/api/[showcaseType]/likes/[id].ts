import CertificateModel from "server/mongo/model/certificate.model";
import { NextApiHandler } from "next";
import ProjectModel from "server/mongo/model/project.model";
import idPageShowcaseLikesHandler from "server/handler/showcase/showcaseLikes.handler";
import idPageBlogLikesHandler from "server/handler/blog/blogLikes.handler";

const handler: NextApiHandler = async (req, res) => {
  const { showcaseType, id } = req.query;

  switch (showcaseType) {
    case "projects":
      return idPageShowcaseLikesHandler(ProjectModel, id as string, req, res);

    case "certificates":
      return idPageShowcaseLikesHandler(
        CertificateModel,
        id as string,
        req,
        res,
      );

    case "blog":
      return idPageBlogLikesHandler(id as string, req, res);

    default:
      return res.redirect("/404").end();
  }
};

export default handler;
