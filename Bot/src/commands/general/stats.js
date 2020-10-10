const {
  Embed
} = require("../../handlers");
const {
  VERSION
} = require("eris");
module.exports = {
  name: "stats",
  description: "all of the commands!",
  args: false,
  cooldown: 0,
  aliases: ["stats", "stat", "bot-info", "botinfo"],
  execute(msg, args, client) {
    if (process.platform) {
      if (process.platform === "win32") result = "Windows";
      else if (process.platform === "aix") result = "Aix";
      else if (process.platform === "linux") result = "Linux";
      else if (process.platform === "darwin") result = "Darwin";
      else if (process.platform === "openbsd") result = "OpenBSD";
      else if (process.platform === "sunos") result = "Solaris";
      else if (process.platform === "freebsd") result = "FreeBSD";
    }
    const embed = new Embed()
      .title("Bot Stats")
      .color()
      .addField("**__Stats:__**", `Server Count: ${client.guilds.size}\nUsers: ${client.users.size}\nNode Version: ${process.version}\nEris Version ${VERSION}\nOS: ${result}\nMade By: ♛ ᖴᒪᗩᙏᙏᗩᙖᒪᙓᗩSSᗩSSIᑎ® ♛#4701`)
      .timestamp();
    msg.channel.createMessage( embed);
  },
};
