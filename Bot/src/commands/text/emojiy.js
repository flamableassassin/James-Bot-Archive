const {
  emojis
} = require("../../../data.json");
module.exports = {
  name: "emojiy",
  description: "description",
  args: false,
  usage: "<Text>",
  cooldown: 0,
  aliases: ["emojiy"],
  disabled: false,
  reason: "reason here!",
  developer: false,
  nsfw: false,
  dbl: false,
  execute(msg, args, client) {
    if (args.length == 0) return msg.channel.createMessage("Please add the text to emojiy");
    var keys = Object.keys(emojis);
    var args = args.join(" ");
    let reply = "";
    for (var i = 0; i < args.length; i++) {
      if (keys.includes(args[i])) {
        reply += emojis[args[i]];
      } else if (args[i] == " ") {
        reply += "ㅤ";
      } else reply += args[i];
    }
    msg.channel.createMessage(reply);
  },
};
