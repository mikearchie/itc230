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
let conn = mongoose.createConnection(credentials, options);
conn.on('error', console.error.bind(console, 'connection error:'));

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
//this can be merged to:
//module.exports = mongoose.model('Book', bookSchema);
