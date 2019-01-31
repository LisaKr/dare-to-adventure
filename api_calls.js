const https = require("https");
const secrets = require("./secrets.json");
const { promisify } = require("util");


/////////////////////////////////GET CITY BACKGROUND FROM PEXELS///////////////////////////////////////////////
module.exports.getCityPicsPexels = promisify(function getCityPicsPexels(city, cb) {

    let options = {
        method: "GET",
        host: "api.pexels.com",
        path: encodeURI("/v1/search?query=" + city + "&per_page=1&page=1"),
        headers: {
            Authorization: `${secrets.pexels_api}`
        }
    };

    let callback = resp => {
        if (resp.statusCode != 200) {
            cb(resp.statusCode);
            return;
        }
        let body = "";
        resp.on("data", chunk => {
            body += chunk;
        });
        resp.on("end", () => {
            let parsedBody = JSON.parse(body);
            //just to adjust to Pexels switching the order of Berlin search results
            // if (city == "Berlin") {
            //     let imgurl = parsedBody.photos[1].src.original;
            //     cb(null, imgurl);
            // } else {
            let imgurl = parsedBody.photos[0].src.original;
            cb(null, imgurl);
            // }
        });
    };

    const req = https.request(options, callback);
    req.end();

});
//////////////////////////////////////////////////////////////////

////////////////////////////////GETTING CATEGORY RESULTS////////////////////////////////////

module.exports.getVenuesRecommendationEndpoint = promisify(function getVenues(lat, lng, city, intent, offset, distance, cb) {

    let options;

    city = city.replace(/ /g, '+');

    if (arguments[0] == "undefined" || arguments[1] == "undefined") {
        console.log("lat and lng are undefined");
        options = {
            method: "GET",
            host: "api.foursquare.com",
            path: `/v2/search/recommendations?intent=${intent}&near=${city}&offset=${offset}&radius=${distance}&limit=10&client_id=${
                secrets.id
            }&client_secret=${secrets.secret}&v=20190110`
        };
    } else {
        options = {
            method: "GET",
            host: "api.foursquare.com",
            path: `/v2/search/recommendations?intent=${intent}&ll=${lat},${lng}&offset=${offset}&radius=${distance}&limit=10&client_id=${
                secrets.id
            }&client_secret=${secrets.secret}&v=20190110`
        };
    }

    let callback = resp => {
        if (resp.statusCode != 200) {
            cb(resp.statusCode);
            return;
        }

        let body = "";
        resp.on("data", chunk => {
            body += chunk;
        });
        resp.on("end", () => {
            let parsedBody = JSON.parse(body);

            ////////////this is for recommendations endpoint////////
            let venueObj = [];
            for (var i=0; i<parsedBody.response.group.results.length; i++) {
                // console.log("test in the api for loop", parsedBody.response.group.results[i].venue.name);
                venueObj.push({
                    id: parsedBody.response.group.results[i].venue.id,
                    name: parsedBody.response.group.results[i].venue.name,
                    location: parsedBody.response.group.results[i].venue.location.address,
                    deletable: false,
                    activity: parsedBody.response.group.results[i].venue.name + " || " + parsedBody.response.group.results[i].venue.location.address
                });
            }
            cb(null, venueObj);
        });
    };

    const req = https.request(options, callback);
    req.end();
});

module.exports.getVenuesExploreEndpoint = promisify(function getVenues(lat, lng, city, category, offset, distance, cb) {

    let options;

    city = city.replace(/ /g, '+');

    if (arguments[0] == "undefined" || arguments[1] == "undefined") {
        options = {
            method: "GET",
            host: "api.foursquare.com",
            path: `/v2/venues/explore?categoryId=${category}&near=${city}&offset=${offset}&radius=${distance}&limit=10&client_id=${
                secrets.id
            }&client_secret=${secrets.secret}&v=20190110`
        };
    } else {
        options = {
            method: "GET",
            host: "api.foursquare.com",
            path: `/v2/venues/explore?categoryId=${category}&ll=${lat},${lng}&offset=${offset}&radius=${distance}&limit=10&client_id=${
                secrets.id
            }&client_secret=${secrets.secret}&v=20190110`
        };
    }

    let callback = resp => {
        if (resp.statusCode != 200) {
            cb(resp.statusCode);
            return;
        }
        let body = "";
        resp.on("data", chunk => {
            body += chunk;
        });
        resp.on("end", () => {
            let parsedBody = JSON.parse(body);
            /////////////////////////////////////////////////////////////////
            //this is for the explore endpoint!

            let venueObj = [];

            for (var i=0; i<parsedBody.response.groups[0].items.length; i++) {
                venueObj.push({
                    id: parsedBody.response.groups[0].items[i].venue.id,
                    name: parsedBody.response.groups[0].items[i].venue.name,
                    location: parsedBody.response.groups[0].items[i].venue.location.address,
                    deletable: false,
                    activity: parsedBody.response.groups[0].items[i].venue.name + " || " + parsedBody.response.groups[0].items[i].venue.location.address
                });
            }

            cb(null, venueObj);
        });
    };

    const req = https.request(options, callback);
    req.end();
});

