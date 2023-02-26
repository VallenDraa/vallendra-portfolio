import CertificateModel from "server/mongo/model/certificate.model";
import { NextApiHandler } from "next";
import idPageShowcaseLikesHandler from "server/handler/idPageShowcaseLikes.handler";
import ProjectModel from "server/mongo/model/project.model";

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

    default:
      return res.redirect("/404");
  }
};

export default handler;
