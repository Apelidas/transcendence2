const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};


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

// const server = http.createServer((req, res) => {
//     // Default to index.html if the root URL is requested
//     let filePath = path.join(__dirname, 'app', req.url === '/' ? 'index.html' : req.url);
//     const extname = path.extname(filePath).toLowerCase();
//     const contentType = mimeTypes[extname] || 'application/octet-stream';
//
//     // Prevent directory traversal attacks
//     if (filePath.indexOf(path.join(__dirname, 'app')) !== 0) {
//         res.writeHead(403, { 'Content-Type': 'text/html' });
//         res.end('<h1>403 - Forbidden</h1>');
//         return;
//     }
//
//     fs.readFile(filePath, (err, content) => {
//         if (err) {
//             if (err.code === 'ENOENT') {
//                 // If the file is not found, serve a 404 page
//                 fs.readFile(path.join(__dirname, 'app', '404.html'), (err, content) => {
//                     res.writeHead(404, { 'Content-Type': 'text/html' });
//                     res.end(content, 'utf8');
//                 });
//             } else {
//                 // For other server errors, send a 500 status code
//                 res.writeHead(500);
//                 res.end(`Server Error: ${err.code}`);
//             }
//         } else {
//             // Serve the file with the correct content type
//             res.writeHead(200, { 'Content-Type': contentType });
//             res.end(content, 'utf8');
//         }
//     });
// });

const PORT = process.env.PORT || 4242;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
