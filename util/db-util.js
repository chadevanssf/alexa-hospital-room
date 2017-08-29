const pg = require("pg");
pg.defaults.ssl = true; // doesn't work for many local installations
const url = require('url');
const squelGeneric = require("squel");
const squel = squelGeneric.useFlavour("postgres");

const DB_SCHEMA = "salesforce"; // default schema name for Heroku Connect
const DB_ROOM_TABLE = "hospital_room__c";

const dbUtil = {};
var currentPool;

dbUtil.getPool = function() {
  if (!currentPool) {
    currentPool = new pg.Pool({
      connectionString: process.env.DATABASE_URL
    });
  }
  return currentPool;
};

dbUtil.closePool = function() {
  if (currentPool) {
    currentPool.end();
  }
};

dbUtil.updateRoomQuery = function() {
  return squel.update()
    .table(DB_SCHEMA + "." + DB_ROOM_TABLE)
    .set("alexa_is_ready__c", true)
    .where("room__c = $1")
    .where("floor__c = $2")
    .toString();
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
    .order("floor__c")
    .order("room__c")
    .toString();
};

dbUtil.getBaseRoomQuery = function() {
  return squel.select()
    .from(DB_SCHEMA + "." + DB_ROOM_TABLE)
    .field("room__c")
    .field("floor__c")
    .field("status__c")
    .field("alexa_is_ready__c")
    .field("name")
    .field("sfid");
};

dbUtil.getRooms = function(newRm, newFl) {
  return new Promise(function(resolve, reject) {
    const queryToRun = {
      text: dbUtil.getRoomQuery(),
      values: [newRm, newFl]
    };

    dbUtil.getPool().query(queryToRun)
      .then( res => {
        resolve(res.rows);
      })
      .catch( e => console.error(e.stack) );
  });
};

dbUtil.updateCleanRoom = function(newRm, newFl) {
  return new Promise(function(resolve, reject) {
    const queryToRun = {
      text: dbUtil.updateRoomQuery(),
      values: [newRm, newFl]
    };

    dbUtil.getPool().query(queryToRun)
      .then( res => {
        resolve(res.rows);
      })
      .catch( e => console.error(e.stack) );
  });
};

dbUtil.getRoomsToClean = function() {
  return new Promise(function(resolve, reject) {
    const queryToRun = {
      text: dbUtil.getRoomToCleanQuery(),
      values: []
    };

    dbUtil.getPool().query(queryToRun)
      .then( res => {
        resolve(res.rows);
      })
      .catch( e => console.error(e.stack) );
  });
};

dbUtil.renderTest = function(req, res) {
  Promise.all([
    dbUtil.updateCleanRoom("745", "3"),
    dbUtil.getRooms("745", "3"),
    dbUtil.getRoomsToClean()
  ])
  .then(([finished, rooms, cleanedRooms]) => {
    res.render("db-test", {
      "dbUtil": dbUtil,
      "finished": finished,
      "rooms": rooms,
      "cleanedRooms": cleanedRooms
    });
  });
};

module.exports = dbUtil;
