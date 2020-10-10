const {
  loaders,
  disabled_events,
} = require("./src");
const config = require('./config.js');
const eris = require('eris', {
  disableEveryone: true,
  disableEvents: disabled_events,
  maxShards: 1
});
const MongoClient = require('mongodb');
//database stuff//
MongoClient.connect(config.db_token, {
  useUnifiedTopology: true
}, function(err, db) {
  if (err) throw err;
  else console.log("Connected to DB");
  //bot stuff//
  var token = config.dev_mode ? config.token.dev : config.token.james;
  var client = new eris(token);
  client.config = config;

  loaders(client, db, config)
  //-------------------//
  if (!config.dev_mode) {
    //chewey stuff//
    var cheweyBotAnalyticsAPI = require("discord-bot-analytics");
    var customAnalytics = new cheweyBotAnalyticsAPI(config.chewey_token, client);
  }
  //-------------//
  client.connect();
})
