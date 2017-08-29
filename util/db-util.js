const pg = require("pg");
pg.defaults.ssl = true; // doesn't work for many local installations
const url = require('url');
const squelGeneric = require("squel");
const squel = squelGeneric.useFlavour("postgres");

const DB_SCHEMA = "salesforce"; // default schema name for Heroku Connect

const dbUtil = {};

dbUtil.getDbConfig = function() {
  return {
    connectionString: process.env.DATABASE_URL
  };
};

dbUtil.getRoomQuery = function() {
  return dbUtil.getBaseRoomQuery()
    .where("room__c = $1")
    .where("floor__c = $2")
    .toString();
};

dbUtil.getRoomToCleanQuery = function() {
  return dbUtil.getBaseRoomQuery()
    .where("status__c = ?", "Needing Cleaning")
    .toString();
};

dbUtil.getBaseRoomQuery = function() {
  return squel.select()
    .from(DB_SCHEMA + ".hospital_room__c")
    .field("room__c")
    .field("floor__c")
    .field("status__c")
    .field("alexa_is_ready__c")
    .field("name")
    .field("sfid");
};

dbUtil.getRooms = function(newRm, newFl) {
  return new Promise(function(resolve, reject) {
    const pool = new pg.Pool(dbUtil.getDbConfig());

    const queryToRun = {
      text: dbUtil.getRoomQuery(),
      values: [newRm, newFl]
    };

    pool.query(queryToRun)
      .then( res => {
        resolve(res.rows);
      })
      .catch( e => console.error(e.stack) );
  });
};

dbUtil.getRoomsToClean = function() {
  return new Promise(function(resolve, reject) {
    const pool = new pg.Pool(dbUtil.getDbConfig());

    const queryToRun = {
      text: dbUtil.getRoomToCleanQuery(),
      values: []
    };

    pool.query(queryToRun)
      .then( res => {
        resolve(res.rows);
      })
      .catch( e => console.error(e.stack) );
  });
};

dbUtil.renderTest = function(req, res) {
  Promise.all([
      dbUtil.getRooms("234", "1"),
      dbUtil.getRoomsToClean()
    ])
    .then(([rooms, cleanedRooms]) => {
      res.render("db-test", {
        "dbUtil": dbUtil,
        "rows": rooms,
        "cleanedRooms": cleanedRooms
      });
    });
};

module.exports = dbUtil;
