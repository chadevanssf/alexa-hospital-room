const pg = require("pg");
pg.defaults.ssl = true; // doesn't work for many local installations
const url = require('url');
const squelGeneric = require("squel");
const squel = squelGeneric.useFlavour("postgres");

const DB_SCHEMA = "salesforce"; // default schema name for Heroku Connect

const dbUtil = {};

dbUtil.getDbUrl = function() {
  return process.env.DATABASE_URL;
};

dbUtil.getRoomQuery = function(newRm, newFl) {
  return squel.select()
    .from(DB_SCHEMA + ".hospital_room__c")
    .field("room__c")
    .field("floor__c")
    .field("status__c")
    .field("alexa_is_ready__c")
    .field("name")
    .field("sfid")
    .where("room__c = $1")
    .where("floor__c = $2")
    .toString();
};

dbUtil.getRooms = function(newRm, newFl) {

  const promise = new Promise(function(resolve, reject) {

    const pool = new pg.Pool({
      connectionString: dbUtil.getDbUrl()
    });

    const queryToRun = {
      text: dbUtil.getRoomQuery(newRm, newFl),
      values: [newRm, newFl]
    };

    pool.query(queryToRun)
      .then((res) => {
        resolve(res.rows);
      })
      .catch((e) => {
        console.error(e.stack);
      });
  });

  return promise;
};

dbUtil.renderTest = function(req, res) {
  dbUtil.getRooms("234", "1")
    .then((rows) => {
      res.render("db-test", {
        "dbUtil": dbUtil,
        "rows": rows
      });
    });
};

module.exports = dbUtil;
