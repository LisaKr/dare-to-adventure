const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const db = require("./db.js");
const { getVenues, getVenueDetails, getCityPicsPexels, getWeather } = require("./api_calls.js");
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


//protecting from cross-site requests, after cookies and bodyParser
// app.use(csurf());
//
// app.use(function(req, res, next){
//     res.cookie('mytoken', req.csrfToken());
//     next();
// });


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


/////////////login//////////////////////
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

///////////////////logout////////////////////////////
app.get("/logout", function(req, res) {
    req.session = null;
    res.redirect("/welcome");
});

//////////////////////////////////END USER//////////////////////////////////////////////////


///////////////////CHECKING IF THE USER HAS ALREADY STARTED THE PLANNING PROCESS IN ORDER TO REDIRECT CORRECTLY///////////////
app.get("/check-user-history", async (req,res) => {
    try {
        let resp = await db.checkUserHistory(req.session.userID);
        // console.log("response after checking for activities!!!", resp);
        res.json(resp.rows[0]);
    } catch(err) {
        console.log("ERROR IN REGISTRATION: ", err);
        res.json({error: true});
    }
});

////////////////////////SEEING WHICH CITY USER HAS WORKED ON TO LOAD THE BACKGROUND PIC/////////////////////////////////

//here i am just making request to the database and getting the city the user is working on
//what is sent back is the name of the city
app.get("/current-city", async (req,res) => {
    try {
        let resp = await db.getCurrentCity(req.session.userID);
        // console.log("users current city on the back", resp);
        //now I need to start an api request to get the url of this city back and send this url to the front
        res.json(resp.rows[0].city);
    } catch(err) {
        console.log(err);
    }
});

app.get("/numofdays", async (req,res) => {
    try {
        let resp = await db.getNumOfDays(req.session.userID);
        res.json(resp.rows[0].numofdays);
    } catch(err) {
        console.log(err);
    }
});

//here I am actually starting an API request for the city I want to get an image of
app.get("/current-city-pic/:city", async (req,res) => {
    try {
        //now I need to start an api request to get the url of this city back and send this url to the front
        let pexelscity = await getCityPicsPexels(req.params.city);
        //sending the url to the background pic to the front to render
        res.json(pexelscity);
    } catch(err) {
        console.log(err);
    }
});


//////////////////////GETTING SEARCH RESULTS////////////////////////////////////
app.get("/search/:request", async (req,res) => {
    console.log("search hit!");
    let resp = await db.search(req.params.request);
    console.log("search results", resp.rows);
    res.json(resp.rows);
});


///////////////////GETTING CATEGORIES RESULTS/////////////////////
app.get("/venues/:city/:category/:offset", async (req, res) => {
    try {
        // console.log("req params", req.params);
        let resp = await getVenues(req.params.city, req.params.category, req.params.offset);
        // console.log("venues on the server", resp);
        res.json(resp);
    } catch(err) {
        console.log("ERROR IN GETTING VENUES", err);
    }
});

//////////////////////////SHOWING DETAILS OF A VENUE//////////////////////////
app.get("/venue-details/:id", async (req,res) => {
    try {
        let resp = await getVenueDetails(req.params.id);
        // console.log("VENUE DETAILS ON THE BACK", resp);
        res.json(resp);
    } catch(err) {
        console.log("ERROR IN GETTING VENUE DETAILS", err);
    }


});


////////////SHOWING WEATHER FOR THE CITY//////////////////////
app.get("/weather/:city", async (req,res) => {
    try {
        console.log("city in req.params weathee", req.params);
        let resp = await getWeather(req.params.city);
        res.json(resp);
    } catch(err) {
        console.log("ERROR IN WEATHER", err);
    }
});

///////////////ADDING VENUE TO THE ACTIVITIES TABLE////////////////
app.get("/add-venue/:city/:activity/:category/:day/:numofdays", async (req,res) => {
    try {
        // console.log("trying", req.params);
        let resp = await db.addVenue(
            req.session.userID,
            req.params.city,
            req.params.activity,
            req.params.category,
            req.params.day,
            req.params.numofdays);
        // console.log("resp after adding venue", resp.rows[0]);
        console.log("venue added!");
        res.json(resp.rows[0]);
    } catch(err) {
        console.log("ERROR IN ADDING VENUE", err);
        res.json({
            error:true
        });
    }
});


/////////////CHECKING HOW MANY ACTIVITIES A DAY HAS///////////
app.get("/check-day/:day", async (req,res) => {
    try {
        let resp = await db.checkDay(req.params.day, req.session.userID);
        // console.log("day response", resp.rows);
        console.log("checking days running");
        res.json(resp.rows);
    } catch(err) {
        console.log("ERROR IN CHECKING DAYS FOR ACTIVITIES", err);
    }
});


///////////////////CHECKING IF AN ACTIVITY IS ALREADY ADDED////////////
app.get("/check-activity/:activity/:city", async (req,res) => {
    try {
        console.log("req.params", req.params);
        let resp = await db.checkActivity(req.params.activity, req.session.userID, req.params.city);
        // console.log("response for activity", resp.rows);
        res.json(resp.rows);

    } catch(err) {
        console.log("ERROR IN CHECKING IF ACTIVITY ALREADY THERE", err);
    }
});

////////////////GET ALL ACTIVITIES OF USER////////////////
app.get("/get-activities/:city", async (req,res) => {
    try {
        let resp = await db.getActivities(req.session.userID, req.params.city);
        console.log("all activities on server", resp.rows);
        res.json(resp.rows);
    } catch(err) {
        console.log("ERROR IN GETTING ALL ACTIVITIES", err);
    }
});

////////////////DELETE AN ACTIVITY////////////////////
app.get("/delete/:activityName", async (req,res) => {
    try {
        console.log("ACTIVITY", req.params.activityName);
        let resp = await db.deleteActivity(req.params.activityName, req.session.userID);
        console.log("response after deleting an activity", resp.rows);
        res.json({
            awesome:true
        });
    } catch(err) {
        console.log("ERROR IN DELETING AN ACTIVITY", err);
    }
});

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
