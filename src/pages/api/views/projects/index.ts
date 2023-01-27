import { NextApiHandler } from "next";
import { getAllProjectStats } from "../../../../server/service/projects/projectStats.service";

/* This handles getting all the project views */
const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "GET": {
        const projects = await getAllProjectStats(["views"]);

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
