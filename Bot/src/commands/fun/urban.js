const urban = require("urban")
const {
  Embed
} = require("../../handlers")
module.exports = {
  name: "urban",
  description: "all of the links!",
  args: true,
  argsnum: 0,
  usage: "<word/phrase>",
  cooldown: 0,
  aliases: [],
  disabled: false,
  nsfw: true,
  reason: "reason here!",
  developer: false,
  execute(msg, args, client) {
    const embed = new Embed()
      .color();
    var args = args.join(" ");
    //--getting definition--//
    msg.channel.createMessage(`<a:loading:561526039407493130> Loading`).then((message) => {
      urban(args).first(function(json) {
        if (json === undefined) {
          embed.timestamp()
            .title("I couldn't a definition for that!")
          return message.edit(embed);
        }
        embed.title(`Urban Dictionary: ${json.word}`, json.permalink)
          .footer(`👍 ${json.thumbs_up} | 👎 ${json.thumbs_down} | Written on:`)
          .author(msg.author.username, msg.author.avatarURL)
          .addField("**__Definition:__**", test(json.definition))
          .addField("**__Extra info:__**", `Author: ${json.author}\nID: ${json.defid}\nLink: [${json.permalink}](${json.permalink})`)
          .timestamp(json.written_on)
        if (json.example !== "") embed.addField("**__Example:__**", test(json.example));
        message.edit(embed);
      });
    })
  },
};

function test(text) {
  return text.replace(/\[([^\]]+)\]/g, (g1, g2, g3) => `[${g2}](http://${(g2.includes(" "))?g2.replace(/[\s]/g,"-"):g2}.urbanup.com)`);
}
