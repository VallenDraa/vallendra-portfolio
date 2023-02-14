import { NextApiHandler } from "next";
import { getAllCertificateStats } from "server/service/certificates/certificateStats.service";
import {
  internalServerErrorRes,
  invalidHttpMethodRes,
} from "server/error/response.error";

/* This handles getting all the certificate likes */
const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET": {
        const projects = await getAllCertificateStats(["likes"]);

        res.json(projects);
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
};

export default handler;
