
import { MongoClient, Db, Collection } from 'mongodb';

const uri: string = "mongodb+srv://natejaden:friedchicken69@atlascluster.pzi4n5v.mongodb.net/";
const client: MongoClient = new MongoClient(uri);

interface User {
    username: string;
    password: string;
}

async function authenticateUser(username: string, password: string): Promise<User | null> {
    try {
        await client.connect();
        const database: Db = client.db("contacts");
        const users: Collection<User> = database.collection("contacts");

        const user: User | null = await users.findOne({ username: username, password: password });
        return user;

    } finally {
        await client.close();
    }
}

export { authenticateUser, User };
