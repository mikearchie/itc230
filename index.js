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
var hotels = require("./lib/hotels");

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
    console.log(req.body.hotelSearchText);
    var result = hotels.get(req.body.hotelSearchText);
    console.log(result);
    res.render("details", {name: req.body.hotelSearchText, result: result, hotels: hotels.getAll()});
});

// app.post('/delete', function(req,res) {
//     // res.writeHead(200, {'Content-Type': 'text/plain'});
//     // let result1 = hotels.delete(params.name);
//     // let resultString1 = ((result1) ? JSON.stringify(result1) + " removed. ":
//     //     "Hotel not found. Nothing deleted. ") + hotels.count() + " total hotels.";
//     // res.render(resultString1);
// });

app.listen(3000);
