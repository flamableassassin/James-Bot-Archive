const fetch = require("node-fetch");
module.exports = {
	name: "trump-quote",
	description: "all of the links!",
	args: false,
  usage:"<usage here>",
	cooldown: 0,
  aliases: ["trump","trump-quote","trumpquote","quote-trump"],
  disabled:false,
  reason: "reason here!",
  developer:false,
	nsfw: true,
	execute(msg, args,client) {
    msg.channel.createMessage(`<a:loading:561526039407493130> Loading`).then((message)=>{
			fetch("https://api.tronalddump.io/random/quote")
    .then(res => res.json())
    .then(json => message.edit(json.value));
    })
	},
};
