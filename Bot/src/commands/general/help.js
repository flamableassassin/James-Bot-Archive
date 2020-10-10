const {
  help_handler,
  Embed,
  ReactionHandler
} = require("../../handlers/index.js");

module.exports = {
  name: "help",
  description: "all of the commands!",
  args: false,
  cooldown: 3,
  aliases: [],
  async execute(msg, args, client, nasa_stuff, db) {
    let config = client.config;
    let prefix = msg.prefix;
    //getting first help msg//
    let num = 0;
    let help_msg = help_handler(0, prefix);
    //creating help msg//
    let embed = new Embed()
      .color()
      .author(msg.author.username, msg.author.avatarURL)
      .title(`Help for \`${help_msg[0]}\``)
      .description(help_msg[1])
      .timestamp()
      .footer(`Bot made by ♛ ᖴᒪᗩᙏᙏᗩᙖᒪᙓᗩSSᗩSSIᑎ® ♛#4701 || Page 1`);
    //nasa nasa stuff//
    if (nasa_stuff.media_type === "image") {
      embed.image(nasa_stuff.hdurl)
        .addField("🔽Nasa Image of the day🔽", "Title: " + nasa_stuff.title);
    } else embed.addField("Nasa Video of the day", `Title: ${nasa_stuff.title}\nVideo: [Link](${nasa_stuff.url})`);
    //sending help msg//
    let message = await msg.channel.createMessage(embed);
    //deleting the nasa stuff from the embed
    if (nasa_stuff.media_type === "image") delete embed.embed.image;
    embed.embed.fields.shift();
    //adding reactions
    await message.addReaction("⬅");
    await message.addReaction("❌");
    await message.addReaction("⏹");
    await message.addReaction("➡");
    if (msg.author.id === config.owner_id) await message.addReaction("🖥");
    //reaction handler
    const reaction_handler = new ReactionHandler(client, (message, emoji, userID, type) => {
      if (msg.author.id !== userID || userID === client.user.id) return false;
      if (emoji.name === "➡" || emoji.name === "⬅" || emoji.name !== "❌" || emoji.name !== "⏹" || emoji.name !== "🖥") return true;
      if (emoji.name === "🖥" && config.owner_id !== userID) return false;
      return true;
    }, {
      time: 30000,
      messageID: message.id,
      maxMatches: Infinity,
      allowedTypes: ["add"]
    })
    //--------------------------------------------------------------------------------------//
    reaction_handler.on("reactionAdd", (message, emoji, userID) => {
      if (emoji.name === "🖥") {
        help_msg = help_handler("dev", prefix, config);
        embed.title(`Help for \`${help_msg[0]}\``)
          .description(help_msg[1])
          .footer(`Bot made by ♛ ᖴᒪᗩᙏᙏᗩᙖᒪᙓᗩSSᗩSSIᑎ® ♛#4701 || Dev`);
        message.edit(embed);
        return reaction_handler.stop("dev");
      }
      if (emoji.name === "⏹") return reaction_handler.stop("stay");
      if (emoji.name === "❌") return reaction_handler.stop("stop");
      if (emoji.name === "➡" || emoji.name === "⬅") {
        //number for changing the page
        if (emoji.name === "➡") num = (num === 4) ? 0 : num + 1;
        else num = (num === 0) ? 4 : num - 1;

        help_msg = help_handler(num, prefix, config);
        embed.title(`Help for \`${help_msg[0]}\``)
          .description(help_msg[1])
          .footer(`Bot made by ♛ ᖴᒪᗩᙏᙏᗩᙖᒪᙓᗩSSᗩSSIᑎ® ♛#4701 || Page ${num}`);
        message.edit(embed);
        message.removeReaction((emoji.name === "➡") ? "➡" : "⬅", msg.author.id);
      }
    })
    //ending the handler
    reaction_handler.on("end", (msg2, reason) => {
      message.removeReactions();
      if (reason === "dev" || reason === "stay") return;
      embed.title("Help command has " + ((reason === "time") ? "timed out" : "been stopped"))
        .description(`If you wish to view the menu again please run \`${prefix}help\``)
        .footer(`Bot made by ♛ ᖴᒪᗩᙏᙏᗩᙖᒪᙓᗩSSᗩSSIᑎ® ♛#4701 `);
      return message.edit(embed);
    })
  }
}
