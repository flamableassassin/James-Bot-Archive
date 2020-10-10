const fetch = require("node-fetch");
module.exports = {
  name: "fortune",
  description: "description",
  args: false,
  usage: "<usage here>",
  cooldown: 0,
  aliases: ["fortune"],
  disabled: true,
  reason: "Api not return fortunes",
  developer: false,
  nsfw: false,
  dbl: false,
  execute(msg, args, client) {
    fetch("https://uploadbeta.com/api/fortune/")
      .then(res => {
        res.text()
      })
      .then(body => msg.channel.createMessage( body));
  },
};
