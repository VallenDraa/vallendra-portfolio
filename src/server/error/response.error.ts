import { NextApiResponse } from "next";

export function invalidHttpMethodRes(res: NextApiResponse) {
  return res.status(405).json({ message: "Invalid method for the request !" });
}

export function internalServerErrorRes(res: NextApiResponse) {
  return res.status(500).json({ message: "Server internal errors !" });
}

export function invalidBodyRes(res: NextApiResponse) {
  return res.status(400).json({
    message: "Incorrect data type or missing field in the request body !",
  });
}
