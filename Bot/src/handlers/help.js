module.exports = function(page, prefix, config) {
  switch (page) {
    case 0:
      return ["Key", "**__Commands:__**\nNeeded - `{}`\nNot Needed - `[]`\n\n**__Help Contoller:__**\n➡ - Next page\n⬅- Previous page\n❌ - Close help\n⏹ - Stop but don't close help"];

    case 1:
      return ["General", `${prefix}Help\n${prefix}Bot-info\n${prefix}Ping\n${prefix}Links\n${prefix}Prefix set {new_prefix}`];

    case 2:
      return ["Fun Commands", `${prefix}FlipCoin\n${prefix}Dad-Joke\n${prefix}8Ball {question}\n${prefix}Chuck-Norris\n${prefix}Chuck-Facts\n${prefix}Yes-No\n${prefix}Fortune\n${prefix}Useless-Fact\n${prefix}Trump-Quote\n${prefix}Kanye\n${prefix}Google {what you want to search}\n${prefix}YoMomma`];

    case 3:
      return ["Images", `${prefix}Images [image] _use \`-images\` to view the arguments_\n${prefix}Trapcard [@user]\n${prefix}Hitler [@user]\n${prefix}Invert [@user]\n${prefix}Image-Flip [@user]\n${prefix}Brightness [Number between 0-20] [@user]\n${prefix}Contrast [Number between 0-20] [@user]\n${prefix}Pixelate [Random number] [@user]\n${prefix}Fade [Number between 0-20] [@user]\n${prefix}Grey-Scale [@user]`];

    case 4:
      return ["Text Editing Commands", `${prefix}Emojiy {text}\n${prefix}Wave {text}\n${prefix}Text-Flipper {text}\n${prefix}Mock {text}`];
    case "dev":
      return ["Developer commands", `${config.owner_prefix}Commands\n${config.owner_prefix}Info {server_id}\n${config.owner_prefix}Restart\n${config.owner_prefix}Servers\n${config.owner_prefix}Dev-prefix {server_id} {new_prefix}`];
    default:
      return ["Key", "**__Commands:__**\nNeeded - `{}`\nNot Needed - `[]`\n\n**__Help Contoller:__**\n➡ - Next page\n⬅- Previous page\n❌ - Close help\n⏹ - Stop but don't close embed"];
  }
}
