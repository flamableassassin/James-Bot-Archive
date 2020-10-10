module.exports = {
	name: "flip-coin",
	description: "description",
	args: false,
  usage:"<usage here>",
	cooldown: 0,
  aliases: ["flip-coin","flipcoin"],
  disabled:false,
  reason: "reason here!",
  developer:false,
	nsfw: false,
  dbl: false,
	execute(msg, args,client) {
    if (Math.random() >= 0.5) msg.channel.createMessage("Heads!");
    else msg.channel.createMessage("Tails!");
	},
};
