'use strict'
// var app = include('express');
var express = require('express');
var app = express();
let handlebars = require('express-handlebars');

app.use(require("body-parser").urlencoded({extended: true}));

// var path = require('path');
// var http = require('http');
// var fs = require('fs');
// var querystring = require('querystring');
var housing = require("./lib/hotels");

app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

//note: you can specify that views us a file extension other than 'html' if desired
app.get('/', function(req, res){
    // res.set('Content-Type')
    res.sendFile(__dirname + '/public/home.html');
});

//The Express render method sends a view in the client response:
//Express has an ejs
app.post('/detail', function(req,res) {
    console.log(req.body);
    console.log(req.body.mySearchText);
    var result = housing.get(req.body.mySearchText);
    console.log(result);
    res.render("detail", {Name: req.body.mySearchText, result: result, hotels: housing.getAll()});

});

app.listen(3000);


//
// function serveStatic(res, path, contentType, responseCode) {
//     if(!responseCode) responseCode = 200;
//     console.log(__dirname + path);
//     fs.readFile(__dirname + path, function(err, data){
//         if(err) {
//             res.writeHead(500, {'Content-Type': 'text/plain'});
//             res.end('Internal Server Error');
//         }
//         else {
//             res.writeHead(responseCode, {'Content-Type': contentType});
//             res.end(data);
//         }
//     })
// }
//
// http.createServer(function(req,res) {
//     let url = req.url.split("?");
//     let params = querystring.parse(url[1]);
//     let path = url[0].toLowerCase();
//
//     switch(path) {
//     case '/':
//         serveStatic(res, '/public/home.html', 'text/html');
//         break;
//     case '/about':
//         serveStatic(res, '/package.json', 'text/plain');
//         break;
//     case '/get':
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         let result = housing.get(params.name);
//         let resultString = result ? JSON.stringify(result) : "Hotel not found";
//         res.end(resultString);
//         break;
//     case '/getall':
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         let resultString2 = JSON.stringify(housing.getAll());
//         res.end(resultString2);
//         break;
//     case '/delete':
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         let result3 = housing.delete(params.name);
//         let resultString3 = (result3) ? "Deleted: " + JSON.stringify(result3) : "Hotel not found. Nothing deleted.";
//         res.end(resultString3);
//         break;
//     default:
//         res.writeHead(404, {'Content-Type': 'text/plain'});
//         res.end('Not found');
//         break;
//     }
// }).listen(process.env.PORT || 3000);
//
