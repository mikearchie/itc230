var mongoose = require('mongoose');
// remote db connection settings. For security, connectionString should be in a separate file not committed to git
// var connectionString = "mongodb://<USER>:<PASSWORD>@ds015962.mlab.com:15962/<DB_NAME>";
let credentials = require('../lib/credentials.js'); //contains connectionString
let options = {
    useMongoClient: true,
    keepAliveInitialDelay: 1,
    connectTimeoutMS: 30000
};

// mongoose.connect(credentials.connectionString, options);
//
// // local db connection settings
// // var ip = process.env.ip || '127.0.0.1';
// // mongoose.connect('mongodb://' +ip+ '/<DB_NAME>');
//
// var conn = mongoose.connection;
// let conn = mongoose.createConnection(credentials, options);
mongoose.connect(credentials, options);
let conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

mongoose.Promise = require('bluebird');
// define Book model in JSON key/value pairs
// values indicate the data type of each key
//you can also type: let mySchema = new mongoose.Schema(options);
let hotelSchema = mongoose.Schema({
     name: { type: String, required: true },
     address: String,
     cost: Number,
     constructionDate: Date,
     luxuryFlag: Boolean
});

let hotelModel = mongoose.model('Hotel', hotelSchema);
module.exports = hotelModel;

// un-comment the following lines to re-add all 3 default hotel documents
// let yarrowConstDate = new Date(8000);
// let hotels = [
//     {name: "The Yarrow", address: "1800 Park Ave, Park City, UT", cost: 150, luxuryFlag: 1, constructionDate: yarrowConstDate},
//     {name: "Washington School House", address: "543 Park Ave, Park City, UT", cost: 400},
//     {name: "Peaks", address: "2346 Park Avenue, Park City, UT", cost: 150}
// ];
// hotelModel.insertMany(hotels, function(err, docs) {});

//an alternative that adds a single document:
// let hotelDocument = new Hotel({name: "The Yarrow", address: "1800 Park Ave, Park City, UT", cost: 150});
// // hotelDocument.save();
// hotelDocument.save(function (err) {
//      if (err) console.log('Unable to add hotel document');
// });
