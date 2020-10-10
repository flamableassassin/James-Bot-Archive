const fetch = require("node-fetch");
module.exports = {
	name: "yomomma",
	description: "description",
	args: false,
	argsnum: 0,
  usage:"<usage here>",
	cooldown: 0,
  aliases: ["momma","yo-momma"],
  disabled: false,
  reason: "Unable to get anything from server!",
  developer: false,
	nsfw: false,
  dbl: false,
	execute(msg, args,client) {
		fetch("https://jokes.guyliangilsing.me/retrieveJokes.php?type=yomama")
    .then(res => res.json())
    .then(json => msg.channel.createMessage(json.joke));
	},
};
