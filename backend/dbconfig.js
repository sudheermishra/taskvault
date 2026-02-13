// import { MongoClient } from "mongodb";

// const url =
//   "mongodb+srv://sudheermishra8587:Dorian%408824@cluster0.iff6roc.mongodb.net/?appName=Cluster0";
// const dbName = "node-project";
// export const dbCollectionName = "todo";
// const client = new MongoClient(url);

// export const connection = async () => {
//   const connect = await client.connect();
//   return await connect.db(dbName);
// };

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

export const dbCollectionName = "todo";

const client = new MongoClient(url);

export const connection = async () => {
  const connect = await client.connect();
  return connect.db(dbName);
};
