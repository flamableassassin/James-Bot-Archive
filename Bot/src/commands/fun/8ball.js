const fetch = require("node-fetch");
module.exports = {
  name: "8ball",
  description: "all of the commands!",
  args: true,
  argsnum: 0,
  usage: "<Question>",
  cooldown: 0,
  aliases: [`8ball`],
  execute(msg, args, client) {
    //-changing args into a string-//
    var args = args.join("%20");
    fetch("https://8ball.delegator.com/magic/JSON/" + args)
      .then(res => res.json())
      .then(json => msg.channel.createMessage(json.magic.answer));
  },
};
