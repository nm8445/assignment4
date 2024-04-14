// database.ts
import { MongoClient } from 'mongodb';
const dbConfig = require('./db');

const client = new MongoClient(dbConfig.URI);

async function connect() {
    try {
        console.log("Attempting to connect to the database...");
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(); // Return the database connection
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit the application if the connection fails
    }
}

export default connect;
