module.exports = {
	name: "prefix",
	description: "description",
	args: false,
  usage:"<usage here>",
	cooldown: 3,
  aliases: [],
  disabled: false,
  reason: "reason here!",
  developer: false,
	nsfw: false,
  dbl: false,
	execute(msg, args,client,nasa_stuff,db) {
    db.db("settings").collection("prefix").find({server_id:msg.channel.guild.id}).toArray(function (err,result) {
      var prefix= (result[0]==null) ? "-" : result[0].prefix;
      if (args[0]=="set"){
					if(!msg.channel.guild.members.get(msg.author.id).permission.has("administrator"))return msg.channel.createMessage("Sorry but you can't use this!");
					if(args[1]==null)return msg.channel.createMessage("You need to add your new prefix in");
          if(args[2]!==null)var new_prefix = args.splice(1, args.length).join(" ");
          else var new_prefix = args[1];
          if(result[0]==null){
            db.db("settings").collection("prefix").insertOne({
                server_id: msg.channel.guild.id,
                prefix: new_prefix,
                active:true
              },function (err,res) {
                if (err) {
                  msg.channel.createMessage("An error has occurred");
                  throw err;
                }})
          }else {
            db.db("settings").collection("prefix").updateOne({server_id: msg.channel.guild.id}, {$set: {
                  prefix: new_prefix
                }}, function(err, res) {
                if (err) {
                  msg.channel.createMessage("An error has occurred");
                  throw err;
                }})
          }
          msg.channel.createMessage(`Prefix has been set to \`${new_prefix}\` from\`${prefix}\``);
      }else msg.channel.createMessage(`My prefix for this server is \`${prefix}\``);
    })
  },
};
