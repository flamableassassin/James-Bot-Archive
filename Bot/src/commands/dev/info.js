
module.exports = {
  name: 'info',
  description: 'description',
  args: true,
  argsnum: 1,
  usage: "<server_id>",
  cooldown: 0,
  aliases: [],
  disabled: false,
  reason: "reason here!",
  developer: true,
  nsfw: false,
  dbl: false,
  execute(msg, args, client, nasa_stuff, db) {
    var server = client.guilds.get(args[0]);
    let bot_count = server.members.filter(member => member.bot).length;

    if (server.unavailable) return msg.channel.createMessage("Guild is unavailable");
    let owner = server.members.get(server.ownerID);
    const data = {
      "embed": {
        "description": `User count: ${server.memberCount}\nBots: ${bot_count}\nChannels: ${server.channels.size}\nCreated: ${new Date(server.createdAt)}\nJoined: ${new Date(server.joinedAt)}`,
        "image": {
          "url": server.iconURL
        },
        "author": {
          "name": owner.username,
          "icon_url": owner.avatarURL
        }
      }
    };
    msg.channel.createMessage( data);
  },
};
