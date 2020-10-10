module.exports = {
	name: "mock",
	description: "description",
	args: true,
	argsnum: 0,
  usage:"<Text>",
	cooldown: 0,
  aliases: [],
  disabled: false,
  reason: "reason here!",
  developer: false,
	nsfw: false,
  dbl: false,
	execute(msg, args,client) {
    var args= args.join(" ").split("");
		for (var i = 0; i < args.length; i++) {
			if (Math.random() < 0.5)args[i]=args[i].toUpperCase();
		}
  msg.channel.createMessage(args.join(""));
	},
};
