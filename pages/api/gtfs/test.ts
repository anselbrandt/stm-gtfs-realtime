import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import pkg from "protobufjs";
const { Root } = pkg;
import { APIKEY } from "../../../utils/constants";
import gtfs from "../../../protobuf/gtfs.json";

const STMKEY = APIKEY;
const URL = "https://api.stm.info/pub/od/gtfs-rt/ic/v2/vehiclePositions";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const schema = await Root.fromJSON(gtfs);
    const FeedMessage = schema.lookupType("transit_realtime.FeedMessage");
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        apikey: STMKEY,
      },
    });
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const array = new Uint8Array(arrayBuffer);
      const decoded = FeedMessage.decode(array);
      res.status(200).send(decoded);
    } else {
      const text = response.statusText;
      res.status(response.status).send(text);
    }
  } catch (err) {
    res.status(400).send("Bad Request");
  }
};

export default handler;
