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

/////////////////////CHECKING IF USER HAS HAD ACTIVITY ALREADY/////////////////////////////////
exports.checkUserHistory = function checkUserHistory(id) {
    return db.query(`
        SELECT *
        FROM activities
        WHERE user_id=$1`, [id]);
};

/////////////////////CHECKING WHICH CITY THE USER IS WORKING ON//////////////////
exports.getCurrentCity = function getCurrentCity(id) {
    return db.query(`
        SELECT CITY
        FROM activities
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


/////////////////////HASHING PASSWORDS////////////////////////
/////////////////////////////////////////////////////////////
exports.hashPassword = function hashPassword(textPass) {
    return bcrypt.hash(textPass);
};

exports.comparePassword = function comparePassword(textPassword, hashPassword) {
    return bcrypt.compare(textPassword, hashPassword);
};
