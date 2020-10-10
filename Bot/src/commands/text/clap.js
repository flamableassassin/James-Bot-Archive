module.exports = {
	name: "clap",
	description: "description",
	args: true,
  usage:"<Text>",
	cooldown: 0,
  aliases: [],
  disabled: false,
  reason: "reason here!",
  developer: false,
	nsfw: false,
  dbl: false,
	execute(msg, args,client,nasa_stuff) {
		client.createMessage(msg.channel.id,"👏"+args.join("👏")+"👏");
	},
};
