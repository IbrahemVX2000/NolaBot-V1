import DIG from "discord-image-generation";
import fs from "fs-extra";
const config = {
  name: "زبالة",
  aliases: ["زباله"],
  cooldown: 20,
  credits: "IbrahemVX2000"
};

async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  try {
    const { mentions, messageReply, senderID } = message;
    const { Users } = global.controllers;
    const targetID = Object.keys(mentions)[0] || messageReply?.senderID;
    if (!targetID) return message.reply("يرجى الرد على رساله احدهم");
    message.react("⚙");
    let UID= await global.getAvatarURL(targetID);
    const ava = await global.streamURL(UID);
    const avaURl = await global.getImgUrl(ava);
    const img = await new DIG.Trash().getImage(avaURl.image.url);
    const path = `${global.cachePath}/trash.png`;
    fs.writeFileSync(path, Buffer.from(img));
    message.react("✔");
    message.reply({
      attachment: fs.createReadStream(path)
    }, () => fs.unlinkSync(path));
  } catch (e) {
    console.log(e)
    message.react("✔");
  }
}
export default {
  config,
  onCall
};
