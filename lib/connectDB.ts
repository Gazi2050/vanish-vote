import { Db, MongoClient, ServerApiVersion } from "mongodb";

let db: Db | undefined;
export const connectDB = async () => {
    if (db) {
        return db;
    } else {
        const url = process.env.NEXT_PUBLIC_MONGODB_URL;
        if (!url) {
            throw new Error("MongoDB URL is not defined in environment variables");
        }
        const client = new MongoClient(url, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        await client.connect()
        db = client.db("vanish-vote-database");
        return db;
    }
}