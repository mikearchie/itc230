var Hotel = require('../models/hotel');

console.log('inside test');

Hotel.find((err, result) => {
    // console.log(err);
    console.log('inside find');
    if (err) console.log(err);
    console.log(result);
});
