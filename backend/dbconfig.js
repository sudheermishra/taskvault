import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://sudheermishra8587:Dorian%408824@cluster0.iff6roc.mongodb.net/?appName=Cluster0";
const dbName = "node-project";
export const dbCollectionName = "todo";
const client = new MongoClient(url);

export const connection = async () => {
  const connect = await client.connect();
  return await connect.db(dbName);
};
