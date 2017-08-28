# alexa-hospital-room

An Alexa Skill project using the [alexa-app](https://github.com/alexa-js/alexa-app) module with Express. Leverages Heroku for the logic instead of Amazon Lambda, and uses Heroku Connect to access data from Salesforce for the business logic.

## Deploying locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
git clone https://github.com/chadevanssf/alexa-hospital-room.git # or clone your own fork
cd alexa-hospital-room
npm install
npm start
```

Your app should now be running on *[http://localhost:8080](http://localhost:8080)*.

### Testing it

You can access a test page to verify if the basic setup is working fine: *[http://localhost:8080/](http://localhost:8080/)*, which will list all the Alexa Skill Apps configured with this project, and you can select on each one to test the response.

## Deploying to Heroku

```sh
heroku create <heroku-app-name>
git push heroku master
heroku open
```

Alternatively, you can deploy your own copy of the app using this button:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/chadevanssf/alexa-hospital-room)

Your app should now be running on *https://`<heroku-app-name>`.herokuapp.com*, where `<app-name>` is the heroku app name.

### Adding Heroku Connect

You will need to have a Salesforce org with the following package installed:

**TODO**[https://login.salesforce.com](https://login.salesforce.com)

### Testing it

You can access a test page to verify if the basic setup is working fine: *https://`<app-name>`.herokuapp.com/*.

### Adding Alexa Skill

You can access the configuration page *https://`<heroku-app-name>`.herokuapp.com/<alexa-skill-name>* to get the information that the Alexa Skill requires.
