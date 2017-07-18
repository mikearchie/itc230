var hotels = [
    {name: "The Yarrow", address: "1800 Park Ave, Park City, UT", cost: 150},
    {name: "Washington School House", address: "543 Park Ave, Park City, UT", cost: 400},
    {name: "Peaks", address: "2346 Park Avenue, Park City, UT", cost: 150}
];

exports.getAll = () => {
    return hotels;
}

exports.count = () => {
    return hotels.length;
}

exports.get = function(name) {
    for (let i = 0; i < hotels.length; i++) {
        if (hotels[i].name == name)
            return hotels[i];
    }
    return false;
}

exports.delete = function(name) {
    for (let i = 0; i < hotels.length; i++) {
        if (hotels[i].name == name)
            return hotels.splice(i, 1);
    }
    return false;
}


// console.log(this.getAll());
// console.log(this.get("The Yarrow"));
// console.log(this.delete("The Yarrow"));
// console.log(this.getAll());
