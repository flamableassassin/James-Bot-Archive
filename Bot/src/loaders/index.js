module.exports = function(client, db, config) {
  require("./commands.js")(client, config);
  require("./handlers.js")(client);
  require("./events.js")(client, db, config);
}
