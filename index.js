'use strict'
// const hotels = require("./lib/hotels");
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Hotel = require('./models/hotel.js');

app.use(require("body-parser").urlencoded({extended: true}));
app.engine(".html", handlebars({extname: '.html'}));
//specify that view uses html files only
app.set("view engine", ".html");

//home page
app.get('/', function(req, res) {
    // res.sendFile(__dirname + '/public/home.html');
    Hotel.find(function(err,items) {
        if (err) {
            console.log('error finding item(s): ' + err);
            return next(err);
        }
        res.render("home", {hotels : items});
        console.log('Total documents in Hotel collection: ' + items.length);
    });
});

//process client hotel search using POST (e.g. search result)
app.post('/details', function(req,res) {
    let searchName = req.body.hotelSearchText;
    // let result = hotels.get(searchName);
    Hotel.find({name: searchName}, function(err, item) {
        Hotel.find(function(err,items) {
            res.render("details", {name: searchName, result: item[0], hotels: items});
        });

    });
    // let result =
    // //render results using handlebars template (\view\details.html)
    // //result contains hotel object that was found
    // res.render("details", {name: searchName, result: result, hotels: hotels.getAll()});
});

// //process client hotel selection using GET (e.g. clicking a link)
// app.get('/details', function(req,res) {
//     let name = req.query.name;
//     let result = hotels.get(name);
//     //render results using handlebars template (\view\details.html)
//     //result contains hotel object that was found
//     res.render("details", {name: name, result: result, hotels: hotels.getAll()});
// })
//
// //process client deletion action using GET
// app.get('/delete', function(req,res) {
//     let nameToDelete = req.query.name;
//     let result = hotels.delete(nameToDelete);
//     //render results using handlebars template (\view\delete.html)
//     //result contains the remainder of the hotels array
//     res.render("delete", {name: nameToDelete, result: result,
//         hotels: hotels.getAll(), count: hotels.count()});
// });

app.listen(3000);
