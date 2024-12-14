const http = require('http');
const fs = require('fs');
const path = require('path');

const Locations = [
    '/',
    '/home',
    '/about',
    '/games',
    '/profile',
    '/games/pong',
    '/games/history',
    '/games/pong/pongpvp', //the whole SPA
    '/games/pong/pongai',  //the whole SPA
    '/games/pong/pongtourn', //the whole SPA
    '/games/tictactoe', //> 404
    '/games/tictactoe/tictactoepvp', //> 404
    '/games/tictactoe/tictactoeai', //> 404
    '/games/tictactoe/tictactoetourn', //> 404
];

function findValidPath(filePath) {
    if (fs.existsSync(filePath)) {
        return filePath
    }
    const segments = filePath.split('/');

    for (let i = 0; i < segments.length; i++) {
        const slicedPath = segments.slice(i).join(path.sep);
        console.log('checking: ' + slicedPath);
        const newPath = path.join(__dirname, 'app', slicedPath);
        if (fs.existsSync(newPath)) {
            return slicedPath;
        }
    }

    return '';
}


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


const server = http.createServer((request, response) => {
    console.log('request url: ' + request.url);
    let url = request.url.endsWith('/') && request.url !== '/' ? request.url.slice(0, -1) : request.url;
    let lowUrl = url.toLowerCase();
    console.log('url before: ' + url);
    url = findValidPath(url);
    console.log('url after: ' + url);

    const filePath = path.join(__dirname, 'app', Locations.includes(lowUrl) ? 'index.html' : url);
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
