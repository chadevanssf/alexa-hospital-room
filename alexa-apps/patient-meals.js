module.exports = function(expressApp, alexa, isDebug) {

  // ALWAYS setup the alexa app and attach it to express before anything else.
  var alexaApp = new alexa.app("alexa-patient-meals");

  alexaApp.express({
    expressApp: expressApp,
    //router: alexaAppRouter,

    // function to execute before every POST
    //preRequest ,

    // function to execute after every POST
    //postRequest ,

    // verifies requests come from amazon alexa. Must be enabled for production.
    // You can disable this if you're running a dev environment and want to POST
    // things to test behavior. enabled by default.
    checkCert: !isDebug,

    // sets up a GET route when set to true. This is handy for testing in
    // development, but not recommended for production. disabled by default
    debug: isDebug
  });

  // now POST calls to /{alexaApp.name} in express will be handled by the app.request() function

  alexaApp.launch(function(request, response) {
    response.say("You launched the app!");
  });

  alexaApp.dictionary = { "names": ["matt", "joe", "bob", "bill", "mary", "jane", "dawn"] };

  alexaApp.intent("nameIntent", {
      "slots": { "NAME": "LITERAL" },
      "utterances": [
        "my {name is|name's} {names|NAME}", "set my name to {names|NAME}"
      ]
    },
    function(request, response) {
      response.say("Success!");
    }
  );

  return alexaApp;

}; // end module.exports
