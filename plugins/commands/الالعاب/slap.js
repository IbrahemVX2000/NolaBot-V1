import DIG from "discord-image-generation";
import fs from "fs-extra";
const config = {
  name: "ضرب",
  aliases: ["اضرب","ضربي","صفع","اصفع","اصفعي","اضربيه"],
  cooldown: 20,
  credits: "IbrahemVX2000"
};

async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  try {
    const { mentions, messageReply, senderID } = message;
    const { Users } = global.controllers;
    const targetID = Object.keys(mentions)[0] || messageReply?.senderID;
    if (!targetID) return message.reply("يجب ان تقوم بالرد على رسالة للشخص او ان تعمل له منشن لضربه");
    message.react("⚙");
    let UID1=await global.getAvatarURL(message.senderID);
    let UID2= await global.getAvatarURL(targetID);
    const ava1 = await global.streamURL(UID1);
    const ava2 = await global.streamURL(UID2);
    const avaURl1 = await global.getImgUrl(ava1);
    const avaURl2 = await global.getImgUrl(ava2);
    const img = await new DIG.Batslap().getImage(avaURl1.image.url,avaURl2.image.url);
    const path = `${global.cachePath}/batSlap1.png`;
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
