const {Embed} = require("../../handlers");
module.exports = {
  name: "links",
  description: "all of the links!",
  args: false,
  usage: "<usage here>",
  cooldown: 0,
  aliases: ["links"],
  disabled: false,
  reason: "reason here!",
  developer: false,
  nsfw: false,
  execute(msg, args,client) {
    const embed = new Embed()
    .color()
    .addField("__Here are my links__","[Website](https://jamesbot.ga)\n[Invite](https://bit.ly/2W3MpZP)\n[Vote](https://top.gg/bot/535897587266355228/vote)\n[Extra Stats](https://stats.jamesbot.ga)");
    msg.channel.createMessage( embed);
  },
};
