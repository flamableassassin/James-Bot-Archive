module.exports = {
	name: "ping",
	description: "all of the links!",
	args: false,
  usage:"<usage here>",
	cooldown: 0,
  aliases: ["pong","ping"],
  disabled:false,
  reason: "reason here!",
  developer:false,
	nsfw: false,
	execute(msg, args,client) {
    msg.channel.createMessage(`Pong\n${msg.channel.guild.shard.latency}ms 💓`).then((message) => {
			message.edit(`${msg.channel.guild.shard.latency}ms 💓\n${message.timestamp-msg.timestamp}ms ⏱`);
    })
	},
};
