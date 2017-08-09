'use strict';
module.exports = (app, Hotel) => {
    //home page
    app.get('/', (req, res) => {
        // res.sendFile(__dirname + '/public/home.html');
        Hotel.find((err,items) => {
            if (err) {
                console.log('error finding item(s): ' + err);
                return next(err);
            }
            res.render("home", {hotels : items});
            console.log('Total documents in Hotel collection: ' + items.length);
        });
    });

    //process client hotel search using POST (e.g. search result)
    app.post('/details', (req, res) => {
        let searchName = req.body.hotelSearchText;
        //create regex to ignore lowercase
        let nameRegExp = new RegExp(searchName, "i");
        // let result = hotels.get(searchName);
        Hotel.findOne({name: {$regex: nameRegExp}}, function(err, hotel) {
            Hotel.find((err,items) => {
                //render results using handlebars template (\view\details.html)
                //result contains hotel object that was found
                res.render("details", {name: searchName, result: hotel, hotels: items});
            });
        });
        // res.render("details", {name: searchName, result: result, hotels: hotels.getAll()});
    });

    //process client hotel selection using GET (e.g. clicking a link)
    app.get('/details', (req, res) => {
        let queryName = req.query.name;
        //create regex to ignore lowercase
        let nameRegExp = new RegExp(queryName, "i");
        // let result = hotels.get(name);
        //render results using handlebars template (\view\details.html)
        //result contains hotel object that was found
        Hotel.findOne({name: {$regex: nameRegExp}}, function(err, hotel) {
            Hotel.find((err,items) => {
                res.render("details", {name: queryName, result: hotel, hotels: items});
            });
        });
    });

    //process client deletion action using GET
    app.get('/delete', (req, res) => {
        let nameToDelete = req.query.name;
        // let result = hotels.delete(nameToDelete);

        //render results using handlebars template (\view\delete.html)
        //result contains deleted hotel. items contains the remaining docs in collection
        Hotel.findOneAndRemove({name: nameToDelete}, (err, hotel) => {
            Hotel.find((err,items) => {
                res.render("delete", {name: nameToDelete, result: hotel,
                    hotels: items, count: items.length});
            });
        });
        // res.render("delete", {name: nameToDelete, result: result,
        //     hotels: hotels.getAll(), count: hotels.count()});
    });

    app.get('/api/v1/hotels', (req, res) => {
        Hotel.find((err,items) => {
            if (items)
                res.json(items);
            else
                return res.status(500).send('Error occurred: database error.');
        });
    });
};
