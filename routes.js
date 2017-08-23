'use strict';
module.exports = (app, Hotel) => {
    app.use('/api', require('cors')()); // set Access-Control-Allow-Origin header for api route
    //home page
    app.get('/', (req, res) => {
        // res.sendFile(__dirname + '/public/home.html');
        Hotel.find((err,items) => {
            if (err) {
                console.log('error finding item(s): ' + err);
                return next(err);
            }
            res.render("homeSPA", {hotels : JSON.stringify(items)});
            console.log('Total documents in Hotel collection: ' + items.length);
        });
    });

    //process client hotel search using POST (e.g. search result)
    app.post('/details', (req, res) => {
        let searchName = req.body.hotelSearchText;
        //create regex to ignore lowercase
        let nameRegExp = new RegExp(searchName, "i");
        Hotel.findOne({name: {$regex: nameRegExp}}, function(err, hotel) {
            Hotel.find((err,items) => {
                if (err) {
                    console.log('error finding item(s): ' + err);
                    return next(err);
                }
                //render results using handlebars template (\view\details.html)
                //result contains hotel object that was found
                res.render("details", {name: searchName, result: hotel, hotels: items});
            });
        });
    });

    //process client hotel selection using GET (e.g. clicking a link)
    app.get('/details', (req, res) => {
        let queryName = req.query.name;
        //create regex to ignore lowercase
        let nameRegExp = new RegExp(queryName, "i");
        //result contains hotel object that was found
        Hotel.findOne({name: {$regex: nameRegExp}}, function(err, hotel) {
            Hotel.find((err,items) => {
                //render results using handlebars template (\view\details.html)
                res.render("details", {name: queryName, result: hotel, hotels: items});
            });
        });
    });

    //process client deletion action using GET
    app.get('/delete', (req, res) => {
        let nameToDelete = req.query.name;

        //delete the requested hotel document
        Hotel.findOneAndRemove({name: nameToDelete}, (err, hotel) => {
            //get all the hotels in order to render the delete page
            Hotel.find((err,items) => {
                //render results using handlebars template (\view\delete.html)
                //"result" is the deleted hotel. "hotels" contains the remaining docs in collection
                res.render("delete", {name: nameToDelete, result: hotel,
                    hotels: items, count: items.length});
            });
        });
    });

    //get all hotels in the collection via API
    app.get('/api/v1/hotels', (req, res) => {
        Hotel.find((err,items) => {
            if (items)
                // res.json(items);
                res.json(items.map((a) => {
                    // return only public hotel attributes
                    return {
                      name: a.name,
                      address: a.address,
                      cost: a.cost,
                      luxuryFlag: a.luxuryFlag
                    };
                }));
            else
                return res.status(500).send('Error occurred: database error.');
        });
    });

    //get a single hotel via API
    app.get('/api/v1/hotels/:name', (req, res) => {
        let nameToFind = req.params.name;
        let nameRegExp = new RegExp(nameToFind, "i");
        Hotel.find({name: {$regex: nameRegExp}}, (err,items) => {
            if (items) {
                if (items.length > 0) {
                    res.json({name: items[0].name,
                        address: items[0].address,
                        cost: items[0].cost,
                        luxuryFlag: items[0].luxuryFlag});
                }
                else
                    res.status(404).send('Hotel not found');
            }
            else
                res.status(500).send('Error occurred: database error.');
        });
    });

    //process client deletion action using GET via API.
    //response is JSON for the document removed
    app.get('/api/v1/hotels/delete/:name', (req, res) => {
        let nameToDelete = req.params.name;
        //delete the requested hotel document
        Hotel.findOneAndRemove({name: nameToDelete}, (err, hotel) => {
            if (hotel)
                res.json(hotel);
            else if (!err)
                res.status(404).send('Hotel not found. Nothing deleted');
            else
                res.status(500).send('Error occurred: database error.');
        });
    });

    //use post to add new document to database with API
    app.get('/api/v1/hotels/add/:name.:address.:cost.:constructDate.:luxuryFlag', (req, res) => {
        let hotelDocument = new Hotel({name: req.params.name,
            address: req.params.address,
            cost: req.params.cost,
            constructionDate: req.params.constructDate,
            luxuryFlag: req.params.luxuryFlag
        });
        let savePromise = hotelDocument.save(function (err) {
             if (err)
                res.status(500).send('Error occured: database error');
        });
        savePromise.then(resolveResult => {
            //resolved
            res.json(resolveResult);
        });
    });

};
