var statuses = require("../custom-slot-types/status_type");

module.exports = function(expressApp, alexa, isDebug) {

  // ALWAYS setup the alexa app and attach it to express before anything else.
  var app = new alexa.app("alexa-hospital-room");

  app.express({
    expressApp: expressApp,
    //router: appRouter,

    // verifies requests come from amazon alexa. Must be enabled for production.
    // You can disable this if you're running a dev environment and want to POST
    // things to test behavior. enabled by default.
    checkCert: !isDebug,

    // sets up a GET route when set to true. This is handy for testing in
    // development, but not recommended for production. disabled by default
    debug: isDebug
  });

  // now POST calls to /{app.name} in express will be handled by the app.request() function

  app.launch(function(request, response) {
    response.say("Welcome to the Hospital Room Manager! Ask for rooms to be cleaned or to mark a room as cleaned.");
  });

  app.dictionary = statuses;

  app.intent("updateRoomIntent", {
      "slots": {
        "room": "AMAZON.NUMBER",
        "floor": "AMAZON.NUMBER",
        "status": "STATUS_TYPE" },
      "utterances": [
        "{mark|update|make} room {ROOM} on floor {FLOOR} {|as|to} {STATUS}"
      ]
    },
    function(request, response) {
      console.log();
      var rm = request.slot("room");
      var fl = request.slot("floor");
      var st = request.slot("status");
      response.say("Room " + rm + " on floor " + fl + " was updated successfully to " + st);
    }
  );

  app.intent("AMAZON.HelpIntent",{
      "slots": {},
      "utterances": []
    },
    function(request, response) {
      var helpOutput = "You can say 'mark room on floor to clean' or ask 'what rooms are there to clean'. You can also say stop or exit to quit.";
      var reprompt = "What would you like to do?";
      // AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
      response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
      return;
    }
  );

  app.intent("AMAZON.StopIntent",{
      "slots": {},
      "utterances": []
    },
    function(request, response) {
      var stopOutput = "The Hospital Room Manager is finished for now.";
      response.say(stopOutput);
      return;
    }
  );

  app.intent("AMAZON.CancelIntent",{
      "slots": {},
      "utterances": []
    },
    function(request, response) {
      var cancelOutput = "No problem. Request cancelled.";
      response.say(cancelOutput);
      return;
    }
  );

  return app;

} // end module.exports
