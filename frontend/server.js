const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Construct the file path
    const filePath = path.join(__dirname, 'app', req.url === '/' ? 'index.html' : req.url);

    // Determine the file extension to set the content type
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        default:
            contentType = 'text/html';
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Handle file not found error
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            } else {
                // Handle other errors
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            }
            return;
        }

        if (extname === '.html') {
            // Process SSI for HTML files
            const processedData = processSSI(data);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(processedData);
        } else {
            // Serve static files directly
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

function processSSI(data) {
    console.log("start ssi process");
    return data.replace(/<!--#include file="([^"]+)" -->/g, (match, filePath) => {
        try {
            const fullPath = path.join(__dirname, 'app', filePath);
            console.log('fullPath: ' + fullPath);
            return fs.readFileSync(fullPath, 'utf8');
        } catch (err) {
            return `<!-- Error including file: ${filePath} -->`;
        }
    });
}

const PORT = process.env.PORT || 4242;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
