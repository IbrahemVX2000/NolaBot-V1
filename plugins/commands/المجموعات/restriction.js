import { join } from 'path';
import fs from 'fs';
const config = {
  name: "تقييد",
  aliases: ["تقيد"],
  description: "اطفى البوت عن اعضاء المجموعة",
  cooldown: 5,
  permissions: [1, 2],
  credits: "IbrahemVX2000",
};



async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  const { type, mentions, messageReply, senderID,threadID } = message;
  const { Threads, Users } = global.controllers;
  const getThread = await Threads.get(message.threadID);
  let threadRestriction= getThread.info.restriction;
  let input=args.join("");
  if(!input){return message.reply("يرجى تحديد ان كنت ستطفئ ام تشغل البوت عند استخدام الامر")}
  if(input == "تشغيل"){
    if(threadRestriction){return message.reply("البوت مطفئ عن الاعضاء بالفعل")}
   await global.updateInfo(message.threadID, { restriction: true });
    message.reply("تم تشغيل التقييد وسيتم اطفاء البوت");
    await global.api.changeNickname(`❌${global.config.NAME}❌`,  message.threadID, global.botID);
    return;
  } else if(input == "ايقاف"){
    if(!threadRestriction){return message.reply("البوت قيد التشغيل بالفعل")}
    await global.updateInfo(message.threadID, { restriction: false });
    message.reply("تم اعادة تشغيل البوت");
    await global.api.changeNickname(`✅${global.config.NAME}✅`,  message.threadID, global.botID);
    return;
  } else {return;}
  
}

export default {
  config,
  onCall,
};
