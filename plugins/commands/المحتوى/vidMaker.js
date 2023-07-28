import axios from "axios";
import { join } from "path";
import fs from "fs-extra";
const config = {
    name: "انميشن",
    aliases: ["أنميشنز","أنميشن","انميشمز"],
    description: "اصنع فديو انمي رهيب في ثواني عن طريق الوصف",
    usage: "نص ما تريد رسمه",
    cooldown: 10,
    permissions: [0, 1, 2],
    isAbsolute: false,
    isHidden: false,
    credits: "IbrahemVX2000",
    
}


async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  try{
    const { mentions, messageReply, senderID } = message;
    const log=await global.modules.get("logger");
    const timeStart = Date.now();
    const user = await global.userData(senderID);
    const senderName = user.name;
    const senderGender = user.gender;
    const gender = senderGender === "MALE" ? "قام" : "قامت";
    const input=args.join(" ");
    if(!input){return message.reply("يرجى ادخال نص لصنع الفيديو")}
    message.react("⚙");
    message.reply("قد تستغرق العمليه حوالي دقيقتين يرجى الانتظار...");
    const translatedInput = await global.translate(input,"ar","en") + ",4k photo";
    log.custom(`start making vid for user ${senderName} of prompt: ${translatedInput}`,"VIDMAKER","ghost");
    const API= `https://vidapi12.brhymhsm1.repl.co/create?model=1&query=${encodeURIComponent(translatedInput)}`;
    const {data: result } = await global.GET(API);
    // const result="https://replicate.delivery/pbxt/5r89h8VMQUYHNVo2hckAuoRGuhU1IErAIAmZbKzpxhRNK9UE/out.mp4";
    const cachePath = join(global.cachePath, `_v_ideo${Date.now()}.mp4`);
    const vid = await global.downloadFile(cachePath,result);
    const url = await global.share(fs.createReadStream(vid));
    log.custom(`VID has saved for ${translatedInput}, vid url: ${url}`,"LOG","ghost");
    const time= await global.timeNow();
    const timeEnd = Date.now();
    const timedelay= timeEnd - timeStart ;
    message.react("✔");
    message.reply({
      body: `${gender} ${senderName} بصنع:\n❰ ${input} ❱\nبتاريخ:${time.date}\nالساعة:${time.time}\nزمن الرسم: ${timedelay * 0.001} ثانيه\nرابط الفيديو:\n${url}`,
      attachment: fs.createReadStream(vid)
    });
    setTimeout(async () => {
        if (global.isExists(cachePath)) global.deleteFile(cachePath);
      }, 10000);
    
  } catch(e){
    await global.customLog(e,"ERROR","error");
    message.react("❌")
  }
}
export default {
    config,
    onCall
}