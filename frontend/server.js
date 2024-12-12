const http = require('http');
const fs = require('fs');
const path = require('path');

const Locations = [
    '/',
    '/home',
    '/about',
    '/profile',
    '/games',
    '/games/pong',
    '/games/tic-tac-toe',
    '/games/history',
    '/login',
    '/signup',
];

function getContentType(extname) {

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
    }
    console.log('for ' + extname + ': ' + contentType );
    return contentType;
}

function extractLastSegment(path) {
    const segments = path.split('/');
    return '/' + segments.pop();
}

function countSlashes(inputString) {
    let count = 0;
    for (let char of inputString) {
        if (char === '/') {
            count++;
        }
    }

    return count;
}

const server = http.createServer((request, response) => {
    console.log('request url: ' + request.url);
    let url = request.url.endsWith('/') && request.url !== '/' ? request.url.slice(0, -1) : request.url;
    console.log('url before: ' + url);

    if (url.startsWith('/games/') && !url.startsWith('/games/pong') && !url.startsWith('/games/tic') && !url.startsWith('/games/selection') && !url.startsWith('/games/history')){
        url = url.slice(6);
    }
    console.log('url after: ' + url);

    const filePath = path.join(__dirname, 'app', Locations.includes(url) ? 'index.html' : url);
    const extname = path.extname(filePath);

    let contentType = getContentType(extname);

    if(extname === '.png' || extname === '.jpeg' || extname === '.jpg' || extname === '.gif'){
        readPictures(contentType, filePath, response)
    }
    else {
        readText(extname, contentType, filePath, response)
    }
    console.log('');
});

function error(err, response) {
    if (err.code === 'ENOENT') {
        // Handle file not found error
        const errorFilePath = path.join(__dirname, 'app', 'error', '404.html');
        fs.readFile(errorFilePath, 'utf8', (err, data) => {
            if (err) {
                error(err, response);
                return;
            }
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    } else {
        // Handle other errors
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.end('Server Error');
    }
}

function readText(extname, contentType, filePath, response){
    console.log('reading: ' + filePath);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log('encountered error: ' + err);
            error(err, response);
            return;
        }

        if (extname === '.html') {
            // Process SSI for HTML files
            const processedData = processSSI(data);
            response.writeHead(200, {'Content-Type': contentType});
            response.end(processedData);
        } else {
            // Serve static files directly
            response.writeHead(200, {'Content-Type': contentType});
            response.end(data);
        }
    });
}

function readPictures(contentType, filePath, response) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            error(err, response);
            return;
        }

        // Serve static files directly
        response.writeHead(200, {'Content-Type': contentType});
        response.end(data);
    });
}

function processSSI(data) {
    return data.replace(/<!--#include file="([^"]+)" -->/g, (match, filePath) => {
        try {
            const fullPath = path.join(__dirname, 'app', filePath);
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
