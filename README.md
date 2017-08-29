# alexa-hospital-room

An Alexa Skill project using the [alexa-app](https://github.com/alexa-js/alexa-app) module with Express. Leverages Heroku for the logic instead of Amazon Lambda, and uses Heroku Connect to access data from Salesforce for the business logic.

## Deploying locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed. Must also have a local copy of Postgres (example for Mac: [https://postgresapp.com/](https://postgresapp.com/))

* Set the local postgres to the environment variable:

```sh
export DATABASE_URL=postgres:///$(whoami)
```

* Get the code and run it locally:

```sh
git clone https://github.com/chadevanssf/alexa-hospital-room.git # or clone your own fork
cd alexa-hospital-room
npm install
npm start
```

* Your app should now be running on *[http://localhost:8080](http://localhost:8080)*.

### Testing it

You can access a test page to verify if the basic setup is working fine: *[http://localhost:8080/](http://localhost:8080/)*, which will list all the Alexa Skill Apps configured with this project, and you can select on each one to test the response.

### SSL required

You must have SSL enabled in your local psql for this to work. Suggested way to enable is found at [https://www.postgresql.org/docs/9.6/static/ssl-tcp.html](https://www.postgresql.org/docs/9.6/static/ssl-tcp.html) under Creating a Self-signed Certificate

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

You can then import the connection configuration at */util/alexa-hospital-room.json*.

### Testing it

You can access a test page to verify if the basic setup is working fine: *https://`<app-name>`.herokuapp.com/*.

Test the database by going to *https://`<app-name>`.herokuapp.com/db*

### Adding Alexa Skill

You can access the configuration page *https://`<heroku-app-name>`.herokuapp.com/<alexa-skill-name>* to get the information that the Alexa Skill requires.

## Helpful Commands

Get changes from your local git into Heroku

```sh
git add .
git commit -m "Updates"
git push heroku master
```

Get the Postgres DB connection info:

```sh
heroku pg:credentials:url DATABASE
```
