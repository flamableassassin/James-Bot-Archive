const fetch = require("node-fetch");
const {
  Collection
} = require("eris");
const DBL = require("dblapi.js");
module.exports = async function(client, db, config) {
  let dbl;
  if (!config.dev_mode) dbl = new DBL(config.dbl_token, client);
  //nasa stuff//
  let nasa_stuff;
  try {
    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${config.nasa_token}`, {
      timeout: 5000
    });
    if (res.ok) nasa_stuff = await res.json();
    else nasa_stuff = {
      media_type: "image",
      hdurl: "https://apod.nasa.gov/apod/image/2003/GalCenterRadXray_NASA_10800.jpg",
      title: "The Galactic Center from Radio to X-ray"
    };
  } catch (e) {
    nasa_stuff = {
      media_type: "image",
      hdurl: "https://apod.nasa.gov/apod/image/2003/GalCenterRadXray_NASA_10800.jpg",
      title: "The Galactic Center from Radio to X-ray"
    };
  }

  //command stuff//
  const cooldowns = new Collection();
  //--command handling--//
  client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (message.channel.type !== 0) return;
    db.db("settings").collection("prefix").find({
      server_id: message.channel.guild.id
    }).toArray(async function(err, result) {

      //prefix stuff
      var prefix = (result[0] == null) ? config.prefix : result[0].prefix
      if (message.content.startsWith(prefix)) var args = message.content.slice(prefix.length).toLowerCase().split(/[ ]+/g);
      else if (message.content.startsWith(`<@!${client.user.id}>`)) var args = message.content.slice(`<@!${client.user.id}>`.length).toLowerCase().split(/ +/);
      else if (message.author.id === config.owner_id && message.content.startsWith(config.owner_prefix)) var args = message.content.slice(config.owner_prefix.length).toLowerCase().split(/ +/);
      else return;
      if (args[0] == "") args.shift()
      const commandName = args.shift();
      //checking channel perms to see if the bot can send msg to it//
      if (!message.channel.permissionsOf(client.user.id).has("sendMessages")) return;
      //finding command//
      const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

      if (!command) return;

      //for dev only commands when in dev_mode//
      if (config.dev_mode && message.author.id != config.owner_id) return;

      // developer command //
      if (command.developer && message.author.id != config.owner_id) return;

      //checking if user is blacklisted//
      db.db("settings").collection("blacklist").findOne({
        id: message.author.id,
        type: "u"
      }, async (err, res) => {
        if (err) return;
        if (res !== null) return;
        // disabled command //
        if (command.disabled && message.author.id != config.owner_id) {
          let reply = `\n\`${command.name}\` has been disabled!`
          if (command.reason) {
            reply += `\nReason: \`${command.reason}\``
          }
          client.createMessage(message.channel.id, reply).then((msg) => {
            setTimeout(function() {
              msg.delete();
            }, 7500);
          })
          return;
        }

        // nsfw //
        if (!config.dev_mode && command.nsfw && !message.channel.nsfw) {
          client.createMessage(message.channel.id, `\`${command.name}\` needs to be used in a NSFW channel!`).then((msg) => {
            setTimeout(function() {
              msg.delete();
            }, 7500);
          })
          return;
        }

        // dbl //
        if (command.dbl && message.author.id != config.owner_id) {
          let dbl_user = await dbl.hasVoted(message.author.id);
          if (!dbl_user) {
            return;
            client.createMessage(message.channel.id, `Sorry but you need to vote for me on top.gg to use: \`${command.name}\`\nhttps://top.gg/bot/535897587266355228/vote`).then((msg) => {
              setTimeout(function() {
                msg.delete()
              }, 7500);
            });
            return;
          }
        }

        // args //
        if (command.args && args.length === 0) {
          let reply = `You didn't provide any arguments, ${message.author.mention}!`;
          if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
          }
          return message.channel.createMessage(reply);
        }

        // cooldown //
        if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.createMessage(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
          }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        message.prefix = prefix;

        try {
          let res = command.execute(message, args, client, db)
          if (res instanceof Promise) await res;
        } catch (error) {
          console.error(error);
          message.channel.createMessage("This shouldn\'t have happened");
        }
      });
    });
  });
};
