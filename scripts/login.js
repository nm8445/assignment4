"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const mongodb_1 = require("mongodb");
const uri = "mongodb+srv://natejaden:friedchicken69@atlascluster.pzi4n5v.mongodb.net/";
const client = new mongodb_1.MongoClient(uri);
async function authenticateUser(username, password) {
    try {
        await client.connect();
        const database = client.db("contacts");
        const users = database.collection("contacts");
        const user = await users.findOne({ username: username, password: password });
        return user;
    }
    finally {
        await client.close();
    }
}
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=login.js.map