// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

var tables = require("./data/tables.js");
var waitlist = require("./data/waitlist.js");

// Sets up the Express App
// =============================================================
var app = express();
// var PORT = 3000;              // localhost
const PORT = process.env.PORT;   // heroku
const MAX_TABLES = 5;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes for displaying HTML pages
// ===========================================================
// route sends user to home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

// route sends user to reserve page
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "public/reserve.html"));
});

// route sends user to names page
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "public/tables.html"));
});

// route sends user to names page
app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
});

// Routes for gets
// ===========================================================
// Displays all tables
app.get("/api/tables", function (req, res) {
    return res.json(tables);
});

// Displays all waitlists
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
});

// Routes for posts
// ===========================================================

// Create new reservation - takes in JSON input
app.post("/api/reserve", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReservation = req.body;

    console.log(newReservation);
    
    let reserved = false;
    if (tables.length < MAX_TABLES) {
        // Success - Add to the master tables array
        reserved = true;
        tables.push(newReservation);
    } else {
        // We then add the json the user sent to the tables array
        reserved = false;
        waitlist.push(newReservation);
    } 

    // We then display the JSON to the users
    res.json(reserved);
});

// Listener
// ===========================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
