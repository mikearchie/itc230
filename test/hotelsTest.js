// Then create a test script file in your /test folder,
// with Mocha+Chai test cases for your 'get', 'add' and 'delete' data methods.
// For each method, provide tests for both success & failure conditions.
// All six test cases should pass when run via Mocha.

var expect = require("chai").expect;
var hotels = require("../lib/hotels.js");

describe('Hotels module', () => {
    // Further code for tests goes here
    it('Returns requested hotel', function() {
        let result = hotels.get("Peaks");
        expect(result).to.deep.equal({name: "Peaks", address: "2346 Park Avenue, Park City, UT", cost: 150});
    });

    it("Won't retrieve an an invalid hotel", function() {
        let result = hotels.get("Cockroach Hotel");
        expect(result).to.be.false;
    });

    it('Adds new hotel', function() {
        let result = hotels.add({name: "Home", address: "2802 Sunny Cloud, Park City, UT", cost: 0});
        expect(result).to.be.true;
    });

    it("Won't add a duplicate hotel", function() {
        let result = hotels.add({name: "Peaks", address: "2346 Park Avenue, Park City, UT", cost: 150});
        expect(result).to.be.false;
    });

    it('Deletes a hotel', function() {
        let preCount = hotels.count();
        let result = hotels.delete("Peaks");
        let postDiff = preCount - hotels.count();
        expect(postDiff).to.equal(1);
        expect(result).to.not.be.false;

    });

    it("Won't delete a non-existent hotel", function() {
        let result = hotels.delete("Hotel California");
        expect(result).to.be.false;
    });

});
