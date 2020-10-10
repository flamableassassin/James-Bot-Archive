const fetch = require("node-fetch");
module.exports = {
	name: "jokes",
	description: "all of the links!",
	args: false,
  usage:"<usage here>",
	cooldown: 0,
  aliases: ["jokes","joke"],
  disabled:false,
  reason: "reason here!",
  developer:false,
	nsfw: false,
	execute(msg, args,client) {
    msg.channel.createMessage( `<a:loading:561526039407493130> Loading`).then((message)=>{
			fetch("https://sv443.net/jokeapi/category/Any?blacklistFlags=nsfw")
    	.then(res => res.json())
    	.then(json =>{
        if (json.type == "single") {
          message.edit(json.joke);
        }else {
          message.edit(json.setup+"...").then((message)=>{
            setTimeout(function(){
              msg.channel.createMessage( json.delivery);
            }, 3000);
          })
        }
      });
    })
	},
};
