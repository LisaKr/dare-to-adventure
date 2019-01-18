const spicedPg = require("spiced-pg");
const bcrypt = require("./bcrypt");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/finalproject"
);

/////////////////////////////////////////////////////////////////////
////////////////CREATING A USER AFTER THE REGISTRATION///////////////

exports.createUser = function createUser(first, last, email, pass) {
    return db.query(
        `INSERT INTO users (first, last, email, pass)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first, last`,
        [first || null, last || null, email || null, pass || null]
    );
};

////////////////////GETTING A USER BY E-MAIL AFTER LOG IN/////////////////
//we are using this to compare passwords and let user in or not///////

exports.getUserByMail = function getUserByMail(email) {
    return db.query(
        `SELECT *
        FROM users
        WHERE email=$1`, [email]
    );
};

////////PUTTING SELECTED OPTIONS INTO THE "OPTIONS" DB///////////

exports.rewritePreviousOptions = function rewritePreviousOptions(user_id) {
    return db.query(
        `DELETE
        FROM options
        WHERE user_id = $1`, [user_id]
    );
};

exports.putOptionsInDB = function putOptionsInDB(user_id, city, numofdays, lat, lng, address) {
    return db.query(
        `INSERT INTO options (user_id, city, numOfDays, lat, lng, address)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [user_id, city, numofdays, lat, lng, address]
    );
};

/////////////////////CHECKING IF USER HAS HAD ACTIVITY INSERTED INTO ACTIVITIES TABLE ALREADY/////////////////////////////////
exports.checkUserHistory = function checkUserHistory(id) {
    return db.query(`
        SELECT *
        FROM activities
        WHERE user_id=$1`, [id]);
};

/////////////////////CHECKING WHICH CITY AND HOW MANY DAYS THE USER IS WORKING ON//////////////////
exports.getCurrentCity = function getCurrentCity(id) {
    return db.query(`
        SELECT CITY
        FROM options
        WHERE user_id=$1
        LIMIT 1`, [id]);
};

exports.getCurrentCoord = function getCurrentCoord(id) {
    return db.query(`
        SELECT lat, lng
        FROM options
        WHERE user_id=$1
        LIMIT 1`, [id]);
};

exports.getCurrentAddress = function getAddressCoord(id) {
    return db.query(`
        SELECT address
        FROM options
        WHERE user_id=$1
        LIMIT 1`, [id]);
};

exports.getNumOfDays = function getNumOfDays(id) {
    return db.query(`
        SELECT numOfDays
        FROM options
        WHERE user_id=$1
        LIMIT 1`, [id]);
};

///////////////////////////GETTING SEARCH RESULTS//////////////////////////
exports.search = function search(request) {
    return db.query(`
        SELECT *
        FROM cities
        WHERE city ILIKE  $1`, [request + "%"]);
};

/////////////////////////ADDING VENUE TO ACTIVITES/////////////////////////
exports.addVenue = function addVenue(user_id, city, activityName, activityLocation, category, day) {
    return db.query(`
        INSERT INTO activities (user_id, city, activityname, activitylocation, category, day)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`, [user_id, city, activityName, activityLocation, category, day]);
};

//////////////////CHECKING HOW MANY ACTIVITIES A DAY HAS///////////////////////////
exports.checkDay = function checkDay(day, user_id) {
    return db.query(`
        SELECT day, activityname, count(*)
        FROM activities
        WHERE day=$1 AND user_id=$2
        GROUP BY day, activityname`, [day, user_id]);

};

///////////////////CHECKING WHETHER AN ACTIVITY IS ALREADY IN THE DB//////////
exports.checkActivity = function checkActivity(activity, user_id, city) {
    return db.query(`
        SELECT *
        FROM activities
        WHERE user_id = $2 AND city=$3 AND activity=$1`, [activity, user_id, city]);
};

/////////////////////GET ALL ACTIVITIES OF USER////////////////////////
exports.getActivities = function getActivities(user_id, city) {
    return db.query(`
        SELECT DISTINCT ON (day, category, activityname) day, category, activityname, activitylocation
        FROM activities
        WHERE user_id = $1 AND city=$2
        `, [user_id, city]);
};

////////////////////DELETE AN ACTIVITY/////////////
exports.deleteActivity = function deleteActivity(activityName, user_id) {
    return db.query(`
            DELETE
            FROM activities
            WHERE user_id=$2 AND activityname = $1
            RETURNING *`, [activityName, user_id]);
};

///////////////ADDING A COUNT TO THE CITY///////////
exports.addCount = function addCount(city) {
    return db.query(`
        UPDATE cities
        SET count = count + 1
        WHERE city=$1
        RETURNING *`, [city]);
};

///////////////////GET POPULAR CITIES//////////////
exports.getPopularCities = function getPopularCities() {
    return db.query(`
            SELECT city
            FROM cities
            ORDER BY count DESC
            LIMIT 3`);
};

/////////////CHECKING IF ACTIVITY ALREADY EXISTS/////////
exports.getActivity = function getActivity(user_id, activityName, city, day) {
    return db.query(`
        SELECT *
        FROM activities
        WHERE user_id=$1 AND activityname=$2 AND city=$3 AND day=$4`, [user_id, activityName, city, day]);
};


/////////////////////HASHING PASSWORDS////////////////////////
/////////////////////////////////////////////////////////////
exports.hashPassword = function hashPassword(textPass) {
    return bcrypt.hash(textPass);
};

exports.comparePassword = function comparePassword(textPassword, hashPassword) {
    return bcrypt.compare(textPassword, hashPassword);
};
