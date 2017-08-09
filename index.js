'use strict';
// const hotels = require("./lib/hotels");
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Hotel = require('./models/hotel.js');


app.use(require("body-parser").urlencoded({extended: true}));
app.engine(".html", handlebars({extname: '.html'}));
//specify that view uses html files only
app.set("view engine", ".html");

const routes = require('./routes.js')(app, Hotel); // pass ‘app’ instance to the routes module

app.listen(3000);
