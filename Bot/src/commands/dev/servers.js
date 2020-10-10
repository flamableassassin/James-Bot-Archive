module.exports = {
	name: "servers",
	description: "all of the links!",
	args: false,
  usage:"<usage here>",
	cooldown: 5,
  aliases: ["server","servers"],
  disabled: false,
  reason: "erroring!",
  developer: true,
	execute(msg, args,client) {
		var reply="";
		client.guilds.forEach((value,key) => {
			reply+=`\n${value.name} - ${key}`
		});
		if(reply.length > 2000){
			reply.split(0,2000);
			reply.split("\n").pop();
			reply.join("\n");
			reply+="\nUnable to send more";
		}
		msg.author.getDMChannel().then(chan=>chan.createMessage(reply));
	}
};
