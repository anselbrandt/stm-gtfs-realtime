import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import pkg from "protobufjs";
import gtfs from "../../../protobuf/gtfs.json";
import { APIKEY } from "../../../utils/constants";
const { Root } = pkg;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const headers = req.headers;
    const url = headers.url;
    const apikey = headers.apikey || APIKEY;
    const schema = await Root.fromJSON(gtfs);
    const FeedMessage = schema.lookupType("transit_realtime.FeedMessage");
    const response = await fetch(url as string, {
      method: "GET",
      headers: {
        apikey: apikey as string,
      },
    });
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const array = new Uint8Array(arrayBuffer);
      const decoded = FeedMessage.decode(array);
      res.status(200).json(decoded);
    } else {
      const text = response.statusText;
      res.status(response.status).send(text);
    }
  } catch (err) {
    res.status(400).send("Bad Request");
  }
};

export default handler;
