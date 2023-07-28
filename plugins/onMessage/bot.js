async function onCall({ message, getLang, data }) {
const { senderID, messageID, threadID } = message;
const { Users, Threads } = global.controllers;
const getUsersInfo = await Threads.getInfo(message.threadID);

if (message.body === "بوت" && message.senderID !== global.botID) {
let reply;
if (global.config.MODERATORS.some(e => e == message.senderID || e == message.userID)) {
  reply = "🐢";
} else {
  const bot =["اسمي نولا وليس بوت","نعم يا انسان","همم؟","🐢","...؟"]
 const txtExtra= bot[Math.floor(Math.random() * bot.length)];
  reply = txtExtra;
}
message.reply(reply);
} else if(message.body === "السلام عليكم" && message.senderID !== global.botID) {message.reply("وعليكم السلام ورحمة الله وبركاته💙")}
  else if(message.body === "نولا" && message.senderID !== global.botID){
    const thetexts =["في الخدمة","نعم؟؟","اكتب 'اوامر' لترى قائمة الاوامر","قول واعتبره تم التنفيذ","عيون نولا"]
        const texts = thetexts[Math.floor(Math.random() * thetexts.length)];
    message.reply(texts)
  }
else {return;}

}

export default {
onCall,
};