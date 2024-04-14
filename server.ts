"use strict";

import * as http from "http";
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';
import * as mime from 'mime-types';
import { client } from './config/db';  // Make sure this is imported correctly
import { authenticateUser } from './scripts/login';  // Ensure path is correct

const lookup = mime.lookup;
const port = process.env.PORT || 3000;

client.connect().then(() => {
    console.log("Connected to MongoDB at MongoDb Atlas");

    const server = http.createServer(async (req, res) => {
        const parsedUrl = url.parse(req.url || "", true); // Provide "" as a fallback
        let pathname = parsedUrl.pathname || "/";

        // Normalize the path to prevent directory traversal
        pathname = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
        let filePath = path.join(__dirname, pathname);
        console.log("Full file path:", filePath); // Debug log

        if (req.method === "POST" && pathname === "/login") {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    const { username, password } = JSON.parse(body);
                    const user = await authenticateUser(username, password);
                    if (user) {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ message: "Login successful" }));
                    } else {
                        res.writeHead(401, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({ message: "Invalid credentials" }));
                    }
                } catch (error) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({ message: "Internal Server Error", error: error.message }));
                }
            });
        } else {
            // Serve static files
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.log("Error statting file:", err); // Debug log
                    res.writeHead(404);
                    res.end("Error 404 - File Not Found");
                    return;
                }

                if (stats.isDirectory()) {
                    filePath = path.join(filePath, 'index.html'); // Serve 'index.html' for directories
                }

                fs.readFile(filePath, function(err, data) {
                    if (err) {
                        console.log("Error reading file:", err); // Debug log
                        res.writeHead(404);
                        res.end("Error 404 - File Not Found");
                        return;
                    }
                    const mime_type = lookup(path.extname(filePath)) || 'text/plain';
                    res.setHeader("X-Content-Type-Options", "nosniff");
                    res.writeHead(200, {'Content-Type': mime_type});
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
