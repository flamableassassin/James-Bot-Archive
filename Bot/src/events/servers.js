const {
  Embed,
  logic
} = require("../handlers/index.js");
module.exports = function(client, db) {
  client.on("guildCreate", async (guild) => {
    let owner = guild.members.get(guild.ownerID);
    let bot_count = guild.members.filter(member => member.bot).length;
    const embed = new Embed()
      .color()
      .author(guild.name, guild.iconURL)
      .title("I have joined a new guild")
      .addField("**__Info:__**", `Name: ${guild.name}\nOwner: ${owner.mention} \`${owner.username}\`\nCreated: ${logic.dateconv(guild.createdAt)}\nMembers: ${guild.memberCount}\nBots: ${bot_count}`)
      .timestamp()
      .footer(`ID: ${guild.id}`);
    client.createMessage("630139371022188567", embed);
  });

  client.on("guildDelete", (guild) => {
    let owner = guild.members.get(guild.ownerID);
    const embed = new Embed()
      .color()
      .timestamp()
      .author(guild.name, guild.iconURL)
      .title("I have left a new server!")
      .footer(`ID: ${guild.id}`)
      .addField("**__Info__**", `Name: ${guild.name}\nOwner: ${owner.mention} \`${owner.username}#${owner.discriminator}\`\nJoined: ${logic.dateconv(guild.joinedAt)}`);
    client.createMessage("630139371022188567", embed);
  });
}
