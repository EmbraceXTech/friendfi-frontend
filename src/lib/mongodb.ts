import { Db, MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

let cachedClient: MongoClient;
let cachedDb: Db;

export async function mongo() {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }

  if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
  }

  let client = new MongoClient(MONGODB_URI);
  try {
    await client.connect();
    let db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return {
      client: cachedClient,
      db: cachedDb,
    };
  } catch (e) {
    await client.close();
    throw e;
  }
}
