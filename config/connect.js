"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dbConfig = require('./db');
const client = new mongodb_1.MongoClient(dbConfig.URI);
async function connect() {
    try {
        console.log("Attempting to connect to the database...");
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db();
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}
exports.default = connect;
//# sourceMappingURL=connect.js.map