////////////////////////////////////////GET VENUE DETAILS////////////////////////////////////////////////////////////////
module.exports.getVenueDetails = promisify(function getVenueDetails(id, cb) {
    let options = {
        method: "GET",
        host: "api.foursquare.com",
        path: `/v2/venues/${id}?client_id=${
            secrets.id
        }&client_secret=${secrets.secret}&v=20181203`
    };


    let callback = resp => {
        if (resp.statusCode != 200) {
            cb(resp.statusCode);
            return;
        }
        let body = "";
        resp.on("data", chunk => {
            body += chunk;
        });
        resp.on("end", () => {
            let parsedBody = JSON.parse(body);

            let venueDescriptionObj = [];

            let description;
            let price;
            let likes;
            let rating;
            let tip;

            if (!parsedBody.response.venue.description) {
                description = "No description yet";
            } else {
                description = parsedBody.response.venue.description;
            }

            if (!parsedBody.response.venue.price) {
                price = "No price range detected";
            } else {
                price = parsedBody.response.venue.price.message;
            }

            if (!parsedBody.response.venue.likes.summary) {
                price = "No likes yet";
            } else {
                likes = parsedBody.response.venue.likes.summary;
            }

            if (!parsedBody.response.venue.rating) {
                rating = "";
            } else {
                rating = parsedBody.response.venue.rating;
            }

            if (!parsedBody.response.venue.tips.groups[0].items[0].text) {
                tip = "";
            } else {
                tip = parsedBody.response.venue.tips.groups[0].items[0].text;
            }

            venueDescriptionObj.push({
                id: parsedBody.response.venue.id,
                name: parsedBody.response.venue.name,
                imgurl: parsedBody.response.venue.bestPhoto.prefix + "612x612" + parsedBody.response.venue.bestPhoto.suffix,
                description: description,
                url: parsedBody.response.venue.url,
                category: parsedBody.response.venue.categories[0].name,
                price: price,
                likes: likes,
                rating: rating,
                tip: tip
            });

            cb(null, venueDescriptionObj);
        });
    };

    const req = https.request(options, callback);
    req.end();
});

////////////////////////////GETTING WEATHER FOR THE CURRENT CITY////////////////////////////////
module.exports.getWeather = promisify(function getWeather(city, cb) {


    city = city.replace(/\s/g, '+');

    let options = {
        method: "GET",
        host: "api.apixu.com",
        path: `/v1/current.json?key=${secrets.apixu_weather_key}&q=${city}`

    };

    let callback = resp => {
        if (resp.statusCode != 200) {
            cb(resp.statusCode);
            return;
        }
        let body = "";
        resp.on("data", chunk => {
            body += chunk;
        });
        resp.on("end", () => {
            let parsedBody = JSON.parse(body);

            let weatherObj = [];

            weatherObj.push({
                temperature: parsedBody.current.temp_c,
                iconurl: "http://" + parsedBody.current.condition.icon.substring(2),
                is_day: parsedBody.current.is_day
            });
            cb(null, weatherObj);
        });
    };

    const req = https.request(options, callback);

    req.end();
});

module.exports.getCoord = promisify(function getCoord(place, cb) {
    place = place.replace(/\s/g, '+');
    place = place.replace(/,/g, '%2C');
    place = place.replace(/ä/g, 'ae');
    place = place.replace(/ö/g, 'oe');
    place = place.replace(/ü/g, 'ue');
    place = place.replace(/ß/g, 'ss');

    console.log("place", place);


    let options = {
        method: "GET",
        host: "api.opencagedata.com",
        path: `/geocode/v1/json?q=${place}&key=${secrets.geo_key}`

    };

    let callback = resp => {
        if (resp.statusCode != 200) {
            cb(resp.statusCode);
            return;
        }
        let body = "";
        resp.on("data", chunk => {
            body += chunk;
        });
        resp.on("end", () => {
            let parsedBody = JSON.parse(body);
            if (parsedBody.results.length!=0) {
                let coord = parsedBody.results[0].bounds.northeast;
                cb(null, coord);
            } else {
                cb(null, null);
            }

        });
    };

    const req = https.request(options, callback);
    req.end();
});
