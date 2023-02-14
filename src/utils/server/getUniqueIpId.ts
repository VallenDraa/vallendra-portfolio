import { NextApiRequest } from "next";
import crypto from "crypto";

/**
 * Used for getting a unique user id based on their IP address
 * @param req
 * @returns hashed IP address that can act as a unique id
 */
export default function getUniqueIpId(req: NextApiRequest) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const uniqueId = crypto
    .createHash("md5")
    .update((ip as string) + process.env.IP_SALT)
    .digest("hex");

  return uniqueId;
}
