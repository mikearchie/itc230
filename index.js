'use strict'
var http = require("http");
var fs = require('fs');
var querystring = require('querystring');
var housing = require("./lib/housing");

function serveStatic(res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    console.log(__dirname + path);
    fs.readFile(__dirname + path, function(err, data){
        if(err) {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
        }
        else {
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    })
}

http.createServer(function(req,res) {
    let url = req.url.split("?");
    let params = querystring.parse(url[1]);
    let path = url[0].toLowerCase();

    switch(path) {
    case '/':
        serveStatic(res, '/public/home.html', 'text/html');
        break;
    case '/about':
        serveStatic(res, '/package.json', 'text/plain');
        break;
    case '/get':
        res.writeHead(200, {'Content-Type': 'text/plain'});
        let result = housing.get(params.name);
        let resultString = result ? JSON.stringify(result) : "Hotel not found";
        res.write("Searching for " + params.name + '\n');
        res.end(resultString);
        break;
    case '/getall':
        res.writeHead(200, {'Content-Type': 'text/plain'});
        let resultString2 = JSON.stringify(housing.getAll());
        res.end(resultString2);
        break;
    case '/delete':
        res.writeHead(200, {'Content-Type': 'text/plain'});
        let result3 = housing.delete(params.name);
        let resultString3 = ((result3) ? JSON.stringify(result3) + " removed. ":
            "Hotel not found. Nothing deleted. ") + housing.count() + " total hotels.";
        res.end(resultString3);
        break;
    case '/add':
        res.writeHead(200, {'Content-Type': 'text/plain'});
        let prevCount = housing.count();
        let newCount = housing.add(params);
        // let resultString4 = ((newCount > prevCount) ? "Adding item: " params.name :
        //     "No item added") + '\n' + housing.count() + " total hotels." ;
        let resultString4 = ((newCount > prevCount) ? "Added item: " + JSON.stringify(params) :
            "No item added") + '\n' + housing.count() + " total hotels." ;
        res.end(resultString4);
    break;
    default:
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found');
        break;
    }
}).listen(process.env.PORT || 3000);
