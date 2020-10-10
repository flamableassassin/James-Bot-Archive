const fetch = require("node-fetch");
module.exports = {
	name: "chuck-norris",
	description: "facts about chuck norris",
	args: false,
  usage:"<usage here>",
	cooldown: 0,
  aliases: ["chuck-norris","chuck-fact","chucknorris","chuckfact"],
  disabled:false,
  reason: "reason here!",
  developer:false,
	nsfw: false,
  dbl: false,
	execute(msg, args,client) {
		fetch("https://api.chucknorris.io/jokes/random")
    .then(res => res.json())
    .then(json => msg.channel.createMessage(json.value));
	},
};
