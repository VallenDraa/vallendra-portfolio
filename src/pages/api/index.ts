import { NextApiHandler } from "next";
import { incApiVisitors } from "server/service/apiVisitor.service";
import { internalServerErrorRes } from "server/error/response.error";
import getRandomMessage from "utils/data/apiPageMessages";
import apiDocs from "utils/data/apiDocs";

const handler: NextApiHandler = async (req, res) => {
  /* increment and fetch api visitor data
  ======================================= */
  try {
    const data = await incApiVisitors();

    if (!data) {
      internalServerErrorRes(res);
      return;
    }

    res.json({
      apiVisitors: data?.visitors,
      message: getRandomMessage(),
      ...apiDocs,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    internalServerErrorRes(res);
  }
};

export default handler;
