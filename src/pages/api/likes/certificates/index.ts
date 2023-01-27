import { NextApiHandler } from "next";
import { getAllCertificateStats } from "../../../../server/service/certificates/certificateStats.service";

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
        res.status(405).json({ message: "Invalid method for the request" });
        break;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default handler;
