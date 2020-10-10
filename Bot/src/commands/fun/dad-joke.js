const fetch = require("node-fetch");
module.exports = {
  name: "dad-joke",
  description: "",
  args: false,
  usage: "<usage here>",
  cooldown: 0,
  aliases: ["links"],
  disabled: false,
  developer: false,
  nsfw: false,
  execute(msg, args,client) {
		fetch("https://icanhazdadjoke.com/?",{
		    headers: {
		      "Accept": "application/json"
		    }})
		  .then(res => res.json())
		  .then(json => msg.channel.createMessage(json.joke));
  },
};
