import DIG from "discord-image-generation";
import fs from "fs-extra";
const config = {
  name: "مطلوب",
  aliases: [],
  cooldown: 20,
  credits: "IbrahemVX2000"
};

async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  try {
    const { mentions, messageReply, senderID } = message;
    const { Users } = global.controllers;
    const targetID = Object.keys(mentions)[0] || messageReply?.senderID || message.senderID;
    message.react("⚙");
    let UID= await global.getAvatarURL(targetID);
    const ava = await global.streamURL(UID);
    const avaURl = await global.getImgUrl(ava);
    const randomNumber = "1";
    const img = await new DIG.Wanted().getImage(avaURl.image.url,randomNumber);
    const path = `${global.cachePath}/Wanted.png`;
    fs.writeFileSync(path, Buffer.from(img));
    message.react("✔");
    message.reply({
      attachment: fs.createReadStream(path)
    }, () => fs.unlinkSync(path));
  } catch (e) {
    console.log(e)
    message.react("❌");
  }
}
export default {
  config,
  onCall
};
