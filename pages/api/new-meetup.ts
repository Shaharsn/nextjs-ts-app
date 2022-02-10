import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { Meetup } from "../../types/types";

interface IResData {
  message: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<IResData>) => {
  if (req.method === "POST") {
    const data = req.body;

    // will run just on the server side so no problem to add credentials here
    const client = await MongoClient.connect(
      "mongodb+srv://shaharsn:shahar300688@cluster0.hxgsc.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "meetup inserted!" });
  }
};
export default handler;
