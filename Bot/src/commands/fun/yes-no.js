const fetch = require("node-fetch");
module.exports = {
  name: "yes-no",
  description: "all of the links!",
  args: false,
  usage: "<usage here>",
  cooldown: 0,
  aliases: ["yes no", "yesno", "no-yes"],
  disabled: false,
  reason: "reason here!",
  developer: false,
  nsfw: false,
  execute(msg, args,client) {
    fetch("https://yesno.wtf/api/")
      .then(res => res.json())
      .then(json => {
        const data = {
          "embed": {
            "color": 8978265,
            "image": {
              "url": json.image
            }
          }
        };
        msg.channel.createMessage( data);
      });
  },
};
