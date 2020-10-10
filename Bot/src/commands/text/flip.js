const {text_flipper} = require("../../../data.json");
module.exports = {
	name: "text-flip",
	description: "description",
	args: true,
  usage:"<text to flip>",
	cooldown: 0,
  aliases: [],
  disabled: false,
  reason: "reason here!",
  developer: false,
	nsfw: false,
  dbl: false,
	execute(msg, args,client) {
    var keys = Object.keys(text_flipper);
    var args= args.join(" ");
    let reply="";
    for (var i = 0; i < args.length; i++) {
      if (keys.includes(args[i])) {
        reply+=text_flipper[args[i]];
      }else if (args[i]==" "){
        reply+= "ㅤ";
      }else {
        reply+=args[i];
      }
    }
    msg.channel.createMessage(reply);
	},
};
