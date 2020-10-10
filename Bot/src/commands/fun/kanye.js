const fetch = require("node-fetch");
module.exports = {
	name: "kanye",
	description: "description",
	args: false,
  usage:"<usage here>",
	argsnum: 0,
	cooldown: 0,
  aliases: ["kanye"],
  disabled: false,
  reason: "reason here!",
  developer: false,
	nsfw: false,
  dbl: false,
	execute(msg, args,client,settingsdb) {
		fetch("https://api.kanye.rest/")
		    .then(res => res.json())
		    .then(json => msg.channel.createMessage(json.quote));
	},
};
