import { MongoClient, ServerApiVersion } from "mongodb";

const uri: string = process.env.MONGODB_URI ?? "";

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the environment variables.");
}

let client: MongoClient | null = null;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    try {
      await client.connect();
      console.log("Conexão estabelecida com MongoDB!");
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
      client = null;
      throw error;
    }
  }

  return client;
}
