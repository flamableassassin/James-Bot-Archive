module.exports = {
  name: "dev-prefix",
  description: "description",
  args: true,
  argsnum: 2,
  usage: "<server_id> <new_prefix>",
  cooldown: 0,
  aliases: [],
  disabled: false,
  reason: "reason here!",
  developer: true,
  nsfw: false,
  dbl: false,
  execute(msg, args, client, nasa_stuff, db) {
    db.db("settings").collection("prefix").find({server_id: args[0]}).toArray(function(err, result) {
      //checking if server has data on db//
      if (result.length === 0) return msg.channel.createMessage("Server hasn't got a set prefix");
      //getting new prefix
      if(args[2]!==null)var new_prefix = args.splice(1, args.length).join(" ");
      else var new_prefix = args[1];
      //updating prefix//
      db.db("settings").collection("prefix").updateOne({server_id: args[0]}, {
        $set: {
          prefix: new_prefix
        }
      }, function(err, res) {
        if (err) {
          msg.channel.createMessage("An error has occurred");
          throw err;
        }
      })
      return msg.channel.createMessage(`Prefix has been changed to \`${new_prefix}\``);
    })
  },
};
