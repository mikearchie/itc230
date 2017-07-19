'use strict'
const hotels = require("./lib/hotels");
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

app.use(require("body-parser").urlencoded({extended: true}));
app.engine(".html", handlebars({extname: '.html'}));
//specify that view uses html files only
app.set("view engine", ".html");

//home page
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/home.html');
});

//process client hotel search using POST
app.post('/details', function(req,res) {
    console.log(req.body.hotelSearchText);
    var result = hotels.get(req.body.hotelSearchText);
    //render results using handlebars template (\view\details.html)
    //result contains hotel object that was found
    res.render("details", {name: req.body.hotelSearchText, result: result, hotels: hotels.getAll()});
});

//process client deletion action using GET
app.get('/delete', function(req,res) {
    let nameToDelete = req.param('name');
    let result = hotels.delete(nameToDelete);
    //render results using handlebars template (\view\delete.html)
    //result contains the remainder of the hotels array
    res.render("delete", {name: nameToDelete, result: result, count: hotels.count()});
});

app.listen(3000);
