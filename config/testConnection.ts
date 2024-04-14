// testConnection.ts
import connect from './connect';

async function testDatabaseConnection() {
    try {
        const db = await connect();
        if (db) {
            console.log('Database connection is successful!');
        }
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

testDatabaseConnection();
