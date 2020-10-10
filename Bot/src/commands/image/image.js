const {
  images_array
} = require("../../../data.json");
const {
  Embed
} = require("../../handlers");
const fetch = require("node-fetch");
module.exports = {
  name: "images",
  description: "image commands!",
  args: false,
  cooldown: 1,
  aliases: ["images", "image", "pictures", "picture", "pic", "pics"],
  execute(msg, args, client) {
    if (args[0] == null) {
      const embed = new Embed()
        .color()
        .description("Space\nCat\nDog\nBird\nNature\nFantasy-Art\nPlane\nOtter\nRabbit\nSnake\nCar\nTurtle\nDuck\nRed-Panda\nFox\nPanda\nKoala\nRacoon")
        .footer("Made with the chewey bot api and some-random-api.ml");
      msg.channel.createMessage(embed).then((message) => {
        fetch("https://api.chewey-bot.top/endpoints")
          .then(res => res.json())
          .then(json => {
            var data = json.data;
            var keys = Object.keys(json.data);
            var response = "";
            for (var i = 0; i < keys.length; i++) {
              response += keys[i] + ": " + data[keys[i]]["count"] + "\n";
            }
            response += "Red-Panda\nFox\nPanda\nKoala\nRacoon"
            const embed = new Embed()
              .title("All of the images!")
              .color()
              .description(response)
              .footer("Made with the chewey bot api and some-random-api.ml");
            message.edit(embed);
          });
      });
    } else {
      msg.channel.createMessage(`<a:loading:561526039407493130> Loading`).then((message) => {
        if (images_array.chewey.includes(args[0])) {
          //requesting to api//
          fetch(`https://api.chewey-bot.top/${args[0]}?auth=${client.config.chewey_token}`)
            .then(res => res.json())
            .then(json => {
              var data = json.data;
              const embed = new Embed()
                .title("Here is your " + args[0])
                .color()
                .author(msg.author.username, msg.author.displayAvatarURL, data)
                .footer("Provide By the Chewey Bot Api!")
                .image(data);
              message.edit(embed);
            });
        } else {
          var keys = Object.keys(images_array["random-api"]);
          if (keys.includes(args[0])) {
            fetch(`https://some-random-api.ml/img/${images_array["random-api"][args[0]]}`)
              .then(res => res.json())
              .then(json => {
                var data = json.link;
                const embed = new Embed()
                  .title("Here is your " + args[0])
                  .color()
                  .author(msg.author.username, msg.author.displayAvatarURL, data)
                  .footer("Provide By some-random-api.ml!")
                  .image(data);
                message.edit(embed);
              })
          } else {
            message.edit("Please chose a valid image command");
          }
        }
      });
    }
  },
};
