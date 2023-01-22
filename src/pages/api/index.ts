import { NextApiHandler } from "next";

let apiVisitor = 0;

const response = {
  message:
    "Do you get to this part of the site very often? What am i saying of course you don't.",
  end_points: [
    {
      certificates: [
        "/api/views/certificates",
        "/api/views/certificates/[certificate-id]",
      ],
    },
    { projects: ["/api/views/projects", "/api/views/projects/[project-id]"] },
  ],
};

const handler: NextApiHandler = async (req, res) => {
  apiVisitor += 1;

  return res.json({ ...response, apiVisitor });
};

export default handler;
