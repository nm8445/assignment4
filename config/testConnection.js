"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("./connect"));
async function testDatabaseConnection() {
    try {
        const db = await (0, connect_1.default)();
        if (db) {
            console.log('Database connection is successful!');
        }
    }
    catch (error) {
        console.error('Database connection failed:', error);
    }
}
testDatabaseConnection();
//# sourceMappingURL=testConnection.js.map