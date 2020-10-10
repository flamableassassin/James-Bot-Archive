const {
  Embed
} = require("../handlers/index.js");
module.exports = function(client, config) {
  client.on("ready", () => {
    console.log(`Bot logged as ${client.user.username}#${client.user.discriminator}`);
    if (config.dev_mode) {
      client.editStatus("online", {
        name: `flammableassassin trying to code`,
        type: 3
      });
    } else {
      client.editStatus("online", {
        name: `${client.guilds.size} servers!`,
        type: 3
      });
      const embed = new Embed()
        .color()
        .timestamp()
        .title("Bot Started Up!")
        .description(`Guild Count: ${client.guilds.size}\nUser Count: ${client.users.size}`);
      client.createMessage("609119595793612835", embed);

    }
  })
  process.on("unhandledRejection", error => console.error("Uncaught Promise Rejection", error));
  client.on("error", (e) => console.error(`Error: ` + e));
  client.on("warn", (warn) => console.warn(`Warn: ` + warn));

  if (config.dev_mode) {
    client.on("debug", (msg) => console.info(`Debug: ` + msg));
  }
}
