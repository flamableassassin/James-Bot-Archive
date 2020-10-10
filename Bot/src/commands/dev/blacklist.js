module.exports = {
  name: 'blacklist',
  description: 'description',
  args: false,
  argsnum: 0,
  usage: "<usage here>",
  cooldown: 5,
  aliases: ['bl'],
  disabled: false,
  reason: "reason here!",
  developer: true,
  nsfw: false,
  dbl: false,
  execute(msg, args, client, nasa_stuff, db, config) {
    let type = args[0];
    if (args[2] === undefined) {
      db.db("settings").collection("blacklist").insertOne({
        type: args[0],
        id: args[1]
      }, (err, res) => {
        if (err) {
          console.error(err);
          msg.channel.createMessage("There was an error!");
        } else msg.channel.createMessage(`${args[0]==="u"?`<@${args[1]}>`: args[1]} was blacklisted`);
      })
    } else if (args[2] === "--r") {
      db.db("settings").collection("blacklist").deleteOne({
        type: args[0],
        id: args[1]
      }, (err, res) => {
        if (err) {
          console.error(err);
          msg.channel.createMessage("There was an error!");
        } else msg.channel.createMessage(`${args[0]==="u"?`<@${args[1]}>`: args[1]} was removed from the blacklist`);
      });
    }
  },
};
