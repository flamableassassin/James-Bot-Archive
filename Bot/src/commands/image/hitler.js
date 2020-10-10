const jimp = require("jimp");
module.exports = {
  name: "hitler",
  description: "",
  args: false,
  cooldown: 5,
  aliases: [],
  disabled: false,
  reason: "still being made!",
  dbl: true,
  async execute(msg, args, client) {
    //avatar stuff
    let old_msgs = Array.from(msg.channel.messages.keys());
    let old_msg = msg.channel.messages.get(old_msgs[old_msgs.length - 2]);
    let avatarURL;

    if (msg.mentions.length !== 0) avatarURL = msg.mentions[0].staticAvatarURL;
    else if (msg.attachments.length !== 0) avatarURL = msg.attachments[0].url;
    else if (old_msg !== undefined && old_msg.attachments.length !== 0) avatarURL = old_msg.attachments[0].url;
    else avatarURL = msg.author.staticAvatarURL;

    //-------//
    const image = await jimp.read("./src/images/hitler.png");
    const user = await jimp.read(avatarURL);
    user.resize(185, 205);
    image.composite(user, 53, 40);
    const new_image = await image.getBufferAsync(jimp.MIME_PNG);
    msg.channel.createMessage( "", {
      name: "jamesbot.ga.png",
      file: new_image
    });
  },
};
