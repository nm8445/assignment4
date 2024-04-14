"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const url = __importStar(require("url"));
const mime = __importStar(require("mime-types"));
const db_1 = require("./config/db");
const login_1 = require("./scripts/login");
const lookup = mime.lookup;
const port = process.env.PORT || 3000;
db_1.client.connect().then(() => {
    console.log("Connected to MongoDB at MongoDb Atlas");
    const server = http.createServer(async (req, res) => {
        const parsedUrl = url.parse(req.url || "", true);
        let pathname = parsedUrl.pathname || "/";
        pathname = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
        let filePath = path.join(__dirname, pathname);
        console.log("Requested path:", pathname);
        if (req.method === "POST" && pathname === "/login") {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { username, password } = JSON.parse(body);
                    const user = await (0, login_1.authenticateUser)(username, password);
                    if (user) {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: "Login successful" }));
                    }
                    else {
                        res.writeHead(401, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: "Invalid credentials" }));
                    }
                }
                catch (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Internal Server Error", error: error.message }));
                }
            });
        }
        else {
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.log("Error statting file:", err);
                    res.writeHead(404);
                    res.end("Error 404 - File Not Found");
                    return;
                }
                if (stats.isDirectory()) {
                    filePath = path.join(filePath, 'index.html');
                }
                fs.readFile(filePath, function (err, data) {
                    if (err) {
                        console.log("Error reading file:", err);
                        res.writeHead(404);
                        res.end("Error 404 - File Not Found");
                        return;
                    }
                    const mime_type = lookup(path.extname(filePath)) || 'text/plain';
                    res.setHeader("X-Content-Type-Options", "nosniff");
                    res.writeHead(200, { 'Content-Type': mime_type });
                    res.end(data);
                });
            });
        }
    });
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    });
}).catch(err => {
    console.error("Could not connect to the database", err);
});
//# sourceMappingURL=server.js.map