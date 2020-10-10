const jimp = require("jimp");
module.exports = {
  name: "hue",
  description: "",
  args: false,
  cooldown: 5,
  aliases: [],
  disabled: false,
  reason: "still being made!",
  dbl: true,
  async execute(msg, args, client) {
    args = args.filter(word => !(/\<([^\]]+)\>/g).test(word));
    let num = parseInt(args[0]);
    if (num > 360 || num < 0) return client.createMessage(msg.channel.id, "Please choose a number between 0 and 360");
    num = (isNaN(num)) ? num : 180;
    //avatar stuff
    let old_msgs = Array.from(msg.channel.messages.keys());
    let old_msg = msg.channel.messages.get(old_msgs[old_msgs.length - 2])
    let avatarURL;

    if (msg.mentions.length !== 0) avatarURL = msg.mentions[0].staticAvatarURL;
    else if (msg.attachments.length !== 0) avatarURL = msg.attachments[0].url;
    else if (old_msg !== undefined && old_msg.attachments.length !== 0) avatarURL = old_msg.attachments[0].url;
    else avatarURL = msg.author.staticAvatarURL;

    //-------//
    const user = await jimp.read(avatarURL);
    user.color([{
      apply: "hue",
      params: [100]
    }]);
    const new_image = await user.getBufferAsync(jimp.MIME_PNG);
    msg.channel.createMessage( "", {
      name: "jamesbot.ga.png",
      file: new_image
    });
  },
};
