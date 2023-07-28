const config = {
  name: "مجموعتي",
  aliases: ["المجموعة"],
  description: "شوف معلومات مجموعتك",
  cooldown: 15,
  permissions: [1, 2],
  credits: "IbrahemVX2000",
};
import { join } from 'path';
import fs from 'fs';

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

async function onCall({ message, args, getLang, extra, data, userPermissions, prefix }) {
  const { type, mentions, messageReply, senderID,threadID } = message;
  const { Threads, Users } = global.controllers;
  const getThread = await Threads.get(message.threadID);
  const threadName = getThread.info.name;
  const threadMembers = getThread.info.members.length;
  const threadEmoji = getThread.info.emoji;
  const threadApprovalMode = getThread.info.approvalMode;
  const threadAdmins = getThread.info.adminIDs.length;
  const threadColor = getThread.info.color;
  const threadMessages = getThread.info.messageCount;
  const x = threadApprovalMode ? "مفعلة" : "مطفية";
  const threadPicture =getThread.info.imageSrc || null;
  
  message.reply({
    body: ` ×~ معلومات المجموعة ~×\n\n☜ اسم المجموعة: ${threadName}\n☜ عدد الأعضاء: ${threadMembers}\n☜ الإيموجي: ${threadEmoji}\n☜ طلبات الانضمام: ${x}\n☜ عدد المشرفين: ${threadAdmins}\n☜ الثيم: ${threadColor}\n☜ عدد الرسائل: ${threadMessages} \n☜ معرف المجموعة: ${threadID}\n\n<م> لافضل تجربة يفضل كتابة "تحديث" قبل استخدام الامر`, attachment: await streamURL(threadPicture)
  });
}

export default {
  config,
  onCall,
};
