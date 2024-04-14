
// db.ts
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://natejaden:friedchicken69@atlascluster.pzi4n5v.mongodb.net/";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export { client }; // Named export of 'client'


