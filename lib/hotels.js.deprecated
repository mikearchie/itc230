let hotels = [
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
        if (hotels[i].name.toLowerCase() == name.toLowerCase())
            return hotels[i];
    }
    return false;
}

exports.delete = function(name) {
    for (let i = 0; i < hotels.length; i++) {
        if (hotels[i].name.toLowerCase() == name.toLowerCase())
            return hotels.splice(i, 1);
    }
    return false;
}

exports.add = function(hotel) {
    //if name is provided, and it is not already in hotels, add to hotels
    if (hotel.name && !this.get(hotel.name)) {
        hotels.push(hotel);
        return true;
    }
    return false;
}
