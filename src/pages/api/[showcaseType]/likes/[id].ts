/* eslint-disable @typescript-eslint/return-await */
import CertificateModel from "server/mongo/model/certificate.model";
import { NextApiHandler } from "next";
import ProjectModel from "server/mongo/model/project.model";
import idPageShowcaseLikesHandler from "server/handler/showcase/showcaseLikes.handler";
import BlogPostModel from "server/mongo/model/blogPost.model";
import { checkIfBlogExist } from "server/service/blog/blog.service";

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

    case "blogs":
      return await checkIfBlogExist(
        id as string,
        async () =>
          await idPageShowcaseLikesHandler(
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
