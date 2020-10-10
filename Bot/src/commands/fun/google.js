const googleProfanityWords = require("google-profanity-words");
const checker = require("noswearing");
const googleIt = require("google-it");
module.exports = {
  name: "google",
  description: "description",
  args: true,
  argsnum: 0,
  usage: "<What your searching>",
  aliases: ["google", "search"],
  cooldown: 5,
  disabled: false,
  reason: "reason here!",
  developer: false,
  nsfw: false,
  dbl: false,
  execute(msg, args, client) {
    var Filter = require("bad-words"),
      filter = new Filter();
    filter.addWords("xvideos", "xvideo");
    var args = args.join(" ");
    if (!msg.channel.nsfw) {
      if (googleProfanityWords.list().includes(args)) {
        return msg.channel.createMessage("Sorry but please try searching something else!\nOr try in a NSFW channel");
      } else if (checker(args)[0] != null) {
        return msg.channel.createMessage("Sorry but please try searching something else!\nOr try in a NSFW channel");
      } else if (filter.isProfane(args)) {
        return msg.channel.createMessage("Sorry but please try searching something else!\nOr try in a NSFW channel");
      }
    }
    msg.channel.createMessage(`<a:loading:561526039407493130> Loading`).then((message) => {
      googleIt({
        "query": args
      }).then(results => {
        var response = "";
        for (var i = 0; i < results.length; i++) {
          response += `- [${results[i].title}](${results[i].link})\n`;
        }
        const data = {
          "content": "",
          "embed": {
            "title": `Here is what i found for __${args}__`,
            "description": response,
            "color": 3553599
          }
        };
        message.edit(data);
      }).catch(e => {
        console.error(e);
        message.edit("Oops this shouldn\'t have happened!");
      })
    })
  },
};
