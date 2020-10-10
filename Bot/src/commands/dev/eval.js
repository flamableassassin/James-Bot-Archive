const {
  Embed,
  logic
} = require("../../handlers");
const {
  inspect
} = require("util");
module.exports = {
  name: "eval",
  description: "description",
  args: true,
  usage: "<What to eval>",
  cooldown: 0.1,
  aliases: ["e"],
  disabled: false,
  reason: "reason here!",
  developer: true,
  nsfw: false,
  mod_role: false,
  async execute(msg, args, client, db) {
    let set_async = false;
    let depth = 0;
    let content = msg.content.split(" ");
    content.shift();
    if (msg.content.includes("--depth")) {
      depth = parseInt(msg.content[msg.content.indexOf("--depth") + 2]);
      content.splice(content.indexOf("--depth"), 3);
    }
    if (msg.content.includes("--async")) {
      set_async = true;
      content.splice(content.indexOf("--async"), 1)
    }
    content = content.join(" ")
    if (set_async) content = `(async () => { ${content} })()`;

    let res;
    let end;
    let error = false;
    let now = process.hrtime.bigint();
    try {
      res = await eval(content)
      end = process.hrtime.bigint();
    } catch (e) {
      end = process.hrtime.bigint();
      error = true;
      res = e;
    } finally {
      let time = end - now;

      if (res && typeof res !== "string") {
        res = inspect(res, {
          depth: depth,
          maxArrayLength: 50
        });
      }
      if (res) {
        res = res.replace(new RegExp(, "g"), "-- Redacted ---")
          .replace(new RegExp(client.config.token.main, "g"), "-- Redacted ---")
          .replace(new RegExp(client.config.token.dev, "g"), "-- Redacted ---")
          .replace(new RegExp(client.config.chewey_token, "g"), "-- Redacted ---")
          .replace(new RegExp(client.config.nasa_token, "g"), "-- Redacted ---")
          .replace(new RegExp(client.config.dbl_token, "g"), "-- Redacted ---");
      }

      const embed = new Embed()
        .color(error ? "#ff0000" : "#00ff00")
        .title("Result")
        .description(`Time: ${logic.nano(time)}`)
        .addField("Result:", `\`\`\`js\n${res}\`\`\``);
      msg.channel.createMessage(embed);
    }
  },
};