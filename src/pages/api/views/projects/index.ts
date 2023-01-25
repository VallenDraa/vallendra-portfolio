import { NextApiHandler } from "next";
import { getAllProjectViews } from "../../../../server/service/projects/projectViewsAndLikes.service";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const projects = await getAllProjectViews();

      res.json(projects);
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(405).json({ message: "Invalid method for the request" });
  }
};

export default handler;
