"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mime_types_1 = __importDefault(require("mime-types"));
const client = require('./db');
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(async (req, res) => {
    try {
        await client.connect();
        console.log("Connected successfully to database");
    }
    catch (e) {
        console.error(`Database connection failed: ${e}`);
    }
    let filePath = path_1.default.join(__dirname, '../client', req.url || '/', req.url === '/' ? 'index.html' : '');
    const ext = path_1.default.extname(filePath);
    let contentType = mime_types_1.default.lookup(ext) || 'text/html';
    fs_1.default.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs_1.default.readFile(path_1.default.join(__dirname, '../client', '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            }
            else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
//# sourceMappingURL=app.js.map