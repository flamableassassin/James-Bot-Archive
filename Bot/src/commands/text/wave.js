module.exports = {
  name: "wave",
  description: "description",
  args: true,
  usage: "<text>",
  cooldown: 0,
  aliases: ["wave"],
  disabled: false,
  reason: "reason here!",
  developer: false,
  nsfw: false,
  dbl: false,
  execute(msg, args, client) {
    var space = "";
    var forward = true;
    var reply = "";
    for (word of args) {
      for (letter of word) {
        reply += space + letter + "\n";
        if (space.length == 0) forward = true;
        forward ? space += " " : space = space.slice(0, space.length - 1);
      }
      forward ? forward = false : forward = true;
    }
    if (reply.length > 2000) reply = reply.slice(0, 1950) + "\n_some was cut_";
    msg.channel.createMessage(reply);
  },
};
