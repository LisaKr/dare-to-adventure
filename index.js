const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const { getVenuesRecommendationEndpoint, getVenuesExploreEndpoint, getVenueDetails, getCityPicsPexels, getWeather } = require("./api_calls.js");
const ca = require("chalk-animation");

app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//session secret is a key used for signing and/or encrypting cookies set by the application to maintain session state
app.use(
    cookieSession({
        secret:
            process.env.COOKIE_SECRET || require("./secrets.json").cookieSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);


/////protecting from cross-site requests, after cookies and bodyParser
app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});


app.use(express.static("./public"));

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//////////////basic redirection/////////////
app.get("/welcome", needNoUserID, (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/", needUserID, (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/setup", needUserID, (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/working-area", needUserID, (req,res) => {
    res.sendFile(__dirname + "/index.html");
});


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////USER////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

/////////////////registration//////////////////////

app.post("/register-user", async (req,res) => {
    try {
        let hash = await db.hashPassword(req.body.password);
        let result = await db.createUser(
            req.body.first,
            req.body.last,
            req.body.email,
            hash);
        req.session.userID = result.rows[0].id;
        res.json(result.rows[0]);
    } catch(err) {
        console.log("ERROR IN REGISTRATION: ", err);
        res.json({error: true});
    }
});


//////////////////////login//////////////////////
app.post("/login-user", async (req, res) => {
    try {
        let resp = await db.getUserByMail(req.body.email);
        let match = await db.comparePassword(req.body.password, resp.rows[0].pass);
        if (match == true) {
            req.session.userID = resp.rows[0].id;
            res.json(resp.rows[0]);
        }

    } catch(err) {
        console.log("ERROR IN REGISTRATION: ", err);
        res.json({error: true});
    }
});

////////////////////////logout////////////////////////////
app.get("/logout", function(req, res) {
    req.session = null;
    res.redirect("/welcome");
});

//////////////////////////////////END USER//////////////////////////////////////////////////


///////////////////CHECKING IF THE USER HAS ALREADY STARTED THE PLANNING PROCESS IN ORDER TO REDIRECT CORRECTLY///////////////
app.get("/check-user-history", async (req,res) => {
    try {
        let resp = await db.checkUserHistory(req.session.userID);
        res.json(resp.rows[0]);
    } catch(err) {
        console.log("ERROR IN REGISTRATION: ", err);
        res.json({error: true});
    }
});

////////////////////////SEEING WHICH CITY USER HAS WORKED ON TO LOAD THE BACKGROUND PIC/////////////////////////////////

//getting only the name of the last city the user has worked on
app.get("/current-city", async (req,res) => {
    try {
        let resp = await db.getCurrentCity(req.session.userID);
        res.json(resp.rows[0].city);
    } catch(err) {
        console.log("ERROR IN GETTING CURRENT CITY", err);
    }
});

app.get("/numofdays", async (req,res) => {
    try {
        let resp = await db.getNumOfDays(req.session.userID);
        res.json(resp.rows[0].numofdays);
    } catch(err) {
        console.log("ERROR IN GETTING NUM OF DAYS", err);
    }
});

//here I am actually starting an API request for the city I want to get an image of
app.get("/current-city-pic/:city", async (req,res) => {
    try {
        let pexelscity = await getCityPicsPexels(req.params.city);
        res.json(pexelscity);
    } catch(err) {
        console.log("ERROR IN GETTING IMAGE FOR THE CITY", err);
    }
});


//////////////////////GETTING SEARCH RESULTS////////////////////////////////////
app.get("/search/:request", async (req,res) => {
    try {
        let resp = await db.search(req.params.request);
        res.json(resp.rows);
    } catch(err) {
        console.log("ERROR IN GETTING SEARCH RESULTS", err);
    }

});


///////////////////GETTING CATEGORIES RESULTS/////////////////////
app.get("/venues/:city/:categoryOrIntent/:offset/:option", async (req, res) => {
    try {
        if (req.params.option == "recEndpoint") {
            let resp = await getVenuesRecommendationEndpoint(req.params.city, req.params.categoryOrIntent, req.params.offset);
            res.json(resp);
        }

        if (req.params.option == "exploreEndpoint") {
            let resp = await getVenuesExploreEndpoint(req.params.city, req.params.categoryOrIntent, req.params.offset);
            res.json(resp);
        }
    } catch(err) {
        console.log("ERROR IN GETTING VENUES", err);
    }
});

//////////////////////////SHOWING DETAILS OF A VENUE//////////////////////////
app.get("/venue-details/:id", async (req,res) => {
    try {
        let resp = await getVenueDetails(req.params.id);
        res.json(resp);
    } catch(err) {
        console.log("ERROR IN GETTING VENUE DETAILS", err);
    }
});


////////////SHOWING WEATHER FOR THE CITY//////////////////////
app.get("/weather/:city", async (req,res) => {
    try {
        let resp = await getWeather(req.params.city);
        res.json(resp);
    } catch(err) {
        console.log("ERROR IN WEATHER", err);
    }
});

///////////////ADDING VENUE TO THE ACTIVITIES TABLE////////////////
app.get("/add-venue/:city/:activityName/:activityLocation/:category/:day/:numofdays", async (req,res) => {
    try {
        let category = req.params.category.charAt(0).toUpperCase() + req.params.category.substr(1);
        let resp = await db.addVenue(
            req.session.userID,
            req.params.city,
            req.params.activityName,
            req.params.activityLocation,
            category,
            req.params.day,
            req.params.numofdays);
        res.json(resp.rows[0]);
    } catch(err) {
        console.log("ERROR IN ADDING VENUE", err);
    }
});


/////////////CHECKING HOW MANY ACTIVITIES A DAY HAS///////////
app.get("/check-day/:day", async (req,res) => {
    try {
        let resp = await db.checkDay(req.params.day, req.session.userID);
        res.json(resp.rows);
    } catch(err) {
        console.log("ERROR IN CHECKING DAYS FOR ACTIVITIES", err);
    }
});


///////////////////CHECKING IF AN ACTIVITY IS ALREADY ADDED////////////
app.get("/check-activity/:activity/:city", async (req,res) => {
    try {
        let resp = await db.checkActivity(req.params.activity, req.session.userID, req.params.city);
        res.json(resp.rows);
    } catch(err) {
        console.log("ERROR IN CHECKING IF ACTIVITY ALREADY THERE", err);
    }
});

////////////////GET ALL ACTIVITIES OF USER////////////////
app.get("/get-activities/:city", async (req,res) => {
    try {
        let resp = await db.getActivities(req.session.userID, req.params.city);
        res.json(resp.rows);
    } catch(err) {
        console.log("ERROR IN GETTING ALL ACTIVITIES", err);
    }
});

////////////////DELETE AN ACTIVITY////////////////////
app.get("/delete/:activityName", async (req,res) => {
    try {
        await db.deleteActivity(req.params.activityName, req.session.userID);
        res.json({
            awesome:true
        });
    } catch(err) {
        console.log("ERROR IN DELETING AN ACTIVITY", err);
    }
});

/////////////////////ADDING COUNT TO A SELECTED CITY//////////////////////////
app.get("/add-count/:city", async (req,res) => {
    try {
        await db.addCount(req.params.city);
        res.json({
            great: true
        });
    } catch(err) {
        console.log("ERROR IN ADDING COUNT", err);
    }

});

/////////////////GET POPULAR CITIES//////////////////////////////
app.get("/get-popular-cities", async (req,res) => {
    try {
        let resp = await db.getPopularCities();
        res.json(resp.rows);
    } catch(err) {
        console.log("ERROR IN GETTING POPULAR CITIES", err);
    }
});

///////////////CHECK IF ACTIVITY ALREADY ADDED//////////////////
app.get("/get-activity/:activityname/:city/:day", async (req, res) => {
    let resp = await db.getActivity(req.session.userID, req.params.activityname, req.params.city, req.params.day);
    res.json(resp.rows);
});

///////////////////DEFAULT STAR ROUTE/////////////////////
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, () => ca.rainbow("Big brother is listening!"));


////////////////CUSTOM MIDDLEWARE TO FASCILITATE SYNTAX/////////////
function needNoUserID(req, res, next) {
    if (req.session.userID) {
        res.redirect("/");
    } else {
        next();
    }
}

function needUserID(req, res, next) {
    if (!req.session.userID) {
        res.redirect("/welcome");
    } else {
        next();
    }
}
