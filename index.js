var express = require("express");
var alexa = require("alexa-app");
var hospitalRoom = require("./alexa-apps/hospital-room");
var patientMeals = require("./alexa-apps/patient-meals");

// use the environment var from Heroku if set
var PORT = process.env.PORT || 8080;
var IS_DEBUG = true;

var expressApp = express();

expressApp.set("view engine", "ejs");

// load the alexa apps
var hospitalRoomApp = hospitalRoom(expressApp, alexa, IS_DEBUG);
var patientMealsApp = patientMeals(expressApp, alexa, IS_DEBUG);

// from here on you can setup any other express routes or middlewares as normal

// set up a default mapping so I don't have to know any of the names of the apps
var apps = [];
for (var key in alexa.apps) {
  apps.push("\nhttp://localhost:" + PORT + "/" + key);
}

expressApp.get("/", function (req, res) {
  res.render("list", {
    "apps": apps,
  });
});

var appsToTest = apps.join("\n");
expressApp.listen(PORT, () => console.log("Listening on port " + PORT + ", try:\n" + appsToTest));
