const fetch = require("node-fetch");
module.exports = {
	name: "useless-fact",
	description: "description",
	args: false,
  usage:"<usage here>",
	cooldown: 0,
  aliases: ["uselessfact"],
  disabled:false,
  reason: "reason here!",
  developer:false,
	nsfw: false,
  dbl: false,
	execute(msg, args,client) {
	fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(res => res.json())
    .then(json => msg.channel.createMessage(json.text));
  },
};
