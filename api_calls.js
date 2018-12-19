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
            console.log("PEXELS BODY", parsedBody.photos[0].url);
            let imgurl = parsedBody.photos[0].src.original;
            cb(null, imgurl);
        });
    };

    const req = https.request(options, callback);
    req.end();

});
//////////////////////////////////////////////////////////////////

////////////////////////////////GETTING CATEGORY RESULTS////////////////////////////////////

module.exports.getVenues = promisify(function getVenues(city, category, offset, cb) {

    city = city.replace(/\s/g, '+');

    let options = {
        method: "GET",
        host: "api.foursquare.com",
        path: `/v2/venues/explore?categoryId=${category}&near=${city}&offset=${offset}&limit=10&client_id=${
            secrets.id
        }&client_secret=${secrets.secret}&v=20181214`
    };
    // alternative: v2/search/

    // console.log("options", options);

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
            // console.log("BODY", parsedBody.response.groups[0].items);
            //this is for search endpoint!!!

            // let name = parsedBody.response.venues[0].name;
            // let address = parsedBody.response.venues[0].location.address;
            // let list = parsedBody.response.venues;
            // console.log(
            //     "NAME ON THE BACK ",
            //     name, address, list
            // );

            /////////////////////////////////////////////////////////////////
            //this is for the explore endpoint!
            // let name = parsedBody.response.groups[0].items[0].venue.name;
            // let address = parsedBody.response.groups[0].items[0].venue.location.address;
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
            // console.log("VENUE OBJ IN API", venueObj);
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
            console.log("VENUE DETAILS KOMPLETT", parsedBody.response.venue.tips.groups[0].items[0].text);
            // console.log("VENUE DETAILS", parsedBody.response.venue.price.message);
            // console.log("venue details", parsedBody.response.venue);
            // let imgurl = parsedBody.response.venue.bestPhoto.prefix + "100x100" + parsedBody.response.venue.bestPhoto.suffix;

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
    console.log("weather city", city);

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

            // console.log("weather body in api file", parsedBody);
            // console.log("temperature", parsedBody.current.temp_c);
            // console.log("iconurl", parsedBody.current.condition.icon.substring(2));

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






///////NOT USING IT BECAUSE PEXELS WORKS//////////////////////

///////////////////////////////////////////GET BACKGROUND FROM TELEPORT///////////////////////////////////////////////
// module.exports.getCityPics = promisify(function getCityPics(city, cb) {
//
//     console.log("helper city", city);
//     let options = {
//         method: "GET",
//         host: "api.teleport.org",
//         path: "/api/urban_areas/slug:" + city + "/images"
//     };
//
//     let callback = resp => {
//         if (resp.statusCode != 200) {
//             cb(resp.statusCode);
//             return;
//         }
//         let body = "";
//         resp.on("data", chunk => {
//             body += chunk;
//         });
//         resp.on("end", () => {
//             let parsedBody = JSON.parse(body);
//             console.log("IMAGE NEW API", parsedBody.photos[0].image.web);
//             let imgurl = parsedBody.photos[0].image.web;
//             cb(null, imgurl);
//         });
//     };
//
//     const req = https.request(options, callback);
//     req.end();
//
// });
