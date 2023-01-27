import { NextApiHandler } from "next";
import {
  incCertificateStat,
  decCertificateStat,
  getCertificateStats,
  editLikersList,
  getHasLiked,
} from "../../../../server/service/certificates/certificateStats.service";
import getUniqueIpId from "../../../../utils/server/getUniqueIpId";
import { LikesOperationBody } from "../../../../types/types";

/* this handles operation on likes for a single project
====================================================== */
const handler: NextApiHandler = async (req, res) => {
  try {
    const { id } = req.query;
    if (typeof id !== "string" || !id) throw new Error();

    const uniqueIpId = getUniqueIpId(req);

    /* Check the http method
    ======================= */
    switch (req.method) {
      case "GET": {
        const likes = await getCertificateStats(id, ["likes"]);
        const hasLiked = await getHasLiked(id, uniqueIpId);

        const response = { ...likes, hasLiked };

        res.json(response);
        break;
      }

      case "PUT": {
        const { operation } = req.body as LikesOperationBody;

        /* Check the operation type
        =========================== */
        if (operation === "increment") {
          await editLikersList(id, uniqueIpId, "add");
          await incCertificateStat(id, "likes");
        } else {
          await editLikersList(id, uniqueIpId, "remove");
          await decCertificateStat(id, "likes");
        }

        res.json(204);
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

/* API Route config
=================== */
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100kb",
    },
  },
};
