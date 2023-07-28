
import fs from 'fs';
import { join } from 'path';

const config = {
  name: "ايدي",
  aliases: ["آيدي","الايدي"],
  description: "معلومات عن الشخص الذي ترد على رسالته",
  usage: "",
  cooldown: 24,
  credits: "IbrahemVX2000"
}

const langData = {
"ar_SY": {
"profileImage.noData": "لايوجد بيانات...",
"profileImage.error": "حدث خطأ"
}
}


async function streamURL(url) {
  const dest = join(`${global.cachePath}/1.png`);
  if (isURL(url)) {
    await downloadFile(dest, url);
  } else {
    await saveFromBase64(dest, url);
  }
  setTimeout(j => fs.unlinkSync(j), 60 * 1000, dest);
  return fs.createReadStream(dest);
};

async function onCall({ message, getLang }) {
    const { type, mentions } = message;
    const { Users, Threads } = global.controllers;
    let senderid = message.senderID;
    let sender = await Users.getInfo(senderid);
    let senderName = sender.name;
    let targetIDs = [];
    try {
        if (type == "message_reply") {
            targetIDs.push(message.messageReply.senderID);
        } else if (Object.keys(mentions).length >= 1) {
            targetIDs = Object.keys(mentions);
            if (targetIDs.length > 10) return message.reply(getLang("profileImage.noData"));
        } else {
            targetIDs.push(message.senderID);
        }

      let userInfo = await Users.getInfo(targetIDs);
      let userName = userInfo.name;
      let gender = userInfo.gender;
      let userId = targetIDs;
      let userGender;
              if(gender == 1) { userGender = "أنثى"} else if (gender == 2) {userGender = "ذكر"} else {
       userGender = await translate(gender, "en", "ar");}
      let userpre = targetIDs;
      let presition;
      if (global.config.ABSOLUTES.some(e => e == userpre || e == userpre)) { presition = "المطور"}
      else if (userpre == global.botID) {presition = "البوت"}
      else { if (gender == "MALE") {presition ="مستخدم للبوت"}
      else if (gender == "FEMALE") {presition = "مستخدمة للبوت"}
      else {presition = "مستخدم للبوت"}}
      let threadInfo = await Threads.getInfo(message.threadID);
      let threadName = threadInfo.name;
      // person image =====================================
        let userPic = await Users.getInfo(targetIDs);
      let pic = global.getAvatarURL(targetIDs) || null;
      pic = await streamURL(pic);
// ===============================
        await message.reply({
        body:`← الاسم: ❰${userName}❱\n←الجنس: ❰${userGender}❱\n← المعرف: ❰${userId}❱\n← الصلاحيات: ❰${presition}❱\n← اسم المجموعة: ❰${threadName}❱\n← اسم مستخدم الامر: ❰${senderName}❱\n← معرف مستخدم الامر: ❰${senderid}❱`,
        attachment: pic
    });

        
    } catch (e) {
        console.error(e);
        message.reply(getLang("profileImage.error"));
    }
}
async function translate(text, sourceLang, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await global.GET(url);
  const translation = res.data[0].map((item) => item[0]).join("");
  return translation;
}
export default {
    config,
    langData,
    onCall
}
