import http from 'http';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

const client = require('./db');  // Adjust the path if necessary

const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    try {
        await client.connect();
        console.log("Connected successfully to database");
        // Database operations can go here
    } catch (e) {
        console.error(`Database connection failed: ${e}`);
    }

    let filePath = path.join(__dirname, '../client', req.url || '/', req.url === '/' ? 'index.html' : '');
    const ext = path.extname(filePath);
    let contentType = mime.lookup(ext) || 'text/html';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, '../client', '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